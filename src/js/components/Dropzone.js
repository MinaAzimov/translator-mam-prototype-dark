import React, { Component, PropTypes } from "react";
import Chat from "./Chat";
import Field from "./Field";
import BaseLayout from "./BaseLayout";
import Prompt from './Prompt';
import { Card, CardSection, CardBoard } from "./Card";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import moment from "moment";
import TextArea from "./form/TextArea";
import FieldWidgets from "./form/FieldWidgets";
import Switch from "./form/Switch";
import Svg from "./staticFields/Svg";
import UploadedFile from "./UploadedFile";
import FileInformationModal from "./FileInformationModal";
import axios from 'axios';
import NumericInput from 'react-numeric-input';
import Bricks from 'bricks.js';


import Truncate from 'react-truncate';
import $ from "jquery";
import RegistrationStatus from './RegistrationStatus';
import firebase from './firebase.js'

import { SimpleReactDropzone } from "../lib/ui/SimpleReactDropzone"; //'simple-react-dropzone';
import { defaultIcons } from "../lib/ui/DefaultIcons";
import EditFileOverlay from './EditFileOverlay';

import NotifyButton from './NotifyButton';
import ListViewHeader from './ListViewHeader';
import DropzoneFilter from './DropzoneFilter';


const uploadIcon = defaultIcons.react.uploadIcon;
let filesArray = [];
const typeListVideo=[{title:"Promo",id:0},{title:"Episodic",id:1},{title:"Theatrical",id:2},{title:"Footage",id:3},{title:"Short",id:4}];
const typeListImage=[{title:"Photography",id:0},{title:"Graphic",id:1},{title:"Art",id:2},{title:"Print",id:3},{title:"Logo",id:4}];
const secondaryTypeListVideo=[{title:"Texted",id:0},{title:"Textless",id:1},{title:"Masked",id:2},{title:"Unmasked",id:3}];
const secondaryTypeListImage=[{title:"Episodic Stills (TV)",id:0},{title:"Gallery Stills (TV)",id:1},{title:"Stills (FILM)",id:2},{title:"Behind the Scenes",id:3},{title:"Publicity Events",id:4},{title:"Artwork",id:5},{title:"Other",id:6}];
const fileIncList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const mediaTypeList=[{title:"Video",id:0},{title:"Audio",id:1},{title:"Image",id:2}];
const frameRateList=[{title:"24p",id:0},{title:"25p",id:1},{title:"29.97p",id:2},{title:"30p",id:3},{title:"48p",id:4},{title:"50i",id:5},{title:"60i",id:6},{title:"59.94p",id:7},{title:"50p",id:8},{title:"60p",id:9},{title:"72p",id:10},{title:"100p",id:11},{title:"119.88p",id:12},{title:"120p",id:13},{title:"300FPS",id:14}];
const aspectRatioList=[{title:"16x9 full frame (1:78)",id:0},{title:"16x9 letterbox (1:88)",id:1},{title:"16x9 letterbox (2:00)",id:2},{title:"16x9 letterbox (2:21)",id:3},{title:"16x9 letterbox (2:35)",id:4},{title:"16x9 letterbox (2:40)",id:5},{title:"16x9 letterbox (2:76)",id:5},{title:"16x9 side matted (1:33)",id:5},{title:"16x9 side matted (1:66)",id:5},{title:"4x3 full frame (1:33)",id:5},{title:"4x3 letterbox (1:66)",id:5},{title:"4x3 letterbox !1:78)",id:5},{title:"4x3 letterbox (2:10)",id:5},{title:"4x3 letterbox (2:35)",id:5},{title:"4x3 letterbox (2:40)",id:5},{title:"4x3 letterbox (2:76)",id:5}];
const airVersionList=[{title:"International Broadcast Master",id:0},{title:"Domestic Broadcast Master",id:1},{title:"International Broadcast Master",id:2},{title:"International French OFCOM Compliant Broadcast Master",id:3},{title:"Uncensored Master",id:4},{title:"Submaster",id:5}];
const showList=[{title:"Show 1",id:0},{title:"Show 2",id:1},{title:"Show 3",id:2},{title:"Show 4",id:3}];
const episodeList=[{title:"Season 1",id:0},{title:"Season 2",id:1},{title:"Season 3",id:2},{title:"Season 4",id:3}];
const actorsList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const networkList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];

let fakeFileIdCounter = 0;
function getNewFakeFileId() {
	return ++fakeFileIdCounter;
}

class MySimpleReactDropzone extends React.Component {
	constructor(props) {
		super(props);
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
									file.upload.bytesSent,

									);
								if (file.upload.progress === 100) {
									file.status = "success";
									file.id = getNewFakeFileId();
									filesArray.push(file);
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
			//this.instance.pack();
		};
	}

	reset() {
		this.mySimpleReactDropzone.reset();
	}


	render() {

		return (
			<SimpleReactDropzone
			ref={ref => (this.mySimpleReactDropzone = ref)}
			deleteUrl={(file, onSuccess, onError) => {
				console.log("Fake server file delete. File name: ", file.fileName);
				filesArray.pop(file);
				onSuccess();
			}}
			downloadUrl={file => {
				window.alert("Fake download of the file: " + file.name);
			}}
			dragAndClickMessage={
				<div>
				<div>{uploadIcon}</div>
				<div>Drag and drop files here or click here.</div>
				</div>
			}
			noneFilesMessage="No uploaded files"
			{...this.props}
			/>
			);
	}
}

class Dropzone extends Component {
	constructor(props) {
		super(props);
		this.instance = {};
		this.state = {
			shellCreate: {
				video: 0,
				image: 0,
				audio: 0
			},
			shellFiles: [],
			showDeletePrompt: false,
			showCreateShellPrompt: false,
			notifyWhenUploadComplete: false,
	        uploadDropzoneShow: true,
			bulkEditOpen: false,
			files: [],
			inputTextValue: ' ',
			counter: 0,
			targetID: 0,
			percentage: 10,
			selectedFilter: null,
			resetToUploadMode: false,
			selectedFilterSevice: null,
			selectedFilterOptimezed: null,
			multiSelect: false,
			showModal: false,
			checked: true,
			isSelectedforBulk: false,
			imageSelectionEnabled: false,
			audioSelectionEnabled: false,
			videoSelectionEnabled: false,
			itemsForBulk: [],
			localUploadAttempt: false,
			showGridView: true,
			itemStatus: "Needs Metadata",
			target: [],
			selected: false,
			uploadState: {
				newUploadedFiles: [],
				alreadyAssociatedRemovedFiles: [],
				hasPendingUpload: false
			},
			uploadStateImediate: {
				newUploadedFiles: [],
				alreadyAssociatedRemovedFiles: [],
				hasPendingUpload: false
			},
			existingFiles: [],
			existingFiles2: [],
			targetedInput: '',
			inputHouseID: '',
			inputComposition: '',
			inputColor: '',
			inputPromoCode: '',
			inputShow: '',
			inputEpisodeNumber: '',
			inputDescription: '',
			inputUploader: '',
			inputKeywords: '',
			inputProductionType: '',
			inputActors: '',
			inputNetwork: '',
			inputLanguage: '',
			inputCopyright: '',
			inputRestrictions: '',
			inputSeason: '',
			inputMediaType: '',
			inputMaterialType: '',
			inputSecondaryType: '',
			inputFrameRate: '',
			inputAspectRatio: '',
			inputTitle: '',
			inputSubtitle: '',
			inputContentType: '',
			inputFileName: '',
			inputAssosiations: '',
			inputEpisode: '',
			inputVersionType: '',
			inputText: '',
			inputAirVersion: '',
			inputProducer: '',
			inputCreative: '',
			inputStorageLocation: '',
			inputAcSource: '',
			inputUserDescription: '',
			inputPeople: '',
			inputUserComments: ''
		};
	}

componentWillReceiveProps(nextProps) {
  if (nextProps.files !== this.props.localFiles && nextProps.editingLocalProject) {
    this.setState({ files: nextProps.localFiles[0].items, uploadDropzoneShow: false });
  }

  if (nextProps.files !== this.props.localFiles && nextProps.editingLocalProject && nextProps.editingLocalItem) {
    this.setState({ files: nextProps.localFiles[0].items,
                    selected: true,
                    target: this.props.localItem, uploadDropzoneShow: false});
  }

  if (nextProps.files !== this.props.localFiles && !nextProps.editingLocalProject) {
    this.setState({ files: filesArray, uploadDropzoneShow: true });
  }
  
}

  clickNotifyMe = () => {
    this.setState({
      notifyWhenUploadComplete: !this.state.notifyWhenUploadComplete 
    });
  }

  clickUploadToggle = () => {
	// this.closeFilesInformation();
  	this.smoothScrollTo(0,0,600);
    this.setState({
      uploadDropzoneShow: !this.state.uploadDropzoneShow 
    });
  }


	removeFile = (i) => {
		var array = this.state.files;
		var index = i;
		console.log(index);
		array.splice(index, 1);
		this.setState({
			files: array,
			target: array,
			selected: false
		});
	}

