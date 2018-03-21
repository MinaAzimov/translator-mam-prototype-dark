import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getUserData } from '../services/users';
import MediaOverlay from "./MediaOverlay";
import socket from "../client/socketClient";
import { Block, rendererFn, ImageSideButton, addNewBlock, RenderMap, createEditorState } from 'medium-draft'
import { 
	ContentState, 
	ContentBlock, 
	SelectionState,
	EditorState, 
	genKey, 
	AtomicBlockUtils, 
	RichUtils,
	Entity, 
	convertToRaw, 
	convertFromRaw, 
	convertFromHTML, 
	EditorBlock,
	CompositeDecorator,
	Modifier,
	getDefaultKeyBinding, 
	KeyBindingUtil
} from 'draft-js';
import Editor from './rteditor/editor'
import { debounce, difference } from "lodash";
import { Map } from 'immutable';
import MediaPreviewItem from './MediaPreviewItem';
import { MEDIA_USAGES } from '../constants/media';
import { getContentItems, getContentItem } from '../services/content';
import TagSelector from './rteditor/components/TagSelector';
import { getSelection, getSelectionRect } from 'medium-draft/lib/util/index';
import uuid from 'uuid';
import $ from "jquery"

Block.MEDIA = 'atomic:media';

function showKeys(contentState) {
	return convertToRaw(contentState).blocks.map(b=>b.key);
}








/* -------- Decorators for picking up tags -------- */

const Link = (props) => {
  const {url, itemId} = Entity.get(props.entityKey).getData();
  let tooltip = "";
  if (url) {
  	tooltip = "Links to: " + url
  }
  if (itemId) {
  	tooltip = "Links to '" + getContentItem(itemId).title + "'"
  }

  return (
    <span className="rteditor-link">
    	<div className="rteditor-link__tooltip">{tooltip}</div>
      {props.children}
    </span>
  );
};

function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const compositeDecorator = new CompositeDecorator([
	{
		strategy: findLinkEntities,
		component: Link
	}
]);








const HANDLE_REGEX = /\@[\w]+/g;

function handleStrategy(contentBlock, callback) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}



/* -------- Custom key commands ------------ */

function myKeyBindingFn(e) {
	const {hasCommandModifier} = KeyBindingUtil;
	if (hasCommandModifier(e)) {
		if (e.keyCode === 74) {
	    return 'rteditor-insert-content-link';
	  }
	  else if (e.keyCode === 75) {
	  	return 'rteditor-insert-link';
	  }
	}
  return getDefaultKeyBinding(e);
}








const autoTagContentItems = getContentItems().filter(item=>item.tagName !== undefined);




class RTEditor extends Component {
	
	constructor(props, context) {
		super(props, context);

		this.hasReceivedInitialDump = false;
		let contentState = this.props.contentState;
		let editorState;
		
		if (contentState) {
			if (!(contentState instanceof ContentState)) {
				contentState = convertFromRaw(contentState);
				this.hasReceivedInitialDump = true;
			}
		} else {
			contentState = ContentState.createFromText("");
		}

		this.state = {
			editorState: EditorState.createWithContent(contentState, compositeDecorator),
			tagSelectorOpen: false
		}
	}

	componentDidMount() {
		this.updateLockedMessagePositions();
	}

