import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

class Preview extends Component {

	render() {
		const field = this.props.fields[this.props.fieldId];
		const value = field.value;
		let content = null;
		if (field.widget === "RTEditor") {
			let html = field.blocks.map((block) => {
				return typeof block === "string" ? block : block.html;
			}).join("");
			content = <div dangerouslySetInnerHTML={{ __html: html }}></div>
		}
		else {
			content = <div>{ value }</div>
		}
		return (
			<div>{ content }</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    fields: state.fields
  }
}



export default connect(mapStateToProps)(Preview);