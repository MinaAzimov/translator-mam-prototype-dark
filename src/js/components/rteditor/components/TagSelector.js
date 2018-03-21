

import React, { PropTypes } from 'react';
import { getContentItems } from "../../../services/content";
import Selectbox from '../../form/Selectbox';
import Text from '../../form/Text';
import $ from "jquery";

import { getSelection, getSelectionRect } from 'medium-draft/lib/util/index';
import ReactDOM from 'react-dom';

const allItems = getContentItems();


export default class TagSelector extends React.Component {


	static defaultProps = {
		isOpen: false
	}

	constructor(props) {
		super(props);
		if (props.entityData) {
			this.state = Object.assign({}, props.entityData);
		}

		else {
			this.state = { 
				external: false,
				url: "", 
				itemId: null,
				text: "" 
			}
		}
	}

	componentDidMount() {
		// Temporarily focus the editor to get the selection;
		this.props.focus();

		setTimeout(()=> {

		  const nativeSelection = getSelection(document);
	    const selectionBoundary = getSelectionRect(nativeSelection);
	    const toolbarNode = ReactDOM.findDOMNode(this.refs.container);
	    const toolbarBoundary = toolbarNode.getBoundingClientRect();

	    const parent = ReactDOM.findDOMNode(this.props.editorNode);
	    const parentBoundary = parent.getBoundingClientRect();

	    toolbarNode.style.top = selectionBoundary.top + selectionBoundary.height - parentBoundary.top + 10;
	    let left = (selectionBoundary.width/2) + selectionBoundary.left - parentBoundary.left;
	    toolbarNode.style.left = left;
	    if (!this.hasExisting()) {
	    	this.refs['first-field'].focus();
	    }

		}, 30);

		/* Body click handlers to close */
		$("body").on("click", this.outsideClickHandler);

	}

	outsideClickHandler = (e) => {
		var el = e.target;
    // Clicking outside this component
    if ($(el).closest(this.refs.container).length == 0) {
      this.props.onClickClose();
    }
	}

	componentWillUnmount() {
		setTimeout(()=> {
			this.props.focus();
		}, 50);
		$("body").off("click", this.outsideClickHandler);
	}

	focus() {
		this.refs.select.focus();
	}

	onSelectLink = (item) => {
		if (item) {
			this.setState({
				itemId: item.id,
				text: item.title,
				external: false
			});
		}
	}

	onClickDelete = () => {
		this.props.onClickDelete();
	}

	onTextChange = (e) => {
		this.setState({
			text: e.target.value
		})
	}

	onUrlChange = (val) => {
		this.setState({
			url: val,
			text: val
		})
	}

	toggleExternal = (e) => {
    let value = e.target.checked;
		this.setState({
			external: value
		})
	}

	onKeyDown = (e) => {
		if (e.keyCode === 27) {
			e.preventDefault();
			this.props.onClickClose();
		}
	}

	/*
	onBlur = (e) => {
		e.stopPropagation();
		this.props.onClickClose();
	}
	*/
	


	onSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let { external, url, itemId, text } = this.state;
		this.props.onSelect({ external, url, itemId, text });
	}

	hasExisting() {
		let { entityData } = this.props;
		return entityData.url !== "" || entityData.itemId !== null;
	}

	render() {

		let { external, url, itemId, text } = this.state;
		let { type, entityData } = this.props;
		let existingEntity = this.hasExisting();
		let linkValue = itemId ? allItems.filter(item=>item.id===itemId)[0] : null;

		return (
			<div className="tag-selector" ref="container" onKeyDown={this.onKeyDown}>
				
				<span className="form-small-close" onClick={this.props.onClickClose}>&times;</span>
				{
					existingEntity ?
							<span className="tag-selector__trash" onClick={this.props.onClickDelete}>
								<i className="fa fa-trash-o"></i>
							</span>
						:
							null
				}

				{
					type === "content" ?
					(
						<div>
							<form onSubmit={this.onSubmit} className="form-dark-theme">
								<div className="field-wrapper">
									<div className="tag-selector__wrapper">
						        <Selectbox
						        ref="first-field"
						        onChange={this.onSelectLink}
						        helpText="" 
						        label="Content item" 
						        items={allItems}
						        search={true}
						        allowCustomText={false}
						        showComplex={true}
						        value={linkValue}
						        inputPlaceholder="Type title of content item..."
						        hideMenuUntilType={true}/>
					        </div>
				        </div>
				        {/*<div className="field-wrapper">
					        <Text 
					        	label="Display text"
					        	value={text}
					        	onChange={this.onTextChange}
					        />
				        </div>*/}
			          <div className="field-wrapper">
			            <label className="field-checkbox">
			              <input type="checkbox" className="form-checkbox" checked={external} onChange={this.toggleExternal} />
			              <span>Open link in a new window/tab</span>
			            </label>
			          </div>
				        <button className="tag-selector__insert" type="submit">Insert</button>
			        </form>
		        </div>
					)
					:
					(
						<div>
							<form onSubmit={this.onSubmit} className="form-dark-theme">
								<span className="form-small-close" onClick={this.props.onClickClose}>&times;</span>
				        <div className="field-wrapper">
					        <Text 
					        	ref="first-field"
					        	label="URL"
					        	value={url}
					        	onChange={this.onUrlChange}
					        	placeholder="http://..."
					        />
				        </div>
			        </form>
		        </div>
					)

				}



			</div>
		)
	}
}