	removeFileFromPrompt = () => {

		let i = this.state.itemToDelete;
		var array = this.state.files;
		var index = i;
		console.log(index);
		array.splice(index, 1);
		
		var name = this.props.client.user.name
		var project = this.props.currentProject;

		this.setState({
			files: array,
			target: array,
			selected: false,
	  		showDeletePrompt: !this.state.showDeletePrompt
			});

	if(this.props.editingLocalProject || this.props.editingLocalItem) {
		var usersRef = firebase.database().ref('projects/'+ name+ '/' + project)
	    var itemsRef = usersRef.child('items');
		itemsRef.once('value', snapshot => {
		let updates = {};
		snapshot.forEach(snap => updates[snap.key] = null);
		itemsRef.update(updates);
		})    
		}   

	}

	// openPromptAndRemoveFile = (i) => {
	// 	this.setState({
	//   		showDeletePrompt: true,
	// 	});

	// 	var array = this.state.files;
	// 	var index = i;
	// 	console.log(index);
	// 	array.splice(index, 1);
	// 	this.setState({
	// 		files: array,
	// 		target: array,
	// 		selected: false
	// 	});

	// setTimeout(function() {
	// 	this.setState({
	//   		showDeletePrompt: false,
	// 	});
	// }, 600);
	// }

	deleteFilePrompt = (i) => {
		console.log(i);
	    this.setState({
	  		showDeletePrompt: !this.state.showDeletePrompt,
	  		itemToDelete: i
		});
	}

	createShellPrompt = (i) => {

		this.state.shellFiles.forEach((file, i) => {
			file.inputTitle = 'shell_item' + "_" + i;
			file.inputStatus = "Needs Metadata";

		})
	    this.setState({
	  		showCreateShellPrompt: !this.state.showCreateShellPrompt,
	  		files: this.state.files.concat(this.state.shellFiles),
	  		shellFiles: [],
	  		shellCreate: {
				video: 0,
				image: 0,
				audio: 0
			}
		});

	}

	closeFilesInformation = () => {
		this.setState({ selected: false });
	}

	smoothScrollTo = (endX, endY, duration) => {
		var startX = window.scrollX || window.pageXOffset,
			startY = window.scrollY || window.pageYOffset,
			distanceX = endX - startX,
			distanceY = endY - startY,
			startTime = new Date().getTime();

		duration = typeof duration !== 'undefined' ? duration : 400;
		var easeInOutQuart = function(time, from, distance, duration) {
			if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
			return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
		};
		var timer = window.setInterval(function() {
			var time = new Date().getTime() - startTime,
				newX = easeInOutQuart(time, startX, distanceX, duration),
				newY = easeInOutQuart(time, startY, distanceY, duration);
			if (time >= duration) {
				window.clearInterval(timer);
			}
			window.scrollTo(newX, newY);
		}, 1000 / 60); 
	};


