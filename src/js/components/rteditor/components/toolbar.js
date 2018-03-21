// import './toolbar.scss';

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Entity } from 'draft-js';

import BlockToolbar from 'medium-draft/lib/components/blocktoolbar';
import InlineToolbar from 'medium-draft/lib/components/inlinetoolbar';
import { getSelection, getSelectionRect } from 'medium-draft/lib/util/index';
import { getCurrentBlock } from 'medium-draft/lib/model/index';
import { Entity as CEntity, HYPERLINK } from 'medium-draft/lib/util/constants';
import LinkAutofill from './linkAutofill.js';
import Text from '../../form/Text';

export default class Toolbar extends React.Component {

  static propTypes = {
    editorEnabled: PropTypes.bool,
    editorState: PropTypes.object,
    toggleBlockType: PropTypes.func,
    toggleInlineStyle: PropTypes.func,
    inlineButtons: PropTypes.arrayOf(PropTypes.object),
    blockButtons: PropTypes.arrayOf(PropTypes.object),
    editorNode: PropTypes.object,
    setLink: PropTypes.func,
    focus: PropTypes.func,
  };

  static defaultProps = {
    blockButtons: BLOCK_BUTTONS,
    inlineButtons: INLINE_BUTTONS,
  };

  constructor(props) {
    super(props);
    this.state = {
      showURLInput: false,
      urlInputValue: '',
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleLinkInput = this.handleLinkInput.bind(this);
    this.hideLinkInput = this.hideLinkInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { editorState } = newProps;
    if (!newProps.editorEnabled) {
      return;
    }
    const selectionState = editorState.getSelection();
    if (selectionState.isCollapsed()) {
      if (this.state.showURLInput) {
        this.setState({
          showURLInput: false,
        });
      }
      return;
    }
  }

  componentDidUpdate() {
    if (!this.props.editorEnabled || this.state.showURLInput) {
      return;
    }
    const selectionState = this.props.editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return;
    }
    // eslint-disable-next-line no-undef
    const nativeSelection = getSelection(window);
    if (!nativeSelection.rangeCount) {
      return;
    }
    const selectionBoundary = getSelectionRect(nativeSelection);

    // eslint-disable-next-line react/no-find-dom-node
    const toolbarNode = ReactDOM.findDOMNode(this);
    const toolbarBoundary = toolbarNode.getBoundingClientRect();

    // eslint-disable-next-line react/no-find-dom-node
    const parent = ReactDOM.findDOMNode(this.props.editorNode);
    const parentBoundary = parent.getBoundingClientRect();

    const pointer = ReactDOM.findDOMNode(this.refs.pointer);

    /*
    * Main logic for setting the toolbar position.
    */
    toolbarNode.style.top =
      `${(selectionBoundary.top - parentBoundary.top - toolbarBoundary.height - 5)}px`;
    toolbarNode.style.width = `${toolbarBoundary.width}px`;
    const widthDiff = selectionBoundary.width - toolbarBoundary.width;
    
    if (widthDiff >= 0) {
      let left = widthDiff / 2;
      toolbarNode.style.left = `${widthDiff / 2}px`;
    } else {
      let left = (selectionBoundary.left - parentBoundary.left) + (widthDiff / 2);
      if (left < 0) {
        let adjustment = left;
        left = 0;
        toolbarNode.style.left = '0px';
        toolbarNode.style.width = toolbarBoundary.width + 'px';
        pointer.style.transform = `translateX(${adjustment}px)`;
      }
      else if (left + toolbarBoundary.width > parentBoundary.width) {
        let adjustment = left + toolbarBoundary.width - parentBoundary.width;
        toolbarNode.style.right = '0px';
        toolbarNode.style.left = '';
        toolbarNode.style.width = toolbarBoundary.width + 'px';
        pointer.style.transform = `translateX(${adjustment}px)`;
      }
      else {
        toolbarNode.style.left = `${left}px`;
        toolbarNode.style.width = toolbarBoundary.width + 'px';
        pointer.style.transform = `translateX(0px)`;
      }
      return;
    }
    
  }

  unlink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.setLink('');
    this.setState({
      showURLInput: false,
      urlInputValue: '',
    }, () => this.props.focus());
  }

  onOk = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.setLink(this.state.urlInputValue);
    this.setState({
      showURLInput: false,
      urlInputValue: '',
    }, () => this.props.focus());
  }

  onKeyDown(e) {
    if (e.which === 13) {
      this.onOk(e);
    } else if (e.which === 27) {
      this.hideLinkInput(e);
    }
  }

  onChange(urlInputValue) {
    this.setState({
      urlInputValue
    });
  }

  _getTextSelection = (blockDelimiter) => {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    blockDelimiter = blockDelimiter || ' ';
    var startKey   = selection.getStartKey();
    var endKey     = selection.getEndKey();
    var blocks     = contentState.getBlockMap();

    var lastWasEnd = false;
    var selectedBlock = blocks
      .skipUntil(function(block) {
        return block.getKey() === startKey;
      })
      .takeUntil(function(block) {
        var result = lastWasEnd;

        if (block.getKey() === endKey) {
          lastWasEnd = true;
        }

        return result;
      });

    return selectedBlock
      .map(function(block) {
        var key = block.getKey();
        var text = block.getText();

        var start = 0;
        var end = text.length;

        if (key === startKey) {
          start = selection.getStartOffset();
        }
        if (key === endKey) {
          end = selection.getEndOffset();
        }

        text = text.slice(start, end);
        return text;
      })
      .join(blockDelimiter);
  }
