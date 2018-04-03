import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import moment from "moment";
import Truncate from 'react-truncate';
import $ from "jquery";
import RegistrationStatus from './RegistrationStatus';
import { defaultIcons } from "../lib/ui/DefaultIcons";

export default class UploadedFile extends Component {

	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { handleClick, file, updateFilesForBulkList, removeFile, deleteFilePrompt, type, src, name, size, i, selected, imageSelectionEnabled, videoSelectionEnabled, audioSelectionEnabled, multiSelect, files, target, id, setRef } = this.props;

	const classnames = classNames({
			"files-information": true,
			"files-information--show": selected
		});

		const imageSelector = classNames({
			"image-button": videoSelectionEnabled || audioSelectionEnabled,
			"image-button--highlighted": imageSelectionEnabled,
			
		});

		const videoSelector = classNames({
			"video-button": imageSelectionEnabled || audioSelectionEnabled,
			"video-button--highlighted": videoSelectionEnabled,
			
		});

		const audioSelector = classNames({
			"audio-button": videoSelectionEnabled || imageSelectionEnabled,
			"audio-button--highlighted": audioSelectionEnabled,
			
		});

		const bulkDisable = classNames({
			"bulk-button": true,
			"disabled": !videoSelectionEnabled && !imageSelectionEnabled && !audioSelectionEnabled
		});

		const checkboxDisable = classNames({
			"check": true,
			"hidden": !videoSelectionEnabled && !imageSelectionEnabled && !audioSelectionEnabled
		});

		const loadingAnimation = classNames({
			"": false,
			"hidden": !multiSelect
		});

		return (
	   			<div key={i} className="dz-preview-new dz-processing dz-image-preview" >
					<div className="dz-image" value={i} key={i} onClick={this.props.handleClick.bind(this, i, file)}>
					<div>
					{ 
						(file.type == 'video/mp4') ? (
							<img data-dz-thumbnail className="thumbnail" src={ thumbSrc }/>) : (
							<img data-dz-thumbnail className="thumbnail" src={ src }/>)
					}
					<img key={i} data-dz-thumbnail className="thumbnail"
					src={ src }/>
					</div>
					</div>
					<div className="dz-details">
					<div className="dz-size">
					<span>
					<strong>{(size / 1024).toFixed(2)}</strong>KB
					</span>
					</div>
					<div className="dz-remove" onClick={this.props.deleteFilePrompt.bind(this, i)}>
					<div>
					<svg
					style={{
						display: "inlineBlock",
						color: "rgba(255, 255, 255, 0.87)",
						fill: "currentColor",
						height: "24px",
						width: "24px",
						userSelect: "none",
						viewBox: "0 0 24 24"
					}}
					>
					<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
					</svg>
					</div>
					</div>
					</div>
					<div className="dz-checkbox">
					<input 
					key={file} 
					type="checkbox"
					className={type}
					onClick={this.props.updateFilesForBulkList.bind(this, i, file)}
					/>
					<div className={checkboxDisable} ref={id} value={i} key={i} onClick={this.props.updateFilesForBulkList.bind(this, i, file)}><i className="iconcss icon-checkmark"></i></div>
					</div>

					<span className="dz-title"><Truncate lines={1} ellipsis={"..." + name.slice(-12)}>
								{ name }
						</Truncate></span>
					<span className="dz-icon">
					{ (file.type == 'image/jpeg') ? <i className="iconcss icon-type-image"></i> : null }
					{ (file.type == 'image/png') ? <i className="iconcss icon-type-image"></i> : null }
					{ (file.type == 'video/mp4') ? <i className="iconcss icon-type-video"></i> : null }
					</span>
					<span className="dz-status" id={name}>
						<RegistrationStatus/>
					</span>

					<div className="dz-filename">
					<a className="downloadLink">
					<span />
					</a>
					</div>


					<div className="dz-progress">
					<span
					className="dz-upload"
					
					>
					<strong />
					</span>
					</div>

					<div className="dz-success-mark">
					<i className="iconcss icon-check-cutout"></i>
					</div>

					<div className="dz-error-message">
					<span />
					</div>

					<div className="dz-error-mark">
					<span />
					</div>

					<div className="dz-edit" onClick={this.props.handleClick.bind(this, i, file)}>
					<span />
					</div>
					</div>	
					    	
		)
	}
}