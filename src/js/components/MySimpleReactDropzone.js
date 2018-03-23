import React, { Component, PropTypes } from "react";
import Chat from "./Chat";
import Field from "./Field";
import BaseLayout from "./BaseLayout";
import { Card, CardSection, CardBoard } from "./Card";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import moment from "moment";
import Selectbox from "./form/Selectbox";
import TextArea from "./form/TextArea";
import FieldWidgets from "./form/FieldWidgets";
import Switch from "./form/Switch";

import Truncate from 'react-truncate';

import $ from "jquery";

import RegistrationStatus from './RegistrationStatus';


import { SimpleReactDropzone } from "../lib/ui/SimpleReactDropzone"; //'simple-react-dropzone';
import { defaultIcons } from "../lib/ui/DefaultIcons";
import EditFileOverlay from './EditFileOverlay';

import Dropzone from './Dropzone';






const uploadIcon = defaultIcons.react.uploadIcon;
let filesArray = [];



let fakeFileIdCounter = 0;
function getNewFakeFileId() {
	return ++fakeFileIdCounter;
}

class MySimpleReactDropzone extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      loadedFiles: []

    }
	}

	componentDidMount() {
		let dropzone = this.mySimpleReactDropzone.myDropzone;

		let minSteps = 6,
		maxSteps = 60,
		timeBetweenSteps = 100,
		bytesPerStep = 100000;

		let totalSteps;

		dropzone.uploadFiles = function(files) {
			let self = this;
			for (let i = 0; i < files.length; i++) {
				let file = files[i];
				totalSteps = Math.round(
					Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep))
					);
				console.info("Fake upload started for file: " + file.name + "...");
				for (let step = 0; step < totalSteps; step++) {
					var duration = timeBetweenSteps * (step + 1);
					setTimeout(
						(function(file, totalSteps, step) {
							return function() {
								file.upload = {
									progress: 100 * (step + 1) / totalSteps,
									total: file.size,
									bytesSent: (step + 1) * file.size / totalSteps
								};

								self.emit(
									"uploadprogress",
									file,
									file.upload.progress,
									file.upload.bytesSent
									);
								if (file.upload.progress === 100) {
									file.status = "success";
									file.id = getNewFakeFileId();
									filesArray.push(file);
									console.log(filesArray);

                  this.setState({loadedFiles: filesArray})
                   console.log(this.state.loadedFiles)
									self.emit("success", file, "success", null);
									self.emit("complete", file);
									self.processQueue();
									console.info("Fake upload ended for file: " + file.name);
								}
							};
						})(file, totalSteps, step),
						duration
						);
				}
			}
		  
		};
	}

	reset() {
		this.mySimpleReactDropzone.reset();
	}


	render() {

		return (
      <div>
			<SimpleReactDropzone
			
			/>
 

   
        <Dropzone loadedFiles={this.state.loadedFiles}/>
        </div>
			);
  
	}
}

const mapStateToProps = state => {
  return {
    fields: state.fields,
    lockedBy: state.contentItem.lockedBy,
    client: state.client
  };
};

export default connect(mapStateToProps)(MySimpleReactDropzone);