	componentWillReceiveProps(nextProps) {

		// This means we are reverting content, so re inject the props
		if (nextProps.mostRecentChangeBy === null) {
			this.hasReceivedInitialDump = false;
		}

		let contentState = this.props.contentState;
		let nextContentState = nextProps.contentState;

	  if (!(nextContentState instanceof ContentState)) {
	    nextContentState = convertFromRaw(nextContentState);
	  }

	  // If we have not yet recieved a dump, synchronise
		if (this.hasReceivedInitialDump === false) {
			this.setState({
				editorState: EditorState.createWithContent(nextContentState, compositeDecorator)
			});
			this.hasReceivedInitialDump = true;
			return;
		}

		// If we made this change, ignore the new props since the change
		// will already be reflected in our state. Big performance improvement.
		if (nextProps.mostRecentChangeBy === this.props.client.user.id) {
			return;
		}

		// Otherwise, if content was modified by someone else,
		// we need to merge the changes into our state
		if (contentState !== nextContentState) {

				let editorState = this.state.editorState;	
				let selection = editorState.getSelection();
				let currentEditingKey = selection.getStartKey();
				let isEditing = selection.getHasFocus();
				let nextEditors = nextProps.editors;
				let myUserId = this.props.client.user.id;

				// Grab the blocks from the update, inject them into our current editor state
				// This will preserve local stuff like selection
				let nextBlockMap = nextContentState.getBlockMap();
				let nextBlockArray = nextContentState.getBlocksAsArray();
				let currentContentState = editorState.getCurrentContent();
				let currentBlockMap = currentContentState.getBlockMap();
				let newContentState = currentContentState.set("blockMap", nextBlockMap);

				// Now replace the current editing block with the local one in state.
				// We do this because we might override changes the user made in the last second
				// with the server's less up-to-date version of that block.
				if (isEditing && currentEditingKey && nextEditors[currentEditingKey] === myUserId) {
					let currentEditingBlock = currentContentState.getBlockForKey(currentEditingKey);
					nextBlockMap = nextBlockMap.set(currentEditingKey, currentEditingBlock);
					newContentState = currentContentState.set("blockMap", nextBlockMap);					
				}
				
				//editorState = EditorState.push(editorState, newContentState, 'change-block-data');
				editorState = EditorState.push(editorState, newContentState, 'change-block-type');
			
				this.setState({
					editorState: editorState
				});
				
				return;
		}
	}

	componentDidUpdate(prevProps, prevState) {
		this.updateLockedMessagePositions();
	}

	updateLockedMessagePositions() {
		// Move te locked messages to the right place
		$(".locked-block").each((i, el) => {
			let $el = $(el);
			let key = $el.attr("data-offset-key").split("-")[0];
			let top = $el.position().top;
			let $msg = $(this.refs["locked_msg_" + key]);
			$msg.css("top", top);
		})		
	}

	releaseBlockOnIdle = debounce((blockId)=> {
			const fieldId = this.props.fieldId;
			if (blockId === this.getMyEditBlockId()) {
				socket.emit("RTEDITOR_STOP_EDIT", fieldId, blockId);
			}
	}, 10000);

	onBlockFocus = (blockKeysToCapture) => {
		const { client } = this.props;
		socket.emit("RTEDITOR_START_EDIT", client.user.id, this.props.fieldId, blockKeysToCapture);
	}

	onContainerClick = () => {
		return;
		this.refs.editor.focus();
	}

	myBlockStyleFn = (contentBlock) => {
	  const key = contentBlock.getKey();
	  const editor = this.props.editors[key];
	  if (editor === undefined) {
	  	return "free-block";
	  }
	  if (editor === this.props.client.user.id) {
	  	return "my-block";
	  }
	  // This block is locked, color it with the theme color of the editing user
	  let editorUser = getUserData(editor);
	  return "locked-block theme-color-background-light-" + editorUser.colorProfile;
	}

  isLockedBlock = (editorState, key) => {
    let selectionState = editorState.getSelection();
    const blockKey = key || selectionState.getEndKey();
    const editor = this.props.editors[blockKey];
    const isBlockLocked = !(editor === undefined || editor === this.props.client.user.id);
    return isBlockLocked;
  }