	handleClick = (i, file) => {
		let itemSize = 272;
		if(this.state.target.length > 0) {
			i = this.props.localItem.id;
			file = this.props.localItem
			this.handleClick(i, file)
			return
		}

		if (!this.state.showGridView) {
			itemSize = 99;
		} 

		 this.setState({ target: this.state.files[i], selected: true});

		 let scrollToContainer;
		 if (this.state.showGridView) {
			scrollToContainer = document.getElementsByClassName('masonry-grid-view')[0].offsetTop;
		  }
		  else {
			scrollToContainer = document.getElementsByClassName('list-view')[0].offsetTop;
		 }

		 console.log(this.state.files[i]);
		 console.log(i);

		 let filesInformation = document.getElementsByClassName('files-information')[0];

		 let scrollTo = document.getElementsByClassName('dz-preview-new')[i].offsetTop;
		 let itemHeight = document.getElementsByClassName('dz-preview-new')[i].offsetHeight;

		 filesInformation.style.top = scrollToContainer + scrollTo + itemHeight;
		 setTimeout(() => { this.smoothScrollTo(0, (scrollToContainer + scrollTo) - 7, 600) }, 0);
		 if (filesInformation.classList.contains('callout-1')) { filesInformation.classList.remove('callout-1');}
		 if (filesInformation.classList.contains('callout-2')) { filesInformation.classList.remove('callout-2');}
		 if (filesInformation.classList.contains('callout-3')) { filesInformation.classList.remove('callout-3');}
		 if (filesInformation.classList.contains('callout-4')) { filesInformation.classList.remove('callout-4');}

		 if (document.getElementsByClassName('dz-preview-new')[i].offsetLeft <= 12) {
			setTimeout(() => { filesInformation.classList.add('callout-1'); }, 0);
		}
		else if (document.getElementsByClassName('dz-preview-new')[i].offsetLeft <= 324) {
			setTimeout(() => { filesInformation.classList.add('callout-2'); }, 0);
		}
		else if (document.getElementsByClassName('dz-preview-new')[i].offsetLeft <= 636) {
			setTimeout(() => { filesInformation.classList.add('callout-3'); }, 0);
		}
		else if (document.getElementsByClassName('dz-preview-new')[i].offsetLeft <= 948) {
			setTimeout(() => { filesInformation.classList.add('callout-4'); }, 0);
		}

		if (!this.state.showGridView) {
			setTimeout(() => { 
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-1')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-1');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-2')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-2');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-3')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-3');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-4')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-4');}
			}, 5);
		}

		if(!this.state.files[i].test) {
			this.setState({
             inputHouseID: this.state.files[i].inputHouseID ? this.state.files[i].inputHouseID : '',
            inputComposition: this.state.files[i].inputComposition ? this.state.files[i].inputComposition : '',
            inputColor: this.state.files[i].inputColor ? this.state.files[i].inputColor : '',
            inputPromoCode: this.state.files[i].inputPromoCode ? this.state.files[i].inputPromoCode : '',
            inputShow: this.state.files[i].inputShow ? this.state.files[i].inputShow : '',
            inputEpisode:  this.state.files[i].inputEpisode ? this.state.files[i].inputEpisode : '',
			inputDescription:  this.state.files[i].inputDescription ? this.state.files[i].inputDescription : '',
			inputUploader:  this.state.files[i].inputUploader ? this.state.files[i].inputUploader : '',
			inputKeywords:  this.state.files[i].inputKeywords ? this.state.files[i].inputKeywords : '',
			inputProductionType:  this.state.files[i].inputProductionType ? this.state.files[i].inputProductionType : '',
			inputActors:  this.state.files[i].inputActors ? this.state.files[i].inputActors : '',
			inputNetwork:  this.state.files[i].inputNetwork ? this.state.files[i].inputNetwork : '',
			inputLanguage:  this.state.files[i].inputLanguage ? this.state.files[i].inputLanguage : '',
			inputCopyright:  this.state.files[i].inputCopyright ? this.state.files[i].inputCopyright : '',
			inputRestrictions:  this.state.files[i].inputRestrictions ? this.state.files[i].inputRestrictions : '',
			inputSeason:  this.state.files[i].inputSeason ? this.state.files[i].inputSeason : '',
			inputMediaType: this.state.files[i].inputMediaType ? this.state.files[i].inputMediaType : '',
			inputMaterialType: this.state.files[i].inputMaterialType ? this.state.files[i].inputMaterialType : '',
			inputSecondaryType: this.state.files[i].inputSecondaryType ? this.state.files[i].inputSecondaryType : '',
			inputFrameRate: this.state.files[i].inputFrameRate ? this.state.files[i].inputFrameRate : '',
			inputAspectRatio: this.state.files[i].inputAspectRatio ? this.state.files[i].inputAspectRatio : '',
			inputTitle: this.state.files[i].inputTitle ? this.state.files[i].inputTitle : '',
			inputSubtitle: this.state.files[i].inputSubtitle ? this.state.files[i].inputSubtitle : '',
			itemStatus: this.state.files[i].inputStatus ? this.state.files[i].inputStatus : '',
			inputContentType: this.state.files[i].inputContentType ? this.state.files[i].inputContentType : '',
			inputFileName: this.state.files[i].inputFileName ? this.state.files[i].inputFileName : '',
			inputAssosiations: this.state.files[i].inputAssosiations ? this.state.files[i].inputAssosiations : '',
			inputVersionType: this.state.files[i].inputVersionType ? this.state.files[i].inputVersionType : '',
			inputProducer: this.state.files[i].inputProducer ? this.state.files[i].inputProducer : '',
			inputCreative: this.state.files[i].inputCreative ? this.state.files[i].inputCreative : '',
			inputStorageLocation: this.state.files[i].inputStorageLocation ? this.state.files[i].inputStorageLocation : '',
			inputAcSource: this.state.files[i].inputAcSource ? this.state.files[i].inputAcSource : '',
			inputUserDescription: this.state.files[i].inputUserDescription ? this.state.files[i].inputUserDescription : '',
			inputPeople: this.state.files[i].inputPeople ? this.state.files[i].inputPeople : '',
			inputUserComments: this.state.files[i].inputUserComments ? this.state.files[i].inputUserComments : ''

          });
			console.log(this.state.files[i])
		}

		if(this.state.files[i].test == "edited") {
			this.setState({
            inputHouseID: this.state.files[i].inputHouseID ? this.state.files[i].inputHouseID : '',
            inputComposition: this.state.files[i].inputComposition ? this.state.files[i].inputComposition : '',
            inputColor: this.state.files[i].inputColor ? this.state.files[i].inputColor : '',
            inputPromoCode: this.state.files[i].inputPromoCode ? this.state.files[i].inputPromoCode : '',
            inputShow: this.state.files[i].inputShow ? this.state.files[i].inputShow : '',
            inputEpisode:  this.state.files[i].inputEpisode ? this.state.files[i].inputEpisode : '',
			inputDescription:  this.state.files[i].inputDescription ? this.state.files[i].inputDescription : '',
			inputUploader:  this.state.files[i].inputUploader ? this.state.files[i].inputUploader : '',
			inputKeywords:  this.state.files[i].inputKeywords ? this.state.files[i].inputKeywords : '',
			inputProductionType:  this.state.files[i].inputProductionType ? this.state.files[i].inputProductionType : '',
			inputActors:  this.state.files[i].inputActors ? this.state.files[i].inputActors : '',
			inputNetwork:  this.state.files[i].inputNetwork ? this.state.files[i].inputNetwork : '',
			inputLanguage:  this.state.files[i].inputLanguage ? this.state.files[i].inputLanguage : '',
			inputCopyright:  this.state.files[i].inputCopyright ? this.state.files[i].inputCopyright : '',
			inputRestrictions:  this.state.files[i].inputRestrictions ? this.state.files[i].inputRestrictions : '',
			inputSeason:  this.state.files[i].inputSeason ? this.state.files[i].inputSeason : '',
			inputMediaType: this.state.files[i].inputMediaType ? this.state.files[i].inputMediaType : '',
			inputMaterialType: this.state.files[i].inputMaterialType ? this.state.files[i].inputMaterialType : '',
			inputSecondaryType: this.state.files[i].inputSecondaryType ? this.state.files[i].inputSecondaryType : '',
			inputFrameRate: this.state.files[i].inputFrameRate ? this.state.files[i].inputFrameRate : '',
			inputAspectRatio: this.state.files[i].inputAspectRatio ? this.state.files[i].inputAspectRatio : '',
			inputTitle: this.state.files[i].inputTitle ? this.state.files[i].inputTitle : '',
			inputSubtitle: this.state.files[i].inputSubtitle ? this.state.files[i].inputSubtitle : '',
			itemStatus: this.state.files[i].inputStatus ? this.state.files[i].inputStatus : '',
			inputContentType: this.state.files[i].inputContentType ? this.state.files[i].inputContentType : '',
			inputFileName: this.state.files[i].inputFileName ? this.state.files[i].inputFileName : '',
			inputAssosiations: this.state.files[i].inputAssosiations ? this.state.files[i].inputAssosiations : '',
			inputVersionType: this.state.files[i].inputVersionType ? this.state.files[i].inputVersionType : '',
			inputProducer: this.state.files[i].inputProducer ? this.state.files[i].inputProducer : '',
			inputCreative: this.state.files[i].inputCreative ? this.state.files[i].inputCreative : '',
			inputStorageLocation: this.state.files[i].inputStorageLocation ? this.state.files[i].inputStorageLocation : '',
			inputAcSource: this.state.files[i].inputAcSource ? this.state.files[i].inputAcSource : '',
			inputUserDescription: this.state.files[i].inputUserDescription ? this.state.files[i].inputUserDescription : '',
			inputPeople: this.state.files[i].inputPeople ? this.state.files[i].inputPeople : '',
			inputUserComments: this.state.files[i].inputUserComments ? this.state.files[i].inputUserComments : ''

          });
			console.log(this.state.files[i])
		}
				    
}


		saveFilesInformation = (i, file) => {
			this.state.target.test = "edited";
			this.state.target.inputHouseID = this.state.inputHouseID;
			this.state.target.inputComposition = this.state.inputComposition;
			this.state.target.inputColor = this.state.inputColor;
			this.state.target.inputPromoCode = this.state.inputPromoCode;
			this.state.target.inputShow = this.state.inputShow;
			this.state.target.inputEpisode = this.state.inputEpisode;
			this.state.target.inputDescription = this.state.inputDescription;
			this.state.target.inputUploader = this.state.inputUploader;
			this.state.target.inputKeywords = this.state.inputKeywords;
			this.state.target.inputProductionType = this.state.inputProductionType;
			this.state.target.inputActors = this.state.inputActors;
			this.state.target.inputNetwork = this.state.inputNetwork;
			this.state.target.inputLanguage = this.state.inputLanguage;
			this.state.target.inputCopyright = this.state.inputCopyright;
			this.state.target.inputRestrictions = this.state.inputRestrictions;
			this.state.target.inputSeason = this.state.inputSeason;
			this.state.target.inputMediaType = this.state.inputMediaType;
			this.state.target.inputMaterialType = this.state.inputMaterialType;
			this.state.target.inputSecondaryType = this.state.inputSecondaryType;
			this.state.target.inputFrameRate = this.state.inputFrameRate;
			this.state.target.inputAspectRatio = this.state.inputAspectRatio;
			this.state.target.inputTitle = this.state.inputTitle;
			this.state.target.inputSubtitle = this.state.inputSubtitle;
			this.state.target.inputStatus = this.state.itemStatus;
			this.state.target.inputContentType = this.state.inputContentType;
			this.state.target.inputFileName = this.state.inputFileName;
			this.state.target.inputAssosiations = this.state.inputAssosiations;
			this.state.target.inputVersionType = this.state.inputVersionType;
			this.state.target.inputProducer = this.state.inputProducer;
			this.state.target.inputCreative = this.state.inputCreative;
			this.state.target.inputStorageLocation = this.state.inputStorageLocation;
			this.state.target.inputAcSource = this.state.inputAcSource;
			this.state.target.inputUserDescription = this.state.inputUserDescription;
			this.state.target.inputPeople = this.state.inputPeople;
			this.state.target.inputUserComments = this.state.inputUserComments;

			this.setState({
	      itemStatus: this.state.target.inputStatus
	    });
			
			
		}

	updateTitle = (e) => {
	    this.setState({
	      inputTitle: e.target.value
	    });
	  }

	 updateSubtitle = (e) => {
	    this.setState({
	      inputSubtitle: e.target.value
	    });
	  }

    onInputChange = (e) => {
    if(e.target.id == "filename") {
   			this.setState({
      			inputFileName: e.target.value
    		});
   		}
   	if(e.target.id == "keywords") {
   			this.setState({
      			inputKeywords: e.target.value
    		});
   		}
   	if(e.target.id == "uploader") {
   			this.setState({
      			inputUploader: e.target.value
    		});
   		}
   	if(e.target.id == "producer") {
   			this.setState({
      			inputProducer: e.target.value
    		});
   		}
   	if(e.target.id == "creative") {
   			this.setState({
      			inputCreative: e.target.value
    		});
   		}
   	if(e.target.id == "copyrights") {
   			this.setState({
      			inputCopyright: e.target.value
    		});
   		}
   	if(e.target.id == "restrictions") {
   			this.setState({
      			inputRestrictions: e.target.value
    		});
   		}
   	if(e.target.id == "storage") {
   			this.setState({
      			inputStorageLocation: e.target.value
    		});
   		}
   	if(e.target.id == "acSource") {
   			this.setState({
      			inputAcSource: e.target.value
    		});
   		}
   	if(e.target.id == "area") {
   			this.setState({
      			inputUserDescription: e.target.value
    		});
   		}
   	if(e.target.id == "people") {
   			this.setState({
      			inputPeople: e.target.value
    		});
   		}
   	if(e.target.id == "commentscard") {
   			this.setState({
      			inputUserComments: e.target.value
    		});
   		}
  }


   onDropDownChange = val => {

   		if(val.dropdown == "MediaType") {
   			this.setState({
      			inputMediaType: val
    		});
   		}

   			if(val.dropdown == "Season") {
   			this.setState({
		      inputSeason: val
		    });
   		}

   			if(val.dropdown == "Network") {
   			this.setState({
		      inputNetwork: val
		    });
   		}

   		if(val.dropdown == "Language") {
   			this.setState({
		      inputLanguage: val
		    });
   		}

   		if(val.dropdown == "MaterialType") {
   			this.setState({
		      inputMaterialType: val
		    });

				if (val.title !== "-None-") {
					this.setState({
						itemStatus: "Ready For Ingest"
					});
					
				} 
				if (val.title !== "-None-" && (this.state.inputAspectRatio && this.state.inputAspectRatio !== "-None-")) {
					this.setState({
						itemStatus: "Ready For Service"
					});
					
				} 
				if (val.title !== "-None-" && ((this.state.inputAspectRatio && this.state.inputShow) && (this.state.inputAspectRatio !== "-None-" && this.state.inputShow !== "-None-"))) {
					this.setState({
						itemStatus: "Search Optimized" 
					});
					
				} 
				if(val.title == "-None-") {
					
					this.setState({
						itemStatus: "Needs Metadata"
					});
				} 
   		}

   		if(val.dropdown == "ProductionType") {
   			this.setState({
		      inputProductionType: val
		    });
   		}

   		if(val.dropdown == "Assosiations") {
   			this.setState({
		      inputAssosiations: val
		    });
   		}


   		if(val.dropdown == "Series") {
   			this.setState({
		      inputShow: val
		    });

		    if (val.title !== "-None-" && ((this.state.inputMaterialType !== "-None-" && this.state.inputAspectRatio !== "-None-") && (this.state.inputMaterialType && this.state.inputAspectRatio))) {
				this.setState({
					itemStatus: "Search Optimized"
				});
	
			} 
			if (val.title == "-None-" && ((this.state.inputMaterialType !== "-None-" && this.state.inputAspectRatio !== "-None-") && (this.state.inputMaterialType && this.state.inputAspectRatio))) {
				
				 this.setState({
					itemStatus: "Ready For Service"
				});
			}

				if(((!this.state.target.test || this.state.target.test !== "edited") && this.state.target.editedInBulk !== "edited") && (this.state.target.type == "image/jpeg" || this.state.target.type == "image/jpg" || this.state.target.type == "image/png")) {
						this.state.target.inputTitle = val.title + "_" + this.state.target.width + "x" + this.state.target.height;
						this.state.target.test = "edited";
						this.setState({
				           inputTitle: val.title + "_" + this.state.target.width + "x" + this.state.target.height
			          });
								

					}
				if(((!this.state.target.test || this.state.target.test !== "edited") && this.state.target.editedInBulk !== "edited") && (this.state.target.type == "video/avi" || this.state.target.type == "video/mp4")) {
					this.state.target.inputTitle = val.title + "_" + this.state.target.width + "x" + this.state.target.height + "_";
					this.state.target.test = "edited";
					this.setState({
			           inputTitle: val.title + "_" + "15min"
		          });
					}
				
   		}

   		if(val.dropdown == "Season") {
   			this.setState({
		      inputSeason: val
		    });
   		}

   		if(val.dropdown == "Episode") {
   			this.setState({
		      inputEpisode: val
		    });
   		}

   		if(val.dropdown == "VersionType") {
   			this.setState({
		      inputVersionType: val
		    });
   		}

   		if(val.dropdown == "Text") {
   			this.setState({
		      inputText: val
		    });
   		}

   		if(val.dropdown == "AspectRatio") {
   			this.setState({
		      inputAspectRatio: val
		    });

		        if (val.title !== "-None-" && (this.state.inputMaterialType && this.state.inputMaterialType !== "-None-")) {
					this.setState({
						itemStatus: "Ready For Service"
					});
				}

				if (val.title !== "-None-" && ((this.state.inputMaterialType && this.state.inputShow) && (this.state.inputMaterialType !== "-None-" && this.state.inputShow !== "-None-"))) {
					this.setState({
						itemStatus: "Search Optimized"
					});
				}

				 if(val.title == "-None-" && (this.state.inputMaterialType && this.state.inputMaterialType  !== "-None-")) {
					
				this.setState({
						itemStatus: "Ready For Ingest"
					});
				}
   		}

   		if(val.dropdown == "Air Version") {
   			this.setState({
		      inputAirVersion: val
		    });
   		}



   }

    //if (!val) {
		//this.setState({
			//itemStatus: "Needs Metadata"
		//});
		
	//} 
	//if (val && this.state.inputMaterialType) {
		//this.setState({
			//itemStatus: "Ready For Ingest"
		//});
		
	//} 

	//if (val && this.state.inputMaterialType && this.state.inputAspectRatio) {
		//this.setState({
			//itemStatus: "Ready For Service"
		//});
		
	//} 

	//if (val && this.state.inputMaterialType && this.state.inputAspectRatio && this.state.inputShow) {
		//this.setState({
			//itemStatus: "Search Optimized"
		//});
		
	//} 




