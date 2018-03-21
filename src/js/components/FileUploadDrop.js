import React, { Component, PropTypes } from 'react';
import socket from '../client/socketClient';
import { getUserData } from '../services/users';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import $ from "jquery";

class FileUploadDrop extends Component {

	onDrop = (acceptedFiles) => {
		let files = acceptedFiles.map(file=>{
			return {
				name: file.name,
				type: file.type
			}
		});
		socket.emit("ADD_MEDIA", files);
		this.props.onCloseClick();
	}

	onCloseClick = (e) => {
		e.stopPropagation();
		this.props.onCloseClick();
	}

	render() {
		return (
			<Dropzone onDrop={this.onDrop} className="file-upload-drop" >
					<button type="button" className="skinny-close file-upload-drop__close" aria-label="Close" onClick={this.onCloseClick}>
						<span aria-hidden="true">×</span>
					</button>
					<div className="file-upload-drop__top">
						<i className="fa fa-upload"/> Drop files here
					</div>
					<div className="file-upload-drop__or">
						Or
					</div>
					<button className="file-upload-drop__button">
						Choose files...
					</button>
			</Dropzone>
		)
	}
}


export default FileUploadDrop;