	onChange = (editorState) => {
		console.log("-------------- RTEDITOR ONCHANGE --------------");

		this.setState({ editorState });

		let oldContentState = this.state.editorState.getCurrentContent();
		let newContentState = editorState.getCurrentContent();

		let oldBlocks = oldContentState.getBlocksAsArray();
		let newBlocks = newContentState.getBlocksAsArray();

		/* 
		 * Check to see what we have changed to submit to the server
		 */
		let diffNew = difference(newBlocks, oldBlocks);
		let diffRemoved = difference(oldBlocks, newBlocks);

		if (diffNew.length > 0 || diffRemoved.length > 0) {
			let changes = {
				blockKeys: newBlocks.map(block=> block.getKey()),
				newBlocks: (diffNew.length > 0) ? convertToRaw(ContentState.createFromBlockArray(diffNew)) : null
			};

			// Generate a random change id we can use to check if we made this change
			//let changeId = Math.floor(Math.random() * 10000);
			socket.emit("RTEDITOR_CHANGE", this.props.fieldId, this.props.client.user.id, changes);
			// We don't care anout selection state changes if already submitting
			// a change event
			return;
		}

		/* 
		 * Check the selection state to see if we focused/blured this editor
		 */
		let prevSelectionState = this.state.editorState.getSelection();
		let nextSelectionState = editorState.getSelection();
		if (prevSelectionState.getHasFocus() !== nextSelectionState.getHasFocus() ||
			prevSelectionState.getStartKey() !== nextSelectionState.getStartKey() ||
			  prevSelectionState.getEndKey() !== nextSelectionState.getEndKey()) {
				let blockKeysToCapture = [nextSelectionState.getStartKey(), nextSelectionState.getEndKey()];
				// First check if we're allowed to select these
				// ...
				//this.onBlockFocus(blockKeysToCapture);
		}
	}

	rendererFn = (setEditorState, getEditorState) => {
		const atomicRenderers = {
			embed: AtomicEmbedComponent,
			separator: AtomicSeparatorComponent,
		};
		const rFnOld = rendererFn(setEditorState, getEditorState);
		const rFnNew = (contentBlock) => {
			const type = contentBlock.getType();
			const blockKey = contentBlock.getKey();
			switch(type) {
				case 'unstyled':
          const editor = this.props.editors[blockKey];
					return {
						component: LockableContentBlock,
						props: {
              locked: editor !== undefined && editor !== this.props.client.user.id,
							setEditorState,
							getEditorState,
						}
					};
				case Block.MEDIA:
					return {
						component: MediaBlock,
						props: {
							setEditorState,
							getEditorState,
						}
					};
				case Block.ATOMIC:
					return {
						component: AtomicBlock,
						editable: false,
						props: {
							components: atomicRenderers,
						},
					};
				default: return rFnOld(contentBlock);
			}
		};
		return rFnNew;
	}

	renderMap = Map({
		[Block.MEDIA]: {
      element: 'figure'
    }
	}).merge(RenderMap);

  onUpArrow = (e) => {
    // if first block is locked by someone else there is no way to create new block in the beginning.
    // this logic handles creation of new block if before locked block at first position when arrow up is pressed
    const contentState = this.state.editorState.getCurrentContent();
    const selectionState = this.state.editorState.getSelection();
    const currentBlockKey = selectionState.getFocusKey();
    const blockBefore = contentState.getBlockBefore(currentBlockKey);
    const firstBlock = contentState.getFirstBlock();
    const firstBlockKey = firstBlock.getKey();
    const isFirstBlockLocked = this.isLockedBlock(this.state.editorState, firstBlockKey);
    if (isFirstBlockLocked && blockBefore && blockBefore.getKey() === firstBlockKey) {
      // insert new edit block to the first position
      const newEditorState = insertBlockBefore(this.state.editorState, firstBlockKey, Block.UNSTYLED);
      //this.setState({ editorState: newEditorState });
      this.onChange(newEditorState);
    }
  };