/*
  getLinkEntityAtSelection() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      this.props.focus();
      return null;
    }
    const currentBlock = getCurrentBlock(editorState);
    let selectedEntity = '';
    let linkFound = false;
    currentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      selectedEntity = entityKey;
      return entityKey !== null && Entity.get(entityKey).getType() === CEntity.LINK;
    }, (start, end) => {
      let selStart = selection.getAnchorOffset();
      let selEnd = selection.getFocusOffset();
      if (selection.getIsBackward()) {
        selStart = selection.getFocusOffset();
        selEnd = selection.getAnchorOffset();
      }
      if (start === selStart && end === selEnd) {
        linkFound = true;
        const entity = Entity.get(selectedEntity);
        console.log("ENTITY FOUND!!!!!!", entity);
        return entity;
      }
    });
    return null;
  }
*/

  handleContentLinkInput = (e, direct = false) => {
    e.preventDefault();
    e.stopPropagation();
    /*
    const entity = this.getLinkEntityAtSelection();
    this.props.onClickLink(entity, "content");
    */
    this.props.onClickLink("content");
  }

  handleLinkInput = (e, direct = false) => {
    e.preventDefault();
    e.stopPropagation();
    //const entity = this.getLinkEntityAtSelection();
    this.props.onClickLink("external");
  }

  hideLinkInput(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      showURLInput: false,
      urlInputValue: '',
    }, () => this.props.focus());
  }

  render() {
    const { editorState, editorEnabled, inlineButtons } = this.props;
    const { showURLInput, urlInputValue } = this.state;
    let isOpen = this.props.isOpen;
    let hasHyperLink = false;
    let hyperlinkLabel = '#';
    let hyperlinkDescription = 'Add a link';
    for (let cnt = 0; cnt < inlineButtons.length; cnt++) {
      if (inlineButtons[cnt].style === HYPERLINK) {
        hasHyperLink = true;
        if (inlineButtons[cnt].label) {
          hyperlinkLabel = inlineButtons[cnt].label;
        }
        if (inlineButtons[cnt].description) {
          hyperlinkDescription = inlineButtons[cnt].description;
        }
        break;
      }
    }

    return (
      <div
        className={`md-editor-toolbar${(isOpen ? ' md-editor-toolbar--isopen' : '')}`}
      >
        <div className="md-editor-toolbar-pointer" ref="pointer"></div>
        {this.props.blockButtons.length > 0 ? (
          <BlockToolbar
            editorState={editorState}
            onToggle={this.props.toggleBlockType}
            buttons={this.props.blockButtons}
          />
        ) : null}
        {this.props.inlineButtons.length > 0 ? (
          <InlineToolbar
            editorState={editorState}
            onToggle={this.props.toggleInlineStyle}
            buttons={this.props.inlineButtons}
          />
        ) : null}
        {hasHyperLink && (
          <div className="md-RichEditor-controls" tabIndex="-1">
            <a
              className="md-RichEditor-styleButton md-RichEditor-linkButton hint--top"
              href="#open-link-input"
              onClick={this.handleLinkInput}
              aria-label="External link"
            >
              <i className="iconcss icon-link"></i>
            </a>
            <a
              className="md-RichEditor-styleButton md-RichEditor-linkButton hint--top"
              onClick={this.handleContentLinkInput}
              aria-label="Content link"
            >
              <i className="iconcss icon-link"></i>
            </a>
          </div>
        )}      
      </div>
    );
  }
}

export const BLOCK_BUTTONS = [
  {
    label: 'H3',
    style: 'header-three',
    icon: 'header',
    description: 'Heading 3',
  },
  {
    label: 'Q',
    style: 'blockquote',
    icon: 'quote-right',
    description: 'Blockquote',
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: 'list-ul',
    description: 'Unordered List',
  },
  {
    label: 'OL',
    style: 'ordered-list-item',
    icon: 'list-ol',
    description: 'Ordered List',
  },
  {
    label: '✓',
    style: 'todo',
    description: 'Todo List',
  },
];

export const INLINE_BUTTONS = [
  {
    label: 'B',
    style: 'BOLD',
    icon: 'bold',
    description: 'Bold',
  },
  {
    label: 'I',
    style: 'ITALIC',
    icon: 'italic',
    description: 'Italic',
  },
  {
    label: 'U',
    style: 'UNDERLINE',
    icon: 'underline',
    description: 'Underline',
  },
  {
    label: 'Hi',
    style: 'HIGHLIGHT',
    description: 'Highlight selection',
  },
  {
    label: '#',
    style: HYPERLINK,
    icon: 'link',
    description: 'Add a link',
  },
];
  // {
  //   label: 'S',
  //   style: 'STRIKETHROUGH',
  //   icon: 'strikethrough',
  //   description: 'Strikethrough',
  // },
  // {
  //   label: 'Code',
  //   style: 'CODE',
  //   description: 'Inline Code',
  // },