bulkEdit() {
	this.setState({
		showModal: true,
		bulkEditOpen: true,
	});
}

closeModal = () => {
	this.setState({
		showModal: false,
		imageSelectionEnabled: false,
		videoSelectionEnabled: false,
		audioSelectionEnabled: false,

	});

		this.state.files.forEach((file, b) => {
			 this.refs[file.id].refs[file.id].firstElementChild.classList.remove('icon-last-modified');
			 this.refs[file.id].refs[file.id].firstElementChild.classList.add('icon-checkmark');
			 var elements = document.getElementsByClassName("image/jpeg--show");
			 var elementsJpg = document.getElementsByClassName("image/jpg--show");
			 var elementsPng = document.getElementsByClassName("image/png--show");
			 var elementsGif = document.getElementsByClassName("image/gif--show");
			 var elementsSvg = document.getElementsByClassName("image/svg+xml--show");
			 var elementsVideo = document.getElementsByClassName("video/mp4--show");
			 var elementsAudio = document.getElementsByClassName("audio/mp3--show");
			 for(var i = 0; i < elements.length; i++){
				   elements[i].className = "image/jpeg";    	 
			 } 
			 for(var i = 0; i < elementsSvg.length; i++){
					elementsSvg[i].className = "image/svg+xml";         
			 }     
			 for(var i = 0; i < elementsJpg.length; i++){
				 elementsJpg[i].className = "image/jpg";    
			 }     
			 for(var i = 0; i < elementsPng.length; i++){
				 elementsPng[i].className = "image/png";    
			 }     
			 for(var i = 0; i < elementsGif.length; i++){
				 elementsGif[i].className = "image/gif";   
			 }
			for(var i = 0; i < elementsVideo.length; i++){
				 elementsVideo[i].className = "video/mp4";   
			 }     
			for(var i = 0; i < elementsAudio.length; i++){
				 elementsAudio[i].className = "audio/mp3";   
			 }    
		});	   
}


disableBulkEdit = val =>  {
	this.setState({
		multiSelect: !this.state.multiSelect,
		itemsForBulk: []
	});

}

updateFilesForBulkList = (i, file) => {
	console.log(this, this.refs, i, file, this.state.itemsForBulk)
	var array = this.state.itemsForBulk;
	if(this.state.itemsForBulk.includes(file)) {
			var index = i;
			array.splice(i, 1);
			this.setState({
				 itemsForBulk: array
			});
			
	} else {
		 this.setState({
				itemsForBulk: this.state.itemsForBulk.concat([file])
			})
 }
 
  if(this.refs[file.id].refs[file.id].firstElementChild.classList.contains('icon-checkmark')) {
  	this.refs[file.id].refs[file.id].firstElementChild.classList.remove('icon-checkmark');
  	this.refs[file.id].refs[file.id].firstElementChild.classList.add('icon-last-modified');
    this.refs[file.id].refs[file.id].classList.add('empty-circle');
  }
 else {
  	this.refs[file.id].refs[file.id].firstElementChild.classList.add('icon-checkmark');
  	this.refs[file.id].refs[file.id].firstElementChild.classList.remove('icon-last-modified');
  	this.refs[file.id].refs[file.id].classList.remove('empty-circle');	 
  }
			
}

	removeFileFromOverlay = (i) => {
	    // setTimeout(() => {
		    var array = this.state.itemsForBulk;
			var index = i.target.value;
			array.splice(index, 1);
			this.setState({
				 itemsForBulk: array
			});
	    // }, 600);
	}