  onDownArrow = (e) => {
    // if first block is locked by someone else there is no way to create new block in the beginning.
    // this logic handles creation of new block if before locked block at first position when arrow up is pressed
    const contentState = this.state.editorState.getCurrentContent();
    const selectionState = this.state.editorState.getSelection();
    const currentBlockKey = selectionState.getFocusKey();
    const blockAfter = contentState.getBlockAfter(currentBlockKey);
    const lastBlock = contentState.getLastBlock();
    const lastBlockKey = lastBlock.getKey();
    const isLastBlockLocked = this.isLockedBlock(this.state.editorState, lastBlockKey);
    if (isLastBlockLocked && blockAfter && blockAfter.getKey() === lastBlockKey) {
      // insert new edit block to the first position
      const newEditorState = insertBlockAfter(this.state.editorState, lastBlockKey, Block.UNSTYLED);
      //this.setState({ editorState: newEditorState });
      this.onChange(newEditorState);
    }
  };



  // Auto tags all the article content
  tagContent = (e) => {

    e.preventDefault();
    e.stopPropagation();

    const { editorState } = this.state;
    let newEditorState = editorState;
    let contentState = editorState.getCurrentContent();
    const blocks = contentState.getBlocksAsArray();
    const usedTags = [];

    blocks.forEach(block => {
      let match;
      const blockKey = block.getKey();
      const text = block.getText().toLowerCase();
      autoTagContentItems.forEach(item => {
        
        // Only tag each term once
        if (usedTags.find(id=> id === item.id) !== undefined) {
          return;
        }

        let tagName = item.tagName.toLowerCase();
        let found = text.indexOf(tagName);
        if (found !== -1) {
          usedTags.push(item.id);
          let entityKey = Entity.create('LINK', 'MUTABLE', { 
				    type: "content",
				    external: true,
				    url: "",
				    itemId: item.id,
				    text: ""
          });
          let selection = SelectionState.createEmpty();
          selection = selection.merge({
            anchorKey: blockKey,
            anchorOffset: found,
            focusKey: blockKey,
            focusOffset: found + tagName.length
          })
          contentState = Modifier.replaceText(
            contentState,
            selection,
            item.tagName,
            {},
            entityKey
          );


        }
      });
    });

    this.addTagToPrimaryAssets(usedTags);
    newEditorState = EditorState.push(editorState, contentState, 'change-block-data');
    this.onChange(newEditorState);
  }


  addTagToPrimaryAssets = (tags) => {
  	const field = this.props.primaryTagField;
  	const newVal = field.value.slice();
  	tags.forEach((itemId)=> {
  		// Only add unique
  		if (newVal.find(i=> i.value && i.value.id === itemId) !== undefined) {
  			return;
  		}
	  	let newRepeaterItem = {
	  		_repeaterItemId: uuid.v1(),
	  		value: getContentItem(itemId)
	  	}
	  	newVal.unshift(newRepeaterItem);
  	})
  	socket.emit("FIELD_CHANGE", this.props.client.user.id, field.id, newVal);
  }


	getWordCount(editorState) {
    const plainText = editorState.getCurrentContent().getPlainText('');
    const regex = /(?:\r\n|\r|\n)/g;  // new line, carriage return, line feed
    const cleanString = plainText.replace(regex, ' ').trim(); // replace above characters w/ space
    const wordArray = cleanString.match(/\S+/g);  // matches words according to whitespace
    return wordArray ? wordArray.length : 0;
  }

