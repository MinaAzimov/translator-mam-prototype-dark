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
import Selectbox from "./form/Selectbox";
import TextArea from "./form/TextArea";
import FieldWidgets from "./form/FieldWidgets";
import Switch from "./form/Switch";
import Svg from "./staticFields/Svg";
import UploadedFile from "./UploadedFile";
import FileInformationModal from "./FileInformationModal";
import axios from 'axios';

import Truncate from 'react-truncate';
import $ from "jquery";
import RegistrationStatus from './RegistrationStatus';
import firebase from './firebase.js'

import { SimpleReactDropzone } from "../lib/ui/SimpleReactDropzone"; //'simple-react-dropzone';
import { defaultIcons } from "../lib/ui/DefaultIcons";
import EditFileOverlay from './EditFileOverlay';


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
									file.upload.bytesSent
									);
								if (file.upload.progress === 100) {
									file.status = "success";
									file.id = getNewFakeFileId();
									filesArray.push(file);
									console.log(filesArray);
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
		this.state = {
			showDeletePrompt: false,
			files: [],
			counter: 0,
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
			existingFiles2: []
		};
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
		this.setState({
			files: array,
			target: array,
			selected: false,
	  		showDeletePrompt: !this.state.showDeletePrompt
		});
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

		if (!this.state.showGridView) {
			itemSize = 99;
		} 

		 this.setState({ target: this.state.files[i], selected: true });
		 console.log(this.state.files[i])
		 let scrollTo = document.getElementsByClassName('dz-preview-new')[i].offsetTop;
		 this.smoothScrollTo(0,scrollTo + 5,600);
		 document.getElementsByClassName('files-information')[0].style.top = scrollTo + itemSize;
		 if (document.getElementsByClassName('files-information')[0].classList.contains('callout-1')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-1');}
		 if (document.getElementsByClassName('files-information')[0].classList.contains('callout-2')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-2');}
		 if (document.getElementsByClassName('files-information')[0].classList.contains('callout-3')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-3');}
		 if (document.getElementsByClassName('files-information')[0].classList.contains('callout-4')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-4');}
		 if ((this.state.files[i].id - 1) % 4 == 0) {
			setTimeout(function() { document.getElementsByClassName('files-information')[0].classList.add('callout-1'); }, 10);
		}
		if ((this.state.files[i].id - 1) % 4 == 1) {
			setTimeout(function() { document.getElementsByClassName('files-information')[0].classList.add('callout-2'); }, 10);
		}
		if ((this.state.files[i].id - 1) % 4 == 2) {
			setTimeout(function() { document.getElementsByClassName('files-information')[0].classList.add('callout-3'); }, 10);
		}
		if ((this.state.files[i].id - 1) % 4 == 3) {
			setTimeout(function() { document.getElementsByClassName('files-information')[0].classList.add('callout-4'); }, 10);
		}

		if (!this.state.showGridView) {
			setTimeout(function() { 
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-1')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-1');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-2')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-2');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-3')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-3');}
				if (document.getElementsByClassName('files-information')[0].classList.contains('callout-4')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-4');}
			}, 15);
		}
}

onInjestSelect = val => {
	this.setState({
		selectedFilter: val
	});
	if (val) {
		this.setState({
			itemStatus: "Ready For Ingest"
		});
	} else {
		this.setState({
			itemStatus: "Needs Metadata"
		});
	}
 var selector = document.getElementById(this.state.target.name);
 selector.firstChild.firstChild.firstChild.firstChild.style.fill = "#F54E02";
};

onServiceSelect = val => {
	this.setState({
		selectedFilterSevice: val
	});

	if (val && this.state.itemStatus == "Ready For Ingest") {
		this.setState({
			itemStatus: "Ready For Service"
		});
	} else {
		this.setState({
			itemStatus: "Ready For Ingest"
		});
	}
	var selector = document.getElementById(this.state.target.name);
	selector.firstChild.firstChild.firstChild.childNodes[1].style.fill = "#7DCBC4";
};

onSearchOptimizedSelect = val => {
	this.setState({
		selectedFilterOptimezed: val
	});

	if (val && this.state.itemStatus == "Ready For Service") {
		this.setState({
			itemStatus: "Search Optimized"
		});
	} else {
		this.setState({
			itemStatus: "Ready For Service"
		});
	}
	 var selector = document.getElementById(this.state.target.name);
	 selector.firstChild.firstChild.firstChild.childNodes[2].style.fill = "#3592bd";
};


bulkEdit() {
	this.setState({
		showModal: true
	});
}

closeModal = () => {
	this.setState({
		showModal: false,
		imageSelectionEnabled: false,
		videoSelectionEnabled: false,
		audioSelectionEnabled: false
	});

		this.state.files.forEach((file, b) => {
			 this.refs[b + 1].refs[b + 1].firstElementChild.classList.remove('icon-last-modified');
			 this.refs[b + 1].refs[b + 1].firstElementChild.classList.add('icon-checkmark');
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
	var array = this.state.itemsForBulk;
	if(this.state.itemsForBulk.includes(file)) {
			var index = i;
			array.splice(i, 1);
			this.setState({
				 itemsForBulk: array
			});
			console.log(this, i, file, this.refs, this.state.itemsForBulk)
	} else {
		 this.setState({
				itemsForBulk: this.state.itemsForBulk.concat([file])
			})
 }
 
  if(this.refs[i + 1].refs[i + 1].firstElementChild.classList.contains('icon-checkmark')) {
  	this.refs[i + 1].refs[i + 1].firstElementChild.classList.remove('icon-checkmark');
  	this.refs[i + 1].refs[i + 1].firstElementChild.classList.add('icon-last-modified');
    this.refs[i + 1].refs[i + 1].classList.add('empty-circle');
  }
 else {
  	this.refs[i + 1].refs[i + 1].firstElementChild.classList.add('icon-checkmark');
  	this.refs[i + 1].refs[i + 1].firstElementChild.classList.remove('icon-last-modified');
  	this.refs[i + 1].refs[i + 1].classList.remove('empty-circle');	 
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
		this.props.hideDropzone();
		this.setState({selected: false})

	for (var i = 0; i < this.state.files.length; i++) {
        var imageFile = this.state.files[i];
        var metadata = {
         accepted: "alex",
         name: "aaa"
      };
        uploadImageAsPromise(imageFile, metadata);
    }


    function uploadImageAsPromise (imageFile) {
    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref("/"+imageFile.name);
        var metadata = {
		  customMetadata: {
		    'accepted': imageFile.accepted,
		    'height': imageFile.height,
		    'id': imageFile.id,
		    'lastModified': imageFile.lastModified,
		    'name': imageFile.name,
		    'previewTemplate': imageFile.previewTemplate.firstElementChild.firstChild.currentSrc,
		    'size': imageFile.size,
		    'type': imageFile.type,
		    'width': imageFile.width
		  }
		}
        var task = storageRef.put(imageFile, metadata);
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;  
            },
            function error(err){
            },
            function complete(){
                var downloadURL = task.snapshot.downloadURL;
                console.log(downloadURL)

                var storageRef = firebase.storage().ref();
                var forestRef = storageRef.child("/" + '3.png');
				forestRef.getMetadata().then(function(metadata) {
				  console.log(metadata)
				}).catch(function(error) {
				 
				});
            }
        );
    });
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
	}

	render() {
		const url = "None. Fake methods has being implemented for the demo. So there is no need of a server.";
		let files = this.state.files;
		const { target, selected, client, itemStatus, resetToUploadMode, multiSelect, isSelectedforBulk, itemsForBulk, imageSelectionEnabled, audioSelectionEnabled, videoSelectionEnabled } = this.state;
		const { fields, localFiles, editingLocalProject, resetNewProject, hideDropzone } = this.props;
		const projectName = "Project Name";
		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";

		var s = new Set();
		var result = [];
		this.state.files.forEach(function(e) {
			result.push(Object.assign({}, e));
			s.add(e.id);
		});
		this.props.localFiles.forEach(function(e) {
			if (!s.has(e.id)) {
				var temp = Object.assign({}, e);
				temp.position = null;
				result.push(temp);
			}
		});

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
			"list-view": !this.state.showGridView 
		});

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
			</div>
			<div>
			<div className="above-bar">
				<button className="back-to-projects" onClick={this.removeDropzone.bind(this)}><i className="material-icons">arrow_back</i>Back To All Projects</button>
				<button className="save-button"><i className="iconcss icon-save"></i>Save</button>
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
				this.setState({
					uploadState: { ...e.newState },
					files: filesArray
				});
				if (filesArray.length > 0) {
					document.getElementsByClassName('dz-master-progress--bar-inner')[0].classList.add('dz-master-progress--bar-inner-animation');
					document.getElementById('upload').style.marginLeft = '0%';
					document.getElementById('upload').getElementsByClassName('uploading-content-row')[0].style.transform = 'translateX(0%)';
					document.getElementsByClassName('dz-master-progress--text-lg')[0].innerHTML = this.state.files.length + " Uploaded";
				}
				setTimeout(function() { 
					var elements = document.getElementsByClassName("dz-progress");
					var elementsCheckmark = document.getElementsByClassName("dz-success-mark"); 
					var masterBar = document.getElementsByClassName("dz-master-progress--bar-inner-animation"); 
					for(var i = 0; i < elements.length; i++){
				    	elements[i].className = "hide-progress"; 
					} 
				    for(var i = 0; i < elementsCheckmark.length; i++){
						elementsCheckmark[i].className = "hide-checkmark"; 
					}
				    for(var i = 0; i < masterBar.length; i++) {
						masterBar[i].className = "dz-master-progress--bar-inner";
						document.getElementsByClassName('dz-master-progress--bar-inner')[0].style.width = '100%'; 
					} 
				}, 10000); 
				setTimeout(function() { 
					document.getElementById('upload').getElementsByClassName('uploading-content-row')[0].style.transform = 'translateX(100%)';
				}, 10000); 
			}}

			/>
			</div>

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
			removeFileFromOverlay={this.removeFileFromOverlay} />

			<div className="dz-container-1">
			  <div className="filepicker dropzone dz-clickable">
			    <div className="dz-clickable" id="dz-custom-mesg-2" >
			       <div>
			         <Svg />
			         <div>Drag and drop files here or click here!</div>
			    </div>
			</div>
			<div className="dz-default dz-message">
			  <span />
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
						i={i}
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
						/>
						))
			}
				</div>


					<div className={classnames}>
						<FileInformationModal
						closeFilesInformation={this.closeFilesInformation}
						target={this.state.target}
						selected={this.state.selected}
						onServiceSelect={this.onServiceSelect}
						onInjestSelect={this.onInjestSelect}
						onSearchOptimizedSelect={this.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.state.selectedFilterOptimezed}
						selectedFilter={this.state.selectedFilter}
						selectedFilterSevice={this.state.selectedFilterSevice}
						itemStatus={this.state.itemStatus} />
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