removeDropzone() {
	var downloadURL;
	var name = this.props.client.user.name
	var value = this.props.inputValue;
	var project = this.props.currentProject;
	filesArray = [];
		this.props.hideDropzone();
		this.setState({selected: false, target: [], uploadDropzoneShow: true})


		if(this.props.editingLocalProject || this.props.editingLocalItem) {
		var rootRef = firebase.database().ref();
         var usersRef = firebase.database().ref('projects/'+ name+ '/' + project)
         var itemsRef = usersRef.child('items');

	
		for (var i = 0; i < this.state.files.length; i++) {
        var imageFile = this.state.files[i];
   		var index = i;
   		console.log(i)
		var data = {
			        "projectName": project,
                    "name": imageFile.name,
                    "processing": imageFile.processing,
					"subtitle": "This Sunday: Brand New",
					"type": imageFile.type,
					"lastEditedBy": "Lova Yazdani",
					"lastEditedOn": "03/15/18 at 02:15 PM",
					"lastModified": imageFile.lastModified,
					"previewTemplate" : {
						"firstElementChild": {
							firstChild: {
								currentSrc: imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
							}
						}
					},
					"size": imageFile.size,
					"img": imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
					"src": imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
					"height": "780",
                    "width": "1280",
                    "id": imageFile.id,
                    "test": (imageFile.test ? imageFile.test : 'edited'),
                    "inputHouseID": (imageFile.inputHouseID ? imageFile.inputHouseID : ''),
					"inputComposition": (imageFile.inputComposition ? imageFile.inputComposition : ''),
					"inputColor": (imageFile.inputColor ? imageFile.inputColor : ''),
					"inputPromoCode": (imageFile.inputPromoCode ? imageFile.inputPromoCode : ''),
					"inputShow": (imageFile.inputShow ? imageFile.inputShow : ''),
					"inputEpisode": (imageFile.inputEpisode ? imageFile.inputEpisode : ''),
					"inputDescription": (imageFile.inputDescription ? imageFile.inputDescription : ''),
					"inputUploader": (imageFile.inputUploader ? imageFile.inputUploader : ''),
					"inputKeywords": (imageFile.inputKeywords ? imageFile.inputKeywords : ''),
					"inputProductionType": (imageFile.inputProductionType ? imageFile.inputProductionType : ''),
					"inputActors": (imageFile.inputActors ? imageFile.inputActors : ''),
					"inputNetwork": (imageFile.inputNetwork ? imageFile.inputNetwork : ''),
					"inputLanguage": (imageFile.inputLanguage ? imageFile.inputLanguage : ''),
					"inputCopyright": (imageFile.inputCopyright ? imageFile.inputCopyright : ''),
					"inputRestrictions": (imageFile.inputRestrictions ? imageFile.inputRestrictions : ''),
					"inputSeason": (imageFile.inputSeason ? imageFile.inputSeason : ''),
					"inputMediaType": (imageFile.inputMediaType ? imageFile.inputMediaType : ''),
					"inputMaterialType": (imageFile.inputMaterialType ? imageFile.inputMaterialType : ''),
					"inputSecondaryType": (imageFile.inputSecondaryType ? imageFile.inputSecondaryType : ''),
					"inputFrameRate": (imageFile.inputFrameRate ? imageFile.inputFrameRate : ''),
					"inputAspectRatio": (imageFile.inputAspectRatio ? imageFile.inputAspectRatio : ''),
					"inputTitle": (imageFile.inputTitle ? imageFile.inputTitle : ''),
					"inputSubtitle": (imageFile.inputSubtitle ? imageFile.inputSubtitle : ''),
					"inputStatus": (imageFile.inputStatus ? imageFile.inputStatus : ''),
					"inputContentType": (imageFile.inputContentType ? imageFile.inputContentType : ''),
					"inputFileName": (imageFile.inputFileName ? imageFile.inputFileName : ''),
					"inputAssosiations": (imageFile.inputAssosiations ? imageFile.inputAssosiations : ''),
					"inputVersionType": (imageFile.inputVersionType ? imageFile.inputVersionType : ''),
					"inputProducer": (imageFile.inputProducer ? imageFile.inputProducer : ''),
					"inputCreative": (imageFile.inputCreative ? imageFile.inputCreative : ''),
					"inputStorageLocation": (imageFile.inputStorageLocation ? imageFile.inputStorageLocation : ''),
					"inputAcSource": (imageFile.inputAcSource ? imageFile.inputAcSource : ''),
					"inputUserDescription": (imageFile.inputUserDescription ? imageFile.inputUserDescription : ''),
					"inputPeople": (imageFile.inputPeople ? imageFile.inputPeople : ''),
					"inputUserComments": (imageFile.inputUserComments ? imageFile.inputUserComments : ''),
					"shellType": (imageFile.shellType ? imageFile.shellType : '')
			       }
       var anotherItems = itemsRef.child(i).update(data)
    }  
}

		if(!this.props.editingLocalProject) {
		 var rootRef = firebase.database().ref();
         var usersRef = firebase.database().ref('projects/'+ name+ '/' + value)
         var itemsRef = usersRef.child('items');
         var titleRef = usersRef.child('title').set(this.props.inputValue);

	    for (var i = 0; i < this.state.files.length; i++) {
        var imageFile = this.state.files[i];
       // uploadImageAsPromise(imageFile);
   		var index = i;
		var data = {
					"projectName": this.props.inputValue,
                    "name": imageFile.name,
                    "processing": imageFile.processing,
					"subtitle": "This Sunday: Brand New",
					"type": imageFile.type,
					"lastEditedBy": "Lova Yazdani",
					"lastEditedOn": "03/15/18 at 02:15 PM",
					"lastModified": imageFile.lastModified,
					"previewTemplate" : {
						"firstElementChild": {
							firstChild: {
								currentSrc: imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
							}
						}
					},
					"size": imageFile.size,
					"img": imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
					"src": imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
					"height": "780",
                    "width": "1280",
                    "id": imageFile.id,
                    "test": (imageFile.test ? imageFile.test : 'edited'),
                    "inputHouseID": (imageFile.inputHouseID ? imageFile.inputHouseID : ''),
					"inputComposition": (imageFile.inputComposition ? imageFile.inputComposition : ''),
					"inputColor": (imageFile.inputColor ? imageFile.inputColor : ''),
					"inputPromoCode": (imageFile.inputPromoCode ? imageFile.inputPromoCode : ''),
					"inputShow": (imageFile.inputShow ? imageFile.inputShow : ''),
					"inputEpisode": (imageFile.inputEpisode ? imageFile.inputEpisode : ''),
					"inputDescription": (imageFile.inputDescription ? imageFile.inputDescription : ''),
					"inputUploader": (imageFile.inputUploader ? imageFile.inputUploader : ''),
					"inputKeywords": (imageFile.inputKeywords ? imageFile.inputKeywords : ''),
					"inputProductionType": (imageFile.inputProductionType ? imageFile.inputProductionType : ''),
					"inputActors": (imageFile.inputActors ? imageFile.inputActors : ''),
					"inputNetwork": (imageFile.inputNetwork ? imageFile.inputNetwork : ''),
					"inputLanguage": (imageFile.inputLanguage ? imageFile.inputLanguage : ''),
					"inputCopyright": (imageFile.inputCopyright ? imageFile.inputCopyright : ''),
					"inputRestrictions": (imageFile.inputRestrictions ? imageFile.inputRestrictions : ''),
					"inputSeason": (imageFile.inputSeason ? imageFile.inputSeason : ''),
					"inputMediaType": (imageFile.inputMediaType ? imageFile.inputMediaType : ''),
					"inputMaterialType": (imageFile.inputMaterialType ? imageFile.inputMaterialType : ''),
					"inputSecondaryType": (imageFile.inputSecondaryType ? imageFile.inputSecondaryType : ''),
					"inputFrameRate": (imageFile.inputFrameRate ? imageFile.inputFrameRate : ''),
					"inputAspectRatio": (imageFile.inputAspectRatio ? imageFile.inputAspectRatio : ''),
					"inputTitle": (imageFile.inputTitle ? imageFile.inputTitle : ''),
					"inputSubtitle": (imageFile.inputSubtitle ? imageFile.inputSubtitle : ''),
					"inputStatus": (imageFile.inputStatus ? imageFile.inputStatus : ''),
					"inputContentType": (imageFile.inputContentType ? imageFile.inputContentType : ''),
					"inputFileName": (imageFile.inputFileName ? imageFile.inputFileName : ''),
					"inputAssosiations": (imageFile.inputAssosiations ? imageFile.inputAssosiations : ''),
					"inputVersionType": (imageFile.inputVersionType ? imageFile.inputVersionType : ''),
					"inputProducer": (imageFile.inputProducer ? imageFile.inputProducer : ''),
					"inputCreative": (imageFile.inputCreative ? imageFile.inputCreative : ''),
					"inputStorageLocation": (imageFile.inputStorageLocation ? imageFile.inputStorageLocation : ''),
					"inputAcSource": (imageFile.inputAcSource ? imageFile.inputAcSource : ''),
					"inputUserDescription": (imageFile.inputUserDescription ? imageFile.inputUserDescription : ''),
					"inputPeople": (imageFile.inputPeople ? imageFile.inputPeople : ''),
					"inputUserComments": (imageFile.inputUserComments ? imageFile.inputUserComments : ''),
					"shellType": (imageFile.shellType ? imageFile.shellType : '')
			
			       }
      var anotherItems = itemsRef.child(i).set(data)
    }


    //function uploadImageAsPromise (imageFile) {
    //return new Promise(function (resolve, reject) {
        //var storageRef = firebase.storage().ref("/"+imageFile.name);
        //var metadata = {
		  //customMetadata: {
		   // 'accepted': imageFile.accepted,
		    //'height': imageFile.height,
		   // 'id': imageFile.id,
		   // 'lastModified': imageFile.lastModified,
		    //'name': imageFile.name,
		    //'previewTemplate': imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
		    //'size': imageFile.size,
		   // 'type': imageFile.type,
		   // 'width': imageFile.width
		 // }
		//}
        //var task = storageRef.put(imageFile, metadata);
        //task.on('state_changed',
           // function progress(snapshot){
              //  var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;  
           // },
            //function error(err){
           // },
            //function complete(){
            	//downloadURL = task.snapshot.downloadURL;
                //console.log(downloadURL)
               // var storageRef = firebase.storage().ref();
                //var forestRef = storageRef.child("/" + imageFile.name);
				//forestRef.getMetadata().then(function(metadata) {
				//  console.log(metadata)
				//}).catch(function(error) {
				 
				//});
           // }
        //);
    //});
  //}  
		}
		
}

			
selectImageFiles() {
	this.closeFilesInformation();
	 let newArray = [];
		this.state.files.forEach((file) => {
		  var elementsVideo = document.getElementsByClassName("video/mp4--show");
		  var elementsAudio = document.getElementsByClassName("audio/mp3--show");
		   for(var i = 0; i < elementsVideo.length; i++){
				 elementsVideo[i].className = "video/mp4";   
			 }     
			for(var i = 0; i < elementsAudio.length; i++){
				 elementsAudio[i].className = "audio/mp3";   
			 }    
		 if ((file.type == "image/jpeg") || (file.type == "image/jpg") || (file.type == "image/svg+xml") || (file.type == "image/png") || (file.type == "image/gif")) {
		  newArray.push(file)
		  var elements = document.getElementsByClassName("image/jpeg");
		  var elementsJpg = document.getElementsByClassName("image/jpg");
		  var elementsPng = document.getElementsByClassName("image/png");
		  var elementsGif = document.getElementsByClassName("image/gif");
		  var elementsSvg= document.getElementsByClassName("image/svg+xml");
		 
			 for(var i = 0; i < elements.length; i++){
					elements[i].className += "--show"; 
			 } 
			 for(var i = 0; i < elementsSvg.length; i++){
					elementsSvg[i].className += "--show"; 
			 }     
			 for(var i = 0; i < elementsJpg.length; i++){
				 elementsJpg[i].className += "--show";
			 }     
			 for(var i = 0; i < elementsPng.length; i++){
				 elementsPng[i].className += "--show";  
			 }     
			 for(var i = 0; i < elementsGif.length; i++){
				 elementsGif[i].className += "--show";
			 } 
			}
	 });
		this.setState({itemsForBulk: newArray,
					   imageSelectionEnabled: !this.state.imageSelectionEnabled,
					   videoSelectionEnabled: false,
					   audioSelectionEnabled: false})
	}