	render() {

		const sideButtons = [
			{ title: 'Image', component: CustomImageButton },
			{ title: 'Upload', component: UploadButton },
			{ title: 'Embed', component: EmbedSideButton },
			{ title: 'Separator', component: SeparatorSideButton }
		];
		const blockButtons = [
		  { label: 'H1', style: 'header-one', icon: 'header', description: 'Heading 1' },
			{ label: 'H2', style: 'header-two', icon: 'header', description: 'Heading 2' },
		  { label: '', style: 'blockquote', icon: 'quote-right', description: 'Blockquote' },
		  { label: 'UL', style: 'unordered-list-item', icon: 'list-ul', description: 'Unordered List' },
		  { label: 'OL', style: 'ordered-list-item', icon: 'list-ol', description: 'Ordered List' }
		];
		const inlineButtons = [
		  { label: 'B', style: 'BOLD', icon: 'bold', description: 'Bold' },
			{ label: 'I', style: 'ITALIC', icon: 'italic', description: 'Italic' },
		  { label: 'U', style: 'UNDERLINE', icon: 'underline', description: 'Underline' },
		  { label: 'Hi', style: 'HIGHLIGHT', description: 'Highlight selection' },
		  { label: '', style: 'hyperlink', icon: 'link', description: 'Link' },
		];


		const { editor, editorUser, imEditing } = this.props;
		const { client, contentState, fieldId, editors } = this.props;
		const { editorState } = this.state;

		let classnames = classNames({
			'rteditor': true
		})

		let selectionState = editorState.getSelection();
		const plainText = editorState.getCurrentContent().getPlainText('');
		const wordCount = this.getWordCount(editorState);
		const characterCount = plainText.length;

		return (
			<div className={classnames} ref="container">
				<div className="rteditor-content" ref="content" onClick={this.onContainerClick}>
					<Editor
						ref="editor"
						placeholder="Start typing content..."
						editorState={this.state.editorState}
						onChange={this.onChange}
						sideButtons={sideButtons}
						blockButtons={blockButtons}
						inlineButtons={inlineButtons}
						blockRenderMap={this.renderMap}
						rendererFn={this.rendererFn}
						blockStyleFn={this.myBlockStyleFn}
            onUpArrow={this.onUpArrow}
            onDownArrow={this.onDownArrow}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={myKeyBindingFn}
            addTagToPrimaryAssets={this.addTagToPrimaryAssets}
            spellCheck
					/>
					<div className="rteditor-users">
						{
							Object.keys(editors).map(k => {
								if (editors[k] === this.props.client.user.id) {
									return null;
								}
								let editor= getUserData(editors[k]);
								return (
									<div className="rteditor__locked-msg" ref={"locked_msg_" + k} key={editors[k]}>
										<div className={"field__locked-msg theme-color-background-" + editor.colorProfile}>
											<i className="fa fa-lock" ></i>
											{editor.name}
										</div>
										<svg width="6" height="12">
											<path className={"theme-color-fill-" + editor.colorProfile} d="M6 0 L0 6 L6 12" />
										</svg>	
									</div>
								)
							})
						}
					</div>
				</div>
				<div className="rteditor-footer">
					<div>
						<div className="rteditor-footer__item">Words: <strong> { wordCount }</strong></div>
						<div className="rteditor-footer__item">Characters:<strong> {characterCount}</strong></div>
					</div>
					<div>
		        <button className="rteditor-autotag" onClick={this.tagContent}>
		          Auto-tag content
		        </button>
		      </div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    client: state.client,
    contentState: state.fields[14].blocks.contentState,
    editors: state.fields[14].blocks.editors,
    blocks: state.fields[14].blocks,
    mostRecentChangeBy: state.fields[14].blocks.mostRecentChangeBy,
    primaryTagField: state.fields[12]
  }
}

export default connect(mapStateToProps)(RTEditor);




/*---- EDITING BLOCK PLUGINS ----*/

class SeparatorSideButton extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		const entityKey = Entity.create('separator', 'IMMUTABLE', {});
		this.props.setEditorState(
			AtomicBlockUtils.insertAtomicBlock(
				this.props.getEditorState(),
				entityKey,
				'-'
			)
		);
		this.props.close();
	}

	render() {
		return (
			<button
				className="md-sb-button md-sb-img-button"
				type="button"
				title="Add a separator"
				onClick={this.onClick}
			>
				<i className="fa fa-minus" />
			</button>
		);
	}
}

class MediaOverlayOpenButton extends ImageSideButton {

	constructor(props) {
		super(props);
		this.state = { showMediaOverlay: false };
	}

