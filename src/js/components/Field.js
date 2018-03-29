import React, { Component, PropTypes } from 'react';
import socket from '../client/socketClient';
import { getUserData } from '../services/users';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { debounce } from "lodash";

class Field extends Component {

	static propTypes = {
		name: PropTypes.string,
		field: PropTypes.object,
		client: PropTypes.object,
		hightlight: PropTypes.bool,
		addPencil: PropTypes.bool
	};

	static defaultProps = {
		hightlight: true
	};

	releaseOnIdle = debounce(()=> {
			const fieldId = this.props.field.id;
			socket.emit("FIELD_BLUR", fieldId);
	}, 30000)

	onChange = (newVal) => {
		const userId = this.props.client.user.id;
		const fieldId = this.props.field.id;
		socket.emit("FIELD_CHANGE", userId, fieldId, newVal);
		this.releaseOnIdle();
	}

	onStopEdit = () => {
		const fieldId = this.props.field.id;
		socket.emit("FIELD_BLUR", fieldId);
	}

	onStartEdit = () => {
		const userId = this.props.client.user.id;
		const fieldId = this.props.field.id;
		socket.emit("FIELD_FOCUS", userId, fieldId);
		this.releaseOnIdle();
	}

	shouldComponentUpdate(nextProps) {
		let currField = this.props.field;
		let nextField = nextProps.field;
		if (currField !== nextField) {
			return true;
		}
		return false;
	}

	render() {
		let { name, field, client, addPencil, detected } = this.props;
		if (!field) { return (<div className="field-wrapper" />); }
		let currentEditor = null;
		let isLocked = field.currentEditor !== null && field.currentEditor !== client.user.id;
		let imEditing = field.currentEditor === client.user.id;
		let editorUser = getUserData(field.currentEditor);
		let editorName = editorUser ? editorUser.name : "";
		let widget;

		let child = this.props.children;
		if (child) {
			widget = React.cloneElement(child, {
				onChange: this.onChange,
				onStartEdit: this.onStartEdit,
				onStopEdit: this.onStopEdit,
				value: field.value,
				required: field.required,
				detected: detected,
				label: field.label,
				helpText: field.helpText,
				isLocked: isLocked,
				imEditing: imEditing,
				editor: editorUser
	    });
		}
		else {
			widget = null;
		}


		let classnames = classNames({
			'field-wrapper': true,
			'field-wrapper--locked': isLocked,
			'field-wrapper--pencil': addPencil
		});

		if (isLocked) {
			classnames = classnames + " theme-color-background-light-" + editorUser.colorProfile;
		}

		return (
			<div className={classnames}>
				{ widget }
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    client: state.client
  }
}



export default connect(mapStateToProps)(Field);