selectVideoFiles() {
	this.closeFilesInformation();
	 let newArray = [];
		this.state.files.forEach((file) => {
			 var elements = document.getElementsByClassName("image/jpeg--show");
			 var elementsJpg = document.getElementsByClassName("image/jpg--show");
			 var elementsPng = document.getElementsByClassName("image/png--show");
			 var elementsGif = document.getElementsByClassName("image/gif--show");
			 var elementsSvg = document.getElementsByClassName("image/svg+xml--show");
			 var elementsAudio = document.getElementsByClassName("audio/mp3--show");

			for(var i = 0; i < elements.length; i++){
				   elements[i].className = "image/jpeg";    	 
			 } 
			 for(var i = 0; i < elementsSvg.length; i++){
					elementsSvg[i].className = "image/svg+xml";         
			 }     
			 for(var i = 0; i < elementsJpg.length; i++){
				 elementsJpg[i].className = "image/jpg";    
			 }     
			 for(var i = 0; i < elementsPng.length; i++){
				 elementsPng[i].className = "image/png";    
			 }     
			 for(var i = 0; i < elementsGif.length; i++){
				 elementsGif[i].className = "image/gif";   
			 }
			 for(var i = 0; i < elementsAudio.length; i++){
				 elementsAudio[i].className = "audio/mp3";   
			 } 

		 if (file.type == "video/mp4") {
			newArray.push(file)
			 var elements = document.getElementsByClassName("video/mp4");
			for(var i = 0; i < elements.length; i++){
				 elements[i].className += "--show";
			}     
		}
	 });
		this.setState({itemsForBulk: newArray,
					   videoSelectionEnabled: !this.state.videoSelectionEnabled,
					   imageSelectionEnabled: false,
					   audioSelectionEnabled: false})
		
	}