	showDialog = () => {
		this.setState({ showMediaOverlay: true });
	}

	hideDialog = () => {
		this.setState({ showMediaOverlay: false });
	}

	onSubmit = (mediaListItem) => {
		const media = mediaListItem.shift();
    const userId = this.props.client.user.id;
    const fieldId = this.props.mediaCardField.id;
    const defaultUsage = 'Promo';
    const promoIndex = MEDIA_USAGES.findIndex(item => item === defaultUsage);
    const mediaCardValue = [].concat(this.props.mediaCardField.value, {
      mediaId: media.id,
      usage: this.props.mediaCardField.value.length === 0 ? {
        id: promoIndex,
        title: defaultUsage,
        subtitle: '',
        disabled: false
      } : {}
    });
    socket.emit("FIELD_CHANGE", userId, fieldId, mediaCardValue);

		this.props.setEditorState(addNewBlock(
			this.props.getEditorState(),
			Block.MEDIA, {
        ...media
			}
		));
		this.props.close();
	}



	render() {
		const iconClass = (this.props.actionType==="upload") ? "fa fa-upload" : "fa fa-image";
		return (
				<button
					className="md-sb-button md-sb-img-button"
					type="button"
					onClick={this.showDialog}
					title="Add an Image"
				>
					<i className={iconClass} />
					<MediaOverlay
						show={this.state.showMediaOverlay}
						onClose={this.hideDialog}
						onSubmit={this.onSubmit}
					/>
				</button>

		);
	}
}
const CustomImageButton = connect(state => ({
	mediaCardField: state.fields[16],
	client: state.client
}))(MediaOverlayOpenButton);

class UploadButton extends ImageSideButton {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<CustomImageButton actionType="upload" />
		);
	}
}

class EmbedSideButton extends React.Component {

	static propTypes = {
		setEditorState: React.PropTypes.func,
		getEditorState: React.PropTypes.func,
		close: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.addEmbedURL = this.addEmbedURL.bind(this);
	}

	onClick() {
		const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo');
		this.props.close();
		if (!url) {
			return;
		}
		this.addEmbedURL(url);
	}

	addEmbedURL(url) {
		const entityKey = Entity.create('embed', 'IMMUTABLE', {url});
		this.props.setEditorState(
			AtomicBlockUtils.insertAtomicBlock(
				this.props.getEditorState(),
				entityKey,
				'E'
			)
		);
	}

	render() {
		return (
			<button
				className="md-sb-button md-sb-img-button"
				type="button"
				title="Add an Embed"
				onClick={this.onClick}
			>
				<i className="fa fa-code" />
			</button>
		);
	}

}
/*
 Get currentBlock in the editorState.
 */
export const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selectionState.getStartKey());
  return block;
};

function VoidBlock(props) {
  return null;
}

class _MediaBlock extends React.Component {

	constructor(props, context) {
		super(props, context);
		const data = props.block.getData();
		const caption = data.get('caption');

		this.state = {
      media: this.getMedia(props)
		};
	}

  onSubmit = (media) => {
    this.setState({
      media
    });
  }

	getMedia = (props) => {
		const data = props.block.getData();
		const media = {};
		data.forEach(function(value, key) {
			media[key] = value;
		});
		return media;
	};

  resetCursorOnClick = () => {
    var el = this.refs.mediaCaption;
    var range = document.createRange();
    var sel = window.getSelection();
    range.setStart(el.childNodes[0], 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      media: nextProps.media
    })
  };

	render() {
    const { src } = this.state.media;
		if (src !== null) {
			return (
				<div className="md-block-image">
					<div className="md-block-image-inner-container" contentEditable="false">
						<div className="md-media">
							<MediaPreviewItem {...{...this.state.media, caption: ''}} onSubmit={this.onSubmit} />
						</div>
            <figcaption onClick={this.resetCursorOnClick} className="md-block-image-caption" ref="mediaCaption">
							{this.state.media.caption}
            </figcaption>
					</div>
				</div>
			);
		}
		return <EditorBlock {...this.props} />;
	}
}

const MediaBlock = connect((state, props) => {
  const mediaId = props.block.getData().get('id');
  return {
    media: state.fields[15].value.find(item => item.id === mediaId)
  };
})(_MediaBlock);

class LockableContentBlock extends React.Component {
	addNewBlockAfter = () => {
    if (this.props.blockProps.locked) {
      this.props.blockProps.setEditorState(insertBlockAfter(
        this.props.blockProps.getEditorState(),
        this.props.block.getKey(),
        Block.UNSTYLED
      ));
    }
	};

  render () {
    return (<div onClick={this.addNewBlockAfter} contentEditable={!this.props.blockProps.locked}><EditorBlock {...this.props} /></div>)
  }
}

class AtomicEmbedComponent extends React.Component {

	static propTypes = {
		data: React.PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);
		const { url } = this.props.data;
		this.state = { html: `<a href="${url}">Loading embedded content&hellip;</a>` };
	}

	componentDidMount() {
		window.oEmbedSetState = (json) => { this.setState({ html: decodeURI(json.html) }) };
		const { url } = this.props.data;
		const script = document.createElement('script');
		script.src = `//noembed.com/embed?url=${encodeURIComponent(url)}&callback=oEmbedSetState`;
		document.body.appendChild(script);
	}

	render() {
		return (
			<div className="md-block-atomic-embed">
				<div dangerouslySetInnerHTML={{ __html: this.state.html }} />
			</div>
		);
	}
}

const AtomicSeparatorComponent = (props) => (
	<hr />
);

const AtomicBlock = (props) => {
	const { blockProps, block } = props;
	const entity = Entity.get(block.getEntityAt(0));
	const data = entity.getData();
	const type = entity.getType();
	if (blockProps.components[type]) {
		const AtComponent = blockProps.components[type];
		return (
			<div className={`md-block-atomic-wrapper md-block-atomic-wrapper-${type}`}>
				<AtComponent data={data} />
			</div>
		);
	}
	return <p>Block of type <b>{type}</b> is not supported.</p>;
};

/**
 * @see https://github.com/sstur/react-rte/blob/master/src/lib/insertBlockAfter.js for source code
 *
 * @param editorState
 * @param blockKey
 * @param newType
 */
function insertBlockAfter(
  editorState: EditorState,
  blockKey: string,
  newType: string,
): EditorState {
  let content = editorState.getCurrentContent();
  let blockMap = content.getBlockMap();
  let block = blockMap.get(blockKey);
  let blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  let blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  let newBlockKey = genKey();
  let newBlock = new ContentBlock({
    key: newBlockKey,
    type: newType,
    text: '',
    characterList: block.getCharacterList().slice(0, 0),
    depth: 0,
  });
  let newBlockMap = blocksBefore.concat(
    [[blockKey, block], [newBlockKey, newBlock]],
    blocksAfter,
  ).toOrderedMap();
  let selection = editorState.getSelection();
  let newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });
  return EditorState.push(editorState, newContent, 'split-block');
}

function insertBlockBefore(
  editorState: EditorState,
  blockKey: string,
  newType: string,
): EditorState {
  let content = editorState.getCurrentContent();
  let blockMap = content.getBlockMap();
  let block = blockMap.get(blockKey);
  let blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  let blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  let newBlockKey = genKey();
  let newBlock = new ContentBlock({
    key: newBlockKey,
    type: newType,
    text: '',
    characterList: block.getCharacterList().slice(0, 0),
    depth: 0,
  });
  let newBlockMap = blocksBefore.concat(
    [[newBlockKey, newBlock], [blockKey, block]],
    blocksAfter,
  ).toOrderedMap();
  let selection = editorState.getSelection();
  let newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });
  return EditorState.push(editorState, newContent, 'split-block');
}