selectAudioFiles() {
	this.closeFilesInformation();
	 let newArray = [];
		this.state.files.forEach((file) => {
		 var elementsVideo = document.getElementsByClassName("video/mp4--show");
		 var elements = document.getElementsByClassName("image/jpeg--show");
		 var elementsJpg = document.getElementsByClassName("image/jpg--show");
		 var elementsPng = document.getElementsByClassName("image/png--show");
		 var elementsGif = document.getElementsByClassName("image/gif--show");
		 var elementsSvg = document.getElementsByClassName("image/svg+xml--show");
		 for(var i = 0; i < elements.length; i++){
				   elements[i].className = "image/jpeg";    	 
			 } 
			 for(var i = 0; i < elementsSvg.length; i++){
					elementsSvg[i].className = "image/svg+xml";         
			 }     
			 for(var i = 0; i < elementsJpg.length; i++){
				 elementsJpg[i].className = "image/jpg";    
			 }     
			 for(var i = 0; i < elementsPng.length; i++){
				 elementsPng[i].className = "image/png";    
			 }     
			 for(var i = 0; i < elementsGif.length; i++){
				 elementsGif[i].className = "image/gif";   
			 }
			  for(var i = 0; i < elementsVideo.length; i++){
				 elementsVideo[i].className = "video/mp4";   
			 }         
		 if (file.type == "audio/mp3") {
				newArray.push(file)
				 var elements = document.getElementsByClassName("audio/mp3");
				 
				for(var i = 0; i < elements.length; i++){
				 elements[i].className += "--show";
			 } 
			}
	 });
		this.setState({itemsForBulk: newArray,
					   audioSelectionEnabled: !this.state.audioSelectionEnabled,
					   videoSelectionEnabled: false,
					   imageSelectionEnabled: false})
	}

	toggleListGridView(e) {
		this.closeFilesInformation();
		console.log(e.target);
		this.setState({
			showGridView: !this.state.showGridView
		})
		if (this.state.showGridView) {
			setTimeout(() => {
				this.instance.pack();
			}, 0); 
		}
	}


	
	setVideoShellCreateValues = (n) => {
        this.setState(prevState => ({
        	shellCreate: {
        		...prevState.shellCreate,
		        video: n
        	}
        }));

        var shell = {
					"projectName": "newnew",
                    "name": "shellItem",
                    "processing": "",
					"subtitle": "",
					"type": "video/mp4",
					"lastEditedBy": "Lova Yazdani",
					"lastEditedOn": "03/15/18 at 02:15 PM",
					"lastModified": 1521252628000,
					"previewTemplate" : {
						"firstElementChild": {
							firstChild: {
								currentSrc: "/assets/img/icons/shell-placeholder.jpg",
							}
						}
					},
					"size": "",
					"img": "/assets/img/icons/shell-placeholder.jpg",
					"src": "/assets/img/icons/shell-placeholder.jpg",
					"height": "780",
                    "width": "1280",
                    "id": getNewFakeFileId(),
                    "test": "",
                    "inputHouseID": "",
					"inputComposition": "",
					"inputColor": "",
					"inputPromoCode": "",
					"inputShow": "",
					"inputEpisode": "",
					"inputDescription": "",
					"inputUploader": "",
					"inputKeywords": "",
					"inputProductionType": "",
					"inputActors": "",
					"inputNetwork": "",
					"inputLanguage": "",
					"inputCopyright": "",
					"inputRestrictions": "",
					"inputSeason": "",
					"inputMediaType": "",
					"inputMaterialType": "",
					"inputSecondaryType": "",
					"inputFrameRate": "",
					"inputAspectRatio": "",
					"inputTitle": "",
					"inputSubtitle": "",
					"inputStatus": "",
					"inputContentType": "",
					"inputFileName": "",
					"inputAssosiations": "",
					"inputVersionType": "",
					"inputProducer": "",
					"inputCreative": "",
					"inputStorageLocation": "",
					"inputAcSource": "",
					"inputUserDescription": "",
					"inputPeople": "",
					"inputUserComments": "",
					"shellType": "shell"
			
			       }
       this.setState({
       	shellFiles: this.state.shellFiles.concat(shell)
       })
      
        
    }
	setImageShellCreateValues = (n) => {
        this.setState(prevState => ({
        	shellCreate: {
        		...prevState.shellCreate,
		        image: n
        	}
        }));

        var shell = {
					"projectName": "newnew",
                    "name": "shellItem",
                    "processing": "",
					"subtitle": "",
					"type": "image/jpeg",
					"lastEditedBy": "Lova Yazdani",
					"lastEditedOn": "03/15/18 at 02:15 PM",
					"lastModified": 1521252628000,
					"previewTemplate" : {
						"firstElementChild": {
							firstChild: {
								currentSrc: "/assets/img/icons/shell-placeholder.jpg",
							}
						}
					},
					"size": "",
					"img": "/assets/img/icons/shell-placeholder.jpg",
					"src": "/assets/img/icons/shell-placeholder.jpg",
					"height": "780",
                    "width": "1280",
                    "id": getNewFakeFileId(),
                    "test": "",
                    "inputHouseID": "",
					"inputComposition": "",
					"inputColor": "",
					"inputPromoCode": "",
					"inputShow": "",
					"inputEpisode": "",
					"inputDescription": "",
					"inputUploader": "",
					"inputKeywords": "",
					"inputProductionType": "",
					"inputActors": "",
					"inputNetwork": "",
					"inputLanguage": "",
					"inputCopyright": "",
					"inputRestrictions": "",
					"inputSeason": "",
					"inputMediaType": "",
					"inputMaterialType": "",
					"inputSecondaryType": "",
					"inputFrameRate": "",
					"inputAspectRatio": "",
					"inputTitle": "",
					"inputSubtitle": "",
					"inputStatus": "",
					"inputContentType": "",
					"inputFileName": "",
					"inputAssosiations": "",
					"inputVersionType": "",
					"inputProducer": "",
					"inputCreative": "",
					"inputStorageLocation": "",
					"inputAcSource": "",
					"inputUserDescription": "",
					"inputPeople": "",
					"inputUserComments": "",
					"shellType": "shell"
			
			       }
       this.setState({
       	shellFiles: this.state.shellFiles.concat(shell)
       })
      
    }
	setAudioShellCreateValues = (n) => {
        this.setState(prevState => ({
        	shellCreate: {
        		...prevState.shellCreate,
		        audio: n
        	}
        }));

        var shell = {
					"projectName": "newnew",
                    "name": "shellItem",
                    "processing": "",
					"subtitle": "",
					"type": "audio/mp3",
					"lastEditedBy": "Lova Yazdani",
					"lastEditedOn": "03/15/18 at 02:15 PM",
					"lastModified": 1521252628000,
					"previewTemplate" : {
						"firstElementChild": {
							firstChild: {
								currentSrc: "/assets/img/icons/shell-placeholder.jpg",
							}
						}
					},
					"size": "",
					"img": "/assets/img/icons/shell-placeholder.jpg",
					"src": "/assets/img/icons/shell-placeholder.jpg",
					"height": "780",
                    "width": "1280",
                    "id": getNewFakeFileId(),
                    "test": "",
                    "inputHouseID": "",
					"inputComposition": "",
					"inputColor": "",
					"inputPromoCode": "",
					"inputShow": "",
					"inputEpisode": "",
					"inputDescription": "",
					"inputUploader": "",
					"inputKeywords": "",
					"inputProductionType": "",
					"inputActors": "",
					"inputNetwork": "",
					"inputLanguage": "",
					"inputCopyright": "",
					"inputRestrictions": "",
					"inputSeason": "",
					"inputMediaType": "",
					"inputMaterialType": "",
					"inputSecondaryType": "",
					"inputFrameRate": "",
					"inputAspectRatio": "",
					"inputTitle": "",
					"inputSubtitle": "",
					"inputStatus": "",
					"inputContentType": "",
					"inputFileName": "",
					"inputAssosiations": "",
					"inputVersionType": "",
					"inputProducer": "",
					"inputCreative": "",
					"inputStorageLocation": "",
					"inputAcSource": "",
					"inputUserDescription": "",
					"inputPeople": "",
					"inputUserComments": "",
					"shellType": "shell"
			
			       }
       this.setState({
       	shellFiles: this.state.shellFiles.concat(shell)
       })
      
    }


	render() {
		const url = "None. Fake methods has being implemented for the demo. So there is no need of a server.";
		
		const { target, selected, client, itemStatus, resetToUploadMode, multiSelect, isSelectedforBulk, itemsForBulk, imageSelectionEnabled, audioSelectionEnabled, videoSelectionEnabled, files, targetID, bulkEditOpen } = this.state;
		const { fields, localFiles, editingLocalProject, resetNewProject, hideDropzone, inputValue, currentProject, localItem, editingLocalItem, getFilesData} = this.props;
		const projectName = "Project Name";
		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";

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

		const listViewToggleClassnames = classNames({
			"list-view-button": true,
			"list-view-button--highlighted": !this.state.showGridView
		});

		const gridViewToggleClassnames = classNames({
			"grid-view-button": true,
			"grid-view-button--highlighted": this.state.showGridView
		});

		const gridListViewClassnames = classNames({
			"list-view": !this.state.showGridView,
			"masonry-grid-view": this.state.showGridView 
		});

	    const notifyButtonclassnames = classNames({
	      'apply': true,
	      'notify-upload-complete-btn': true,
	      'notify-upload-complete-btn--checked': this.state.notifyWhenUploadComplete
	    })

	    const toggleUploadClassnames = classNames({
	      'apply': true,
	      'toggle-upload-btn': true,
	      'toggle-upload-btn--checked': this.state.uploadDropzoneShow
	    })

	    const uploadModeClassnames = classNames({
	      'upload-mode': true,
	      'upload-mode--open': this.state.uploadDropzoneShow
	    })

	    if (document.querySelector('.masonry-grid-view') != null) {
		    this.instance = Bricks({
				packed: 'data-packed',
				sizes: [
				  { columns: 4, gutter: 15 }
				],
				container: '.masonry-grid-view'
			});
			setTimeout(() => {
				this.instance.pack();
			}, 0)
	    }

		return (
			<div>
			<div className="bulk-editing-menu">
			<div className="group">
				<div className="group-item">
					<button className={gridViewToggleClassnames} onClick={this.toggleListGridView.bind(this)}><i className="iconcss icon-grid-view"></i></button>
					<button className={listViewToggleClassnames} onClick={this.toggleListGridView.bind(this)}><i className="iconcss icon-list-view"></i></button>
				</div>
				<div className="group-item">
					<span>Grid / List View</span>
				</div>
			</div>
			<hr></hr>
			<input id="bulk-drawer-toggle" type="checkbox"></input>
			<label htmlFor="bulk-drawer-toggle">
				<i className="iconcss icon-bulk-edit"></i>
				<span>Bulk Editor</span>
			</label>
			<div className="bulk-drawer">
			<div className="bulk-drawer-item">
				<div className="bulk-drawer-row">
					<button className={imageSelector} onClick={this.selectImageFiles.bind(this)}><i className="iconcss icon-type-image"></i></button>
					<button className={videoSelector} onClick={this.selectVideoFiles.bind(this)}><i className="iconcss icon-type-video"></i></button>
					<button className={audioSelector} onClick={this.selectAudioFiles.bind(this)}><i className="iconcss icon-type-audio"></i></button>
				</div>
				<div className="bulk-drawer-row">
					<span>Bulk Edit</span>
				</div>
			</div>
			<div className="bulk-drawer-item">
				<div className="bulk-drawer-row">
					<button className={bulkDisable} onClick={this.bulkEdit.bind(this)}><i className="iconcss icon-launch"></i></button>
				</div>
				<div className="bulk-drawer-row">
					<span className={bulkDisable}>Launch Editor</span>
				</div>
			</div>
			</div>
			<hr></hr>
            <NotifyButton
            drawer={true}
            />
			</div>
			<div>

			<div className="above-bar">
				<button className="back-to-projects" onClick={this.removeDropzone.bind(this)}><i className="material-icons">arrow_back</i>Back To All Projects</button>
				<button className="save-button"><i className="iconcss icon-save"></i>Save</button>
			</div>

			<div id="upload" className="uploading-content-col">
              <div className="dz-master-progress">
                <button className="apply toggle-upload-btn create-shell-btn" onClick={this.createShellPrompt}>Create Shell<i className="iconcss icon-shell"></i></button>
                <div>
	                <button className={toggleUploadClassnames} onClick={this.clickUploadToggle}>Upload<i className="iconcss icon-cloud"></i></button>
	                <div className="dz-master-progress--text">
		                <span className="dz-master-progress--text-lg">Uploaded 8 of 8</span>
		                <span className="dz-master-progress--text-sm"><i className="iconcss icon-last-modified"></i>3/22/18</span>
	                </div>
	            </div>
              </div>
                <div className="uploading-content-row">
                  <button className={notifyButtonclassnames} onClick={this.clickNotifyMe}>Notify When Complete<i className="iconcss icon-bullhorn"></i></button>
                  <span className="dz-upload">
                    <div className="dz-master-progress--bar">
                    <div className="dz-master-progress--bar-inner"></div>
                    </div>
                  </span>
                </div>
              </div>

			<div
			style={{
				opacity: 0,
				position: "absolute",
				minHeight: "250px",
				minWidth: "100%"
			}}
			>
			<MySimpleReactDropzone
			uploadUrl={url}
			ref={ref => (this.refSimpleReactDropzone = ref)}
			existingFiles={this.state.existingFiles2}
			imediateRemove={false}
			maxFiles={500}
			onChange={e => {
				console.log("*** onChange (delayedRemove)", e);
				
				if(!this.props.editingLocalProject && !this.props.editingLocalItem) {
					this.setState({files: filesArray, selected: false})
					this.state.files.forEach((file, i) => {
				if(((!file.test || file.test !== "edited") && file.editedInBulk !== "edited") && (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") && (file.shellType !== "shell")) {
					file.inputTitle = "untitled" + "_" + file.width + "x" + file.height + "_" + i;
					file.inputStatus = "Needs Metadata"

					}
				if(((!file.test || file.test !== "edited") && file.editedInBulk !== "edited") && (file.type == "video/avi" || file.type == "video/mp4") && (file.shellType !== "shell")) {
					file.inputTitle = "untitled" + "_" + "15min_" + i;
					file.inputStatus = "Needs Metadata"
					}
				if(file.shellType == "shell") {
				file.inputTitle = "shell_item" + "_" + i;
				file.inputStatus = "Needs Metadata"

				}
				})

				
					
				}

				if(this.props.editingLocalProject || this.props.editingLocalItem) {
					this.setState({
                        files: filesArray.concat(this.props.localFiles[0].items),
                    	selected: false })
					
					this.state.files.forEach((file, i) => {
					if(((!file.test || file.test !== "edited") && file.editedInBulk !== "edited") && (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") && (file.shellType !== "shell")) {
					file.inputTitle = "untitled" + "_" + file.width + "x" + file.height + "_" + i;
					file.inputStatus = "Needs Metadata";
					file.lastEditedBy =  this.props.client.user.name;

					}
					if(((!file.test || file.test !== "edited") && file.editedInBulk !== "edited") && (file.type == "video/avi" || file.type == "video/mp4") && (file.shellType !== "shell")) {
						file.inputTitle = "untitled" + "_" + "15min_" + i;
						file.inputStatus = "Needs Metadata";
						file.lastEditedBy =  this.props.client.user.name;
						}
					if(file.shellType == "shell") {
					file.inputTitle = "shell_item" + "_" + i;
					file.inputStatus = "Needs Metadata"

					}
					
					
				})
				}	

				
				if (filesArray.length > 0) {
					document.getElementsByClassName('dz-master-progress--bar-inner')[0].classList.add('dz-master-progress--bar-inner-animation');
					document.getElementById('upload').style.marginLeft = '0%';
					document.getElementById('upload').getElementsByClassName('uploading-content-row')[0].style.transform = 'translateX(0%)';
					document.getElementsByClassName('dz-master-progress--text-lg')[0].innerHTML = this.state.files.length + " Uploaded";
				}
	
				setTimeout(function() { 
					document.getElementById('upload').getElementsByClassName('uploading-content-row')[0].style.transform = 'translateX(100%)';
				}, 10000); 
			}}

			/>
			</div>

	        <Prompt
	          show={this.state.showCreateShellPrompt}
	          onCancel={this.createShellPrompt}
	          onSubmit={this.createShellPrompt}
	          header={<h2 className="licensing-popup__title">Create Content Shell</h2>}
	          cancelText="Nevermind"
	          submitText="Create Shell(s)"
	        >
	          <h3 className="licensing-popup__info">How many content shells would you like to create?</h3>
		        <div className="shell-creation-wrapper">
		         	<div className="shell-creation-item">
				        <NumericInput min={0} max={100} value={this.state.shellCreate.video} onChange={(e) => this.setVideoShellCreateValues(e)}/>
				        <div><i className="iconcss icon-type-video"></i>Video</div>
		         	</div>
		         	<div className="shell-creation-item">
				        <NumericInput min={0} max={100} value={this.state.shellCreate.image} onChange={(e) => this.setImageShellCreateValues(e)}/>
				        <div><i className="iconcss icon-type-image"></i>Image</div>
		         	</div>
		         	<div className="shell-creation-item">
				        <NumericInput min={0} max={100} value={this.state.shellCreate.audio} onChange={(e) => this.setAudioShellCreateValues(e)}/>
				        <div><i className="iconcss icon-type-audio"></i>Audio</div>
		         	</div>
		        </div>
	        </Prompt>

	        <Prompt
	          show={this.state.showDeletePrompt}
	          onCancel={this.deleteFilePrompt}
	          onSubmit={this.removeFileFromPrompt}
	          header={<h2 className="licensing-popup__title">Are you Sure?</h2>}
	          cancelText="Nevermind"
	          submitText="Yes, Delete"
	        >
	          <h3 className="licensing-popup__info">Deleting this file will permanently remove it from the project.</h3>
	        </Prompt>

			<EditFileOverlay 
			showModal={this.state.showModal}
			closeModal={this.closeModal}
			itemsForBulk={this.state.itemsForBulk}
			disableBulkEdit={this.disableBulkEdit}
			editingLocalProject={this.props.editingLocalProject}
			updateFilesForBulkList={this.updateFilesForBulkList}
			removeFileFromOverlay={this.removeFileFromOverlay}
			type={this.state.itemsForBulk} />



			<div className="dz-container-1">
			  <div className="filepicker dropzone dz-clickable">
			    <div className="dz-clickable" id="dz-custom-mesg-2" >
			       <div className={uploadModeClassnames}>
			       	 <i onClick={this.clickUploadToggle} className="iconcss icon-close-thin"></i>
			         <Svg />
			         <div>Drag and drop files here or click here!</div>
			    </div>
			</div>
			<DropzoneFilter/>
			{
				(!this.state.showGridView) ? (<ListViewHeader/>) : null
			}
			<div className="dz-default dz-message">
			  <span></span>
			</div>

			<div className={gridListViewClassnames}>

			{
				files.map((file, i) => (
						<UploadedFile 
						handleClick={this.handleClick}
						file={file}
						updateFilesForBulkList={this.updateFilesForBulkList}
						removeFile={this.removeFile}
						deleteFilePrompt={this.deleteFilePrompt}
						type={file.type}
						src={file.previewTemplate.firstElementChild.firstChild.currentSrc}
						name={file.name}
						size={file.size}
						test={file.test}
						i={i}
						currentProject={this.props.currentProject}
						inputTitle={file.inputTitle}
						selected={this.state.selected}
						imageSelectionEnabled={this.state.imageSelectionEnabled}
						videoSelectionEnabled={this.state.videoSelectionEnabled}
						audioSelectionEnabled={this.state.audioSelectionEnabled}
						multiSelect={this.state.multiSelect}
						files={this.state.files}
						target={this.state.target}
						id={file.id} 
						ref={file.id}
						key={i}
						readyForIngest={ (file.inputStatus == "Ready For Ingest" || file.inputStatus == "Ready For Service" || file.inputStatus == "Search Optimized") ? true : false }
					    readyForService={ (file.inputStatus == "Ready For Service" || file.inputStatus == "Search Optimized") ? true : false }
					    searchOptimized={ file.inputStatus == "Search Optimized" ? true : false }
						/>

						))
			}
				</div>


					<div className={classnames}>
						<FileInformationModal
						
						onInputChange={this.onInputChange}
						onDropDownChange={this.onDropDownChange}
						inputFileName={this.state.inputFileName}
						inputAssosiations={this.state.inputAssosiations}
						inputEpisode={this.state.inputEpisode}
						inputVersionType={this.state.inputVersionType}
						inputText={this.state.inputText}
						inputAirVersion={this.state.inputAirVersion}
						inputNetwork={this.state.inputNetwork}
						inputTitle={this.state.inputTitle}
						inputSubtitle={this.state.inputSubtitle}
						inputProducer={this.state.inputProducer}
						inputCreative={this.state.inputCreative}
						inputStorageLocation={this.state.inputStorageLocation}
						inputAcSource={this.state.inputAcSource}
						inputUserDescription={this.state.inputUserDescription}
						inputPeople={this.state.inputPeople}
						bulkEditOpen={this.state.bulkEditOpen}
						inputUserComments={this.state.inputUserComments}
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						
						updateTitle={this.updateTitle}
						updateSubtitle={this.updateSubtitle}
						inputContentType={this.state.inputContentType}
						updateContentType={this.updateContentType}

			            inputMediaType={this.state.inputMediaType}
			            inputMaterialType={this.state.inputMaterialType}
			            inputSecondaryType={this.state.inputSecondaryType}
			            inputFrameRate={this.state.inputFrameRate}
			            inputAspectRatio={this.state.inputAspectRatio}
			            updateMediaType={this.updateMediaType}
			            updateMaterialType={this.updateMaterialType}
			            updateSecondaryType={this.updateSecondaryType}
			            updateFrameRate={this.updateFrameRate}
			            updateAspectRatio={this.updateAspectRatio}

						inputSeason={this.state.inputSeason}
						inputEpisodeNumber={this.state.inputEpisodeNumber}
						inputDescription={this.state.inputDescription}
						inputUploader={this.state.inputUploader}
						inputKeywords={this.state.inputKeywords}
						inputProductionType={this.state.inputProductionType}
						inputActors={this.state.inputActors}
						inputNetwork={this.state.inputNetwork}
						inputLanguage={this.state.inputLanguage}
						inputCopyright={this.state.inputCopyright}
						inputRestrictions={this.state.inputRestrictions}
						updateSeason={this.updateSeason}
						updateDescription={this.updateDescription}
						updateUploader={this.updateUploader}
						updateKeywords={this.updateKeywords}
						updateProductionType={this.updateProductionType}
						updateActors={this.updateActors}
						updateNetwork={this.updateNetwork}
						updateLanguage={this.updateLanguage}
						updateCopyright={this.updateCopyright}
						updateRestrictions={this.updateRestrictions}
						updateEpisodeNumber={this.updateEpisodeNumber}
						updateHouseID={this.updateHouseID}
						updateComposition={this.updateComposition}
						updateColor={this.updateColor}
						updatePromoCode={this.updatePromoCode}
						updateShow={this.updateShow}
						inputHouseID={this.state.inputHouseID}
						inputComposition={this.state.inputComposition}
						inputColor={this.state.inputColor}
						inputPromoCode={this.state.inputPromoCode}
						inputShow={this.state.inputShow}
						saveFilesInformation={this.saveFilesInformation}
						inputTextValue={this.state.inputTextValue}
						updateTextValue={this.updateTextValue }
						closeFilesInformation={this.closeFilesInformation}
						target={this.state.target}
						selected={this.state.selected}
						itemStatus={this.state.itemStatus}
					    />
					</div>
					</div>
					</div>
					</div>
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

export default connect(mapStateToProps)(Dropzone);