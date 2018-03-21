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


const uploadIcon = defaultIcons.react.uploadIcon;
let filesArray = [];

const typeListVideo = [
{
  title: "Promo",
  id: 0
},
{
  title: "Episodic",
  id: 1
},
{
  title: "Theatrical",
  id: 2
},
{
  title: "Footage",
  id: 3
},
{
  title: "Short",
  id: 4
}
];

const typeListImage = [
{
  title: "Photography",
  id: 0
},
{
  title: "Graphic",
  id: 1
},
{
  title: "Art",
  id: 2
},
{
  title: "Print",
  id: 3
},
{
  title: "Logo",
  id: 4
}
];

const secondaryTypeListVideo = [
{
  title: "Texted",
  id: 0
},
{
  title: "Textless",
  id: 1
},
{
  title: "Masked",
  id: 2
},
{
  title: "Unmasked",
  id: 3
}

];

const secondaryTypeListImage = [
{
  title: "Episodic Stills (TV)",
  id: 0
},
{
  title: "Gallery Stills (TV)",
  id: 1
},
{
  title: "Stills (FILM)",
  id: 2
},
{
  title: "Behind the Scenes",
  id: 3
},
{
  title: "Publicity Events",
  id: 4
},
{
  title: "Artwork",
  id: 5
},
{
  title: "Other",
  id: 6
}

];

const fileIncList = [
{
  title: "Kb",
  id: 0
},
{
  title: "Mb",
  id: 1
},
{
  title: "Gb",
  id: 2
}
];

const mediaTypeList = [
{
  title: "Video",
  id: 0
},
{
  title: "Audio",
  id: 1
},
{
  title: "Image",
  id: 2
}
];
const frameRateList = [
{
  title: "24p",
  id: 0
},
{
  title: "25p",
  id: 1
},
{
  title: "29.97p",
  id: 2
},
{
  title: "30p",
  id: 3
},
{
  title: "48p",
  id: 4
},
{
  title: "50i",
  id: 5
},
{
  title: "60i",
  id: 6
},
{
  title: "59.94p",
  id: 7
},
{
  title: "50p",
  id: 8
},
{
  title: "60p",
  id: 9
},
{
  title: "72p",
  id: 10
},
{
  title: "100p",
  id: 11
},
{
  title: "119.88p",
  id: 12
},
{
  title: "120p",
  id: 13
},
{
  title: "300FPS",
  id: 14
}
];

const aspectRatioList = [
{
  title: "16x9 full frame (1:78)",
  id: 0
},
{
  title: "16x9 letterbox (1:88)",
  id: 1
},
{
  title: "16x9 letterbox (2:00)",
  id: 2
},
{
  title: "16x9 letterbox (2:21)",
  id: 3
},
{
  title: "16x9 letterbox (2:35)",
  id: 4
},
{
  title: "16x9 letterbox (2:40)",
  id: 5
},
{
  title: "16x9 letterbox (2:76)",
  id: 5
},
{
  title: "16x9 side matted (1:33)",
  id: 5
},
{
  title: "16x9 side matted (1:66)",
  id: 5
},
{
  title: "4x3 full frame (1:33)",
  id: 5
},
{
  title: "4x3 letterbox (1:66)",
  id: 5
},
{
  title: "4x3 letterbox !1:78)",
  id: 5
},
{
  title: "4x3 letterbox (2:10)",
  id: 5
},
{
  title: "4x3 letterbox (2:35)",
  id: 5
},
{
  title: "4x3 letterbox (2:40)",
  id: 5
},
{
  title: "4x3 letterbox (2:76)",
  id: 5
}
];

const airVersionList = [
{
  title: "International Broadcast Master",
  id: 0
},
{
  title: "Domestic Broadcast Master",
  id: 1
},
{
  title: "International Broadcast Master",
  id: 2
},
{
  title: "International French OFCOM Compliant Broadcast Master",
  id: 3
},
{
  title: "Uncensored Master",
  id: 4
},
{
  title: "Submaster",
  id: 5
}
];

const showList = [
{
  title: "Show 1",
  id: 0
},
{
  title: "Show 2",
  id: 1
},
{
   title: "Show 3",
  id: 2
},
{
   title: "Show 4",
  id: 3
}
];

const episodeList = [
{
  title: "Season 1",
  id: 0
},
{
  title: "Season 2",
  id: 1
},
{
  title: "Season 3",
  id: 2
},
{
  title: "Season 4",
  id: 3
}
];

const actorsList = [
{
  title: "Kb",
  id: 0
},
{
  title: "Mb",
  id: 1
},
{
  title: "Gb",
  id: 2
}
];

const networkList = [
{
  title: "Kb",
  id: 0
},
{
  title: "Mb",
  id: 1
},
{
  title: "Gb",
  id: 2
}
];

const Counter = props => (
  <div
  style={{
    marginTop: 30
  }}
  >
  <div>{props.counter} seconds since page load.</div>
  <div
  style={{
    color: "gray"
  }}
  />
  </div>
  );

let fakeFileIdCounter = 0;
function getNewFakeFileId() {
  return ++fakeFileIdCounter;
}

class MySimpleReactDropzone extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
   
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

    // var spans = document.getElementsByClassName('dz-title');
    // var maxlen = 60;

    // for (var i = 0; i < spans.length; i++) {
    //   var span = spans[i];
    //   var text = span.innerHTML;
    //   if (text.length > maxlen) {
    //     span.setAttribute('data-content-start', text.substr(0,maxlen/2));
    //     span.setAttribute('data-content-end', text.substr(text.length-maxlen));
    //     span.innerHTML = '...';
    //   }
    // }

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

  componentDidMount() {
    const count = () => {
      const incrementInSeconds = 5;
      const counter = this.state.counter + incrementInSeconds;
      this.setState({
        counter
        // existingFiles: [
        //   {
        //     name: "Filename " + counter,
        //     size: counter * 1024,
        //   },
        // ],
      });
      // An a update with setState will happen every 5s.
      // This is done to prove that updates can happen without problems.
      setTimeout(count, incrementInSeconds * 1000);
    };

    count();
    
  }



  resetFilesSource() {
    //filesArray = [];
    //this.setState({files: [] })
  }

  removeFile(i) {

    if(!this.props.editingLocalProject) {
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

    if(this.props.editingLocalProject) { 
      var array = this.props.localFiles;
      var index = i;
      console.log(index);
      array.splice(index, 1);
      this.setState({
        files: array,
        target: array,
        selected: false
      });

    }
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


  handleClick(i) {


    if (!this.props.editingLocalProject) {
     this.setState({ target: this.state.files[i], selected: true });
     let scrollTo = document.getElementsByClassName('dz-preview-new')[this.state.files[i].id - 1].offsetTop;

     this.smoothScrollTo(0,scrollTo + 5,600);

     document.getElementsByClassName('files-information')[0].style.top = scrollTo + 272;

     if (document.getElementsByClassName('files-information')[0].classList.contains('callout-1')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-1'); }
     if (document.getElementsByClassName('files-information')[0].classList.contains('callout-2')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-2'); }
     if (document.getElementsByClassName('files-information')[0].classList.contains('callout-3')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-3'); }
     if (document.getElementsByClassName('files-information')[0].classList.contains('callout-4')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-4'); }

     if ((this.state.files[i].id - 1) % 4 == 0) {

      document.getElementsByClassName('files-information')[0].classList.add('callout-1');
    }

    if ((this.state.files[i].id - 1) % 4 == 1) {

      document.getElementsByClassName('files-information')[0].classList.add('callout-2');
    }

    if ((this.state.files[i].id - 1) % 4 == 2) {

      document.getElementsByClassName('files-information')[0].classList.add('callout-3');
    }

    if ((this.state.files[i].id - 1) % 4 == 3) {

      document.getElementsByClassName('files-information')[0].classList.add('callout-4');
    }
    // This code should eventually be replaced
    
    // Explicitly focus the text input using the raw DOM API.
    console.log(this.state.files[i]);
  }
  else {
   this.setState({ target: this.props.localFiles[i], selected: true });
   let scrollTo = document.getElementsByClassName('dz-preview-new')[this.props.localFiles[i].id - 1].offsetTop;
   console.log(scrollTo);

   document.getElementsByClassName('files-information')[0].style.top = scrollTo + 272;

   if (document.getElementsByClassName('files-information')[0].classList.contains('callout-1')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-1'); }
   if (document.getElementsByClassName('files-information')[0].classList.contains('callout-2')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-2'); }
   if (document.getElementsByClassName('files-information')[0].classList.contains('callout-3')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-3'); }
   if (document.getElementsByClassName('files-information')[0].classList.contains('callout-4')) { document.getElementsByClassName('files-information')[0].classList.remove('callout-4'); }

   if ((this.props.localFiles[i].id - 1) % 4 == 0) {

    document.getElementsByClassName('files-information')[0].classList.add('callout-1');
  }

  if ((this.props.localFiles[i].id - 1) % 4 == 1) {

    document.getElementsByClassName('files-information')[0].classList.add('callout-2');
  }

  if ((this.props.localFiles[i].id - 1) % 4 == 2) {

    document.getElementsByClassName('files-information')[0].classList.add('callout-3');
  }

  if ((this.props.localFiles[i].id - 1) % 4 == 3) {

    document.getElementsByClassName('files-information')[0].classList.add('callout-4');
  }
    // This code should eventually be replaced
    
    // Explicitly focus the text input using the raw DOM API.
    console.log(this.state.files[i]);
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
   selector.firstChild.firstChild.firstChild.childNodes[2].style.fill = "#618393";
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
       var elements = document.getElementsByClassName("image/jpeg");
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
}


disableBulkEdit = val =>  {

  this.setState({
    multiSelect: !this.state.multiSelect,
    itemsForBulk: []
  });

}


//enableBulkEdit = val => {
 // this.setState({
   // multiSelect: !this.state.multiSelect
 // });

 // if(this.state.multiSelect) {
   // this.setState({itemsForBulk: localFiles})
  //}
//}

updateFilesForBulkList = (e, value) => {

  if (e.target.checked){
      //append to array
      this.setState({
        itemsForBulk: this.state.itemsForBulk.concat([value])
      })

    } else {
      var array = this.state.itemsForBulk;
      var index = e;
      console.log(index);
      array.splice(index, 1);
      this.setState({
         itemsForBulk: array
       
      });

      
    }
  }

  removeFileFromOverlay = (e, value) => {
   if (!e.target.checked){
     var array = this.state.itemsForBulk;
      var index = e;
      console.log(e, value);
      array.splice(e, 1);
      this.setState({
         itemsForBulk: array
       
      });
 }

  }

  removeDropzone() {
    this.props.hideDropzone();
    this.resetFilesSource();
  }

  selectImageFiles() {
   let newArray = [];
    this.state.files.forEach((file) => {
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
                   imageSelectionEnabled: !this.state.imageSelectionEnabled})
    console.log(this.state.itemsForBulk)
  }

  selectVideoFiles() {
   let newArray = [];
    this.state.files.forEach((file) => {
     if (file.type == "video/mp4") {
        newArray.push(file)
         var elements = document.getElementsByClassName("video/mp4");
       
        for(var i = 0; i < elements.length; i++){
         elements[i].className += "--show";
       }     
      }
   });
    this.setState({itemsForBulk: newArray,
                   videoSelectionEnabled: !this.state.videoSelectionEnabled})
  }

  selectAudioFiles() {
   let newArray = [];
    this.state.files.forEach((file) => {
     if (file.type == "audio/mp3") {
        newArray.push(file)
         var elements = document.getElementsByClassName("audio/mp3");
       
        for(var i = 0; i < elements.length; i++){
         elements[i].className += "--show";
       }     
      }
   });
    this.setState({itemsForBulk: newArray,
                   audioSelectionEnabled: !this.state.audioSelectionEnabled})
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
      "image-button": true,
      "image-button--highlighted": imageSelectionEnabled,
      "disabled": videoSelectionEnabled || audioSelectionEnabled
    });

    const videoSelector = classNames({
      "video-button": true,
      "video-button--highlighted": videoSelectionEnabled,
      "disabled": imageSelectionEnabled || audioSelectionEnabled
    });

    const audioSelector = classNames({
      "audio-button": true,
      "audio-button--highlighted": audioSelectionEnabled,
      "disabled": videoSelectionEnabled || imageSelectionEnabled
    });

      const bulkDisable = classNames({
      "bulk-button": true,
      "disabled": !videoSelectionEnabled && !imageSelectionEnabled && !audioSelectionEnabled
    });

    const checkboxDisable = classNames({
      "": false,
      "hidden": !multiSelect
    });

    const loadingAnimation = classNames({
      "": false,
      "hidden": !multiSelect
    });



    return (
      <div>
      <div className="bulk-editing-menu">
      <span>Select By</span>
      <button  className={imageSelector}  onClick={this.selectImageFiles.bind(this)}><i className="iconcss icon-type-image"></i></button>
      <button  className={videoSelector}  onClick={this.selectVideoFiles.bind(this)}><i className="iconcss icon-type-video"></i></button>
      <button  className={audioSelector}  onClick={this.selectAudioFiles.bind(this)}><i className="iconcss icon-type-audio"></i></button>
      <span>Bulk Edit</span>
      <button  className={bulkDisable}  onClick={this.bulkEdit.bind(this)}><i className="iconcss icon-bulk-edit"></i></button>
      </div>
      <div>
      <button className="back-to-projects" onClick={this.removeDropzone.bind(this)}><i className="material-icons">arrow_back</i>Save & Back To All Projects</button>
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
       for(var i = 0; i < masterBar.length; i++){
          masterBar[i].className = "dz-master-progress--bar-inner";
          document.getElementsByClassName('dz-master-progress--bar-inner')[0].style.width = '100%';
         
       } 

       }, 10000); 
      }}

      />
      </div>

      <EditFileOverlay showModal={this.state.showModal} closeModal={this.closeModal} itemsForBulk={this.state.itemsForBulk} disableBulkEdit={this.disableBulkEdit} editingLocalProject={this.props.editingLocalProject} updateFilesForBulkList={this.updateFilesForBulkList}  removeFileFromOverlay={this. removeFileFromOverlay} />
      <div className="dz-container-1">
      <div className="filepicker dropzone dz-clickable">
      <div className="dz-clickable" id="dz-custom-mesg-1">
      <div>
      <svg width="325px" height="250px" viewBox="0 0 221 170" style={{display: 'inlineBlock', color: 'rgba(0, 0, 0, 0.87)', fill: 'currentcolor', height: '250px', width: '325px' }}>
      <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="drag-and-drop-illustration" transform="translate(-60.000000, -14.000000)">
      <g id="Group-3">
      <g id="Group-6" transform="translate(62.000000, 14.000000)">
      <g id="dropzone">
      <path d="M179.370298,147.14163 C191.724286,131.592561 199,111.639341 199,89.8800561 C199,40.2439267 161.139863,0.00589352847 111.503733,0.00589352847 C61.8676038,0.00589352847 21.6295707,40.2439267 21.6295707,89.8800561 C21.6295707,111.522939 29.2797419,131.379029 42.0234708,146.891712 L179.370298,147.14163 Z" id="Oval" fill="#F9FAFB"></path>
      <path d="M190.52134,68.493953 L201.686561,68.493953" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M51.6507345,125.894859 L45.3110953,44.9322962 L45.3110953,44.9322962 C45.1386402,42.7298987 46.7842336,40.8047004 48.9866311,40.6322453 C48.9915683,40.6318587 48.9965062,40.6314813 49.0014448,40.6311131 L84.3982836,37.9916631 C88.1543886,94.6581875 88.1543886,128.032646 84.3982836,138.115038 C80.6421786,148.19743 69.7263289,144.124037 51.6507345,125.894859 Z" id="Path-2" fill="#FFFFFF"></path>
      <path d="M51.6507345,125.894859 L45.3110953,44.9322962 L45.3110953,44.9322962 C45.1386402,42.7298987 46.7842336,40.8047004 48.9866311,40.6322453 C48.9915683,40.6318587 48.9965062,40.6314813 49.0014448,40.6311131 L84.3982836,37.9916631" id="Path-2" stroke="#C9CCD5" strokeWidth="2.5999999" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M75,128.5145 L85.5328633,28.9777911 L85.5335787,28.9778668 C85.7660199,26.7812728 87.7349441,25.1888794 89.9315799,25.4209255 L169.353596,33.8101085 L169.353596,33.8101085 C171.520219,34.0389841 173.105204,35.9597045 172.918703,38.1303856 L168.925656,84.6055024 C156.213513,110.04116 145.025278,125.017961 135.36095,129.535906 C126.203465,133.816909 105.030034,135.99808 77.0964998,131.554722 C76.0658007,131.39077 75.3669674,130.377362 75,128.5145 Z" id="Path-2" fill="#FFFFFF"></path>
      <path d="M75.036634,130.03023 L85.5395513,28.9852376 L85.5395513,28.9852376 C85.7679453,26.7879366 87.7343595,25.1918222 89.9316604,25.4202162 C89.9338827,25.4204472 89.9361047,25.4206801 89.9383266,25.4209148 L169.353596,33.8101085 L169.353596,33.8101085 C171.520219,34.0389841 173.105204,35.9597045 172.918703,38.1303856 L168.925656,84.6055024" id="Path-2" stroke="#C9CCD5" strokeWidth="2.5999999" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M195.617797,129.063087 L149.00709,100.176118 C143.679688,99.6193446 137.987904,101.019636 131.931737,104.376992 C125.87557,107.734349 121.286799,112.023649 118.165423,117.244894 C110.096692,113.377068 102.096005,112.87622 94.16336,115.742351 C86.2307153,118.608482 80.618741,124.027699 77.3274372,132 C75.1010683,129.98833 72.1643444,128.573022 68.0038339,128.573022 C63.8433234,128.573022 60.5138864,130.218796 58.5289541,132.691397 C48.2282834,122.536705 37.5426468,119.071583 26.4720443,122.29603 C15.7245196,125.426377 9.29350121,133.278771 7.17898921,145.85321 C7.16598568,145.930539 65.4466118,146.213593 182.020868,146.702374 C185.77833,147.59737 194.945804,147.398598 209.52329,146.106059 C209.183342,143.102374 207.83521,140.020252 205.478894,136.859691 C203.122578,133.69913 200.179773,131.313597 196.65048,129.703093 Z" id="Path-2" fill="#FFFFFF"></path>
      <path d="M7.17898921,145.85321 C9.29350121,133.278771 15.7245196,125.426377 26.4720443,122.29603 C37.5426468,119.071583 48.2282834,122.536705 58.5289541,132.691397 C60.5138864,130.218796 63.8433234,128.573022 68.0038339,128.573022 C72.1643444,128.573022 75.1010683,129.98833 77.3274372,132 C80.618741,124.027699 86.2307153,118.608482 94.16336,115.742351 C102.096005,112.87622 110.096692,113.377068 118.165423,117.244894 C121.286799,112.023649 125.87557,107.734349 131.931737,104.376992 C137.987904,101.019636 143.679688,99.6193446 149.00709,100.176118 M196.65048,129.703093 C200.179773,131.313597 203.122578,133.69913 205.478894,136.859691 C207.83521,140.020252 209.183342,143.102374 209.52329,146.106059" id="Path-2" stroke="#C9CCD5" strokeWidth="2.5999999" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M129.676912,71.4793041 L131.711704,48.4273697 L131.711704,48.4273697 C131.954511,45.6766415 134.38125,43.6435692 137.131978,43.8863758 C137.157289,43.8886099 137.182582,43.891037 137.207855,43.8936567 L154.692027,45.7059935 L154.692027,45.7059935 C156.82435,45.9270213 158.403326,47.7897761 158.272113,49.9295052 L156.804325,73.8651615 L156.804325,73.8651615 C156.601502,77.172657 153.755826,79.6894913 150.44833,79.4866682 C150.374905,79.4821656 150.301568,79.4763129 150.228357,79.4691133 L135.066456,77.9780679 L135.066456,77.9780679 C131.791915,77.6560443 129.387599,74.7568972 129.676912,71.4793041 Z" id="Path-2" fill="#F9FAFB"></path>
      <path d="M0,147 L216.978145,147.1537" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M94,79 L107.834655,80.1153454" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M59,55.1153454 L73.4574696,53.8536295" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M93,86 L134.944417,90.1431903" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M60,61.999025 L81.7130004,60" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M62,78.691224 L80.3697286,77" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M63,85.3277508 L79.2934504,84" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M63,92.2064725 L77.8051881,91" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M76.1061518,119.499191 C75.1000121,119.440732 74.3454074,119.502698 73.8423375,119.685087 C73.3392677,119.867477 72.6176519,120.340721 71.6774902,121.104818 C70.8881871,119.834929 70.2415245,119.019901 69.7375027,118.659735 C69.2334809,118.299569 68.2167103,117.925934 66.687191,117.538829 C66.5973559,116.142904 66.4049313,115.09596 66.1099172,114.397997 C65.8149031,113.700034 65.1344413,112.681849 64.0685316,111.343441 C64.8645195,110.175686 65.3369732,109.268895 65.4858929,108.623068 C65.6348125,107.977241 65.6348125,106.835118 65.4858929,105.196699 C66.9155028,104.791234 67.8843646,104.364268 68.3924784,103.915799 C68.9005922,103.46733 69.4794981,102.528214 70.129196,101.09845 C71.8604879,101.606354 73.1589568,101.793145 74.0246027,101.658824 C74.8902486,101.524503 76.0933523,100.949545 77.6339137,99.9339519" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M92,100 L112.972208,102.071595" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M91,107 L123.774746,109.903678" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M89.7437489,113.516555 L98.3088376,114.275379" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M23.1924584,157.695257 L123.692458,157.695257" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M49,168 L64.5,168" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" opacity="0.12" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M70,168 L108.5,168" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" opacity="0.12" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M118,168 L170.5,168" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" opacity="0.12" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M135.192458,157.695257 L200.692458,157.695257" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M174,141 C189.463973,141 201.259174,128.463973 201.259174,113 C201.259174,97.536027 189.463973,85 174,85 C158.536027,85 146,97.536027 146,113 C146,128.463973 158.536027,141 174,141 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" fill="#FFFFFF" strokeLinecap="square" strokeLinejoin="round"></path>
      <path d="M18.9101209,97.4148732 C22.4999718,97.4148732 25.8202419,94.0898509 25.8202419,90.5 C25.8202419,86.9101491 22.2536472,83.6444639 18.6637963,83.6444639 C15.0739455,83.6444639 12,86.9101491 12,90.5 C12,94.0898509 15.3202701,97.4148732 18.9101209,97.4148732 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" fill="#FFFFFF" strokeLinecap="square" strokeLinejoin="round"></path>
      <path d="M20,45.7550206 C20,38.5850069 20,35 20,35" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M33.5107254,32.2990501 C33.5107254,24.8600054 33.5107254,21.140483 33.5107254,21.140483" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M14,41 L25.1652214,41" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M27.9281147,26.6451357 L39.0933361,26.6451357" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M210,55 C211.656854,55 212.920626,53.6568542 212.920626,52 C212.920626,50.3431458 211.656854,49 210,49 C208.343146,49 207,50.3431458 207,52 C207,53.6568542 208.343146,55 210,55 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="round"></path>
      <path d="M194.587141,41.174283 C198.225119,41.174283 201,38.2251193 201,34.5871415 C201,30.9491637 198.225119,28 194.587141,28 C190.949164,28 188,30.9491637 188,34.5871415 C188,38.2251193 190.949164,41.174283 194.587141,41.174283 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="square" strokeLinejoin="round"></path>
      <path d="M145.232433,59.9407382 C147.489699,59.9407382 149.211437,58.1108626 149.211437,55.8535967 C149.211437,53.5963308 147.489699,51.7664552 145.232433,51.7664552 C142.975167,51.7664552 141.145291,53.5963308 141.145291,55.8535967 C141.145291,58.1108626 142.975167,59.9407382 145.232433,59.9407382 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" fill="#FFFFFF" strokeLinecap="square" strokeLinejoin="round"></path>
      <path d="M151.674324,70.2668203 C152.591271,65.0579676 149.379368,59.9534344 144.132663,59.9534344 C138.885958,59.9534344 136.135457,62.7182025 135.393125,68.0108025 C134.650794,73.3034025 150.757377,75.4756731 151.674324,70.2668203 Z" id="Oval" stroke="#C9CCD5" strokeWidth="2.6" fill="#E2E4EA" strokeLinecap="square" strokeLinejoin="round"></path>
      <polyline id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" points="165.684311 114.636199 173.736866 106.448584 181.834648 114.636199"></polyline>
      <path d="M196,73.7550206 C196,66.5850069 196,63 196,63" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M173.74211,120.166712 C173.74211,111.017526 173.74211,106.442933 173.74211,106.442933" id="Path-2" stroke="#C9CCD5" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"></path>
      </g>
      </g>
      </g>
      </g>
      </g>
      </svg>
      <div />
      <div>Drag and drop files here or click here.</div>
      </div>
      </div>
      <div className="dz-default dz-message">
      <span />
      </div>
      <div>
      {!editingLocalProject ? (
        files.map((file, i) => (
          <div key={i} className="dz-preview-new dz-processing dz-image-preview" >
          <div className="dz-image" onClick={this.handleClick.bind(this, i)}>
          <div>
          { 
            (file.type == 'video/mp4') ? (
              <img data-dz-thumbnail className="thumbnail" src={ thumbSrc }/>) : (
              <img data-dz-thumbnail className="thumbnail" src={ file.previewTemplate.firstElementChild.firstChild.currentSrc }/>)
          }
          <img key={i} data-dz-thumbnail className="thumbnail"
          src={ file.previewTemplate.firstElementChild.firstChild.currentSrc }/>
          </div>
          </div>
          <div className="dz-details">
          <div className="dz-size">
          <span>
          <strong>{(file.size / 1024).toFixed(2)}</strong>KB
          </span>
          </div>
          <div className="dz-remove" onClick={this.removeFile.bind(this, i)}>
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
          checked="checked"
          className={file.type}
          onClick={(e)=>this.updateFilesForBulkList(e,file)}
          />
          <div className="check" onClick={(e)=>this.updateFilesForBulkList(e,file)}><i className="iconcss icon-checkmark"></i></div>
          </div>

          <span className="dz-title"><Truncate lines={1} ellipsis={"..." + file.name.slice(-12)}>
                { file.name }
            </Truncate></span>
          <span className="dz-icon">
          { (file.type == 'image/jpeg') ? <i className="iconcss icon-type-image"></i> : null }
          { (file.type == 'image/png') ? <i className="iconcss icon-type-image"></i> : null }
          { (file.type == 'video/mp4') ? <i className="iconcss icon-type-video"></i> : null }
          </span>
          <span className="dz-status" id={file.name}>
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
          style={{ width: this.state.percentage + "%" }}
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
          </div>
          ))
        ) : (
        localFiles.map((file, i) => (
          <div key={i} className="dz-preview-new dz-processing dz-image-preview" >
          <div className="dz-image" onClick={this.handleClick.bind(this, i)}>
          <div>
          {file.name ? (
            <img key={i} data-dz-thumbnail className="thumbnail" src={ file.img}/>
            ): (
            <img key={i} data-dz-thumbnail className="thumbnail" src={ file.previewTemplate.firstElementChild.firstChild.currentSrc}/>
            )
          }
          </div>
          </div>

          <div className="dz-details">

          <div className="dz-date">
          {file.name ? (
            <span>{moment.unix(file.lastModified).format("HH:mm:ss")}   </span>
            ): (
            <span>03/19/2018</span>
            )
          }
          </div>
          <div className="dz-size">
          <div>
          <input 
          key={file} 
          className={file.type}
          type='checkbox' 
          onClick={(e)=>this.updateFilesForBulkList(e,file)}     
          />
          </div>
          <span>
          {file.name ? (
            <strong>{(file.size / 1024).toFixed(2)}KB</strong>
            ): (
            <strong>{(file.upload.total / 1024).toFixed(2)} KB</strong>
            )
          }
          </span>          
          </div>
          </div>
          <div className="dz-filename">
          <a className="downloadLink">
          <span />
          </a>
          </div>

          <div className="dz-remove" onClick={this.removeFile.bind(this, i)}>
          <div>
          <svg
          style={{
            display: "inlineBlock",
            color: "rgba(0, 0, 0, 0.87)",
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

          {/*<div className="dz-progress">
                    <span
                    className="dz-upload"
                    style={{ width: this.state.percentage + "%" }}
                    >
                    <strong />
                    </span>
                    </div>*/}

          <div className="dz-error-message">
          <span />
          </div>

          <div className="dz-error-mark">
          <span />
          </div>
          </div>
          ))
        )}
        </div>

        <div className={classnames}>
        <Card id="cards-wrapper">
        <div className="files-information-close" onClick={this.closeFilesInformation}><i className="iconcss icon-close-thin"></i></div>
        <Field addPencil={true} field={fields[71]}>
        <FieldWidgets.Text label="Season / Episode Name" />
        </Field>

        <Field addPencil={true} field={fields[70]}>
        <FieldWidgets.Text field={fields[70]} />
        </Field>

        <div className="filling-out-status">
         <span>
          <RegistrationStatus
          isReadyForIngest={ (this.state.itemStatus == "Ready For Ingest" || this.state.itemStatus == "Ready For Service" || this.state.itemStatus == "Search Optimized") ? true : false }
          isReadyForService={ (this.state.itemStatus == "Ready For Service" || this.state.itemStatus == "Search Optimized") ? true : false }
          isSearchOptimized={ this.state.itemStatus == "Search Optimized" ? true : false }
          />
          {this.state.itemStatus}
        </span>
        <span>
          { (this.state.target.type == "video" || this.state.target.type == "video/mp4") ? (<i className="iconcss icon-type-video"></i>) : null}
          { (this.state.target.type == "image" || this.state.target.type == "image/jpeg") ? (<i className="iconcss icon-type-image"></i>) : null}
          { (this.state.target.type == "audio" || this.state.target.type == "image/mp3") ? (<i className="iconcss icon-type-audio"></i>) : null}
          { this.state.target.type }
        </span>
 
        </div>

        <CardSection id="files-info-cards-section">
        <Card title="Basic Info" id="basic-info">
        <CardSection>
        <div>
        <Field field={fields[60]}>
        <Selectbox
        helpText=""
        label="Media Type Class"
        items={mediaTypeList}
        inputPlaceholder="Type source"
        
        />
        </Field>
        </div>
        <div>
        {(this.state.target.type == "video" || this.state.target.type == "video/mp4")  ? (
          <div>
          <Field field={fields[57]}>
          <Selectbox
          helpText=""
          label="Material Type"
          items={typeListVideo}
          inputPlaceholder="Type source"
          />
          </Field>
          <Selectbox
          helpText=""
          label="Secondary Type"
          items={secondaryTypeListVideo}
          inputPlaceholder="Type source"
          onChange={this.onInjestSelect}
          value={this.state.selectedFilter}
          />
          <Field field={fields[61]}>
          <Selectbox
          helpText=""
          label="Frame Rate"
          items={frameRateList}
          inputPlaceholder="Type source"
          />
          </Field>
          </div>
          ) : ( 
          <div>
          <Field field={fields[57]}>
          <Selectbox
          helpText=""
          label="Material Type"
          items={typeListImage}
          inputPlaceholder="Type source"
          />
          </Field>
         
          <Selectbox
          helpText=""
          label="Secondary Type"
          items={secondaryTypeListImage}
          inputPlaceholder="Type source"
          onChange={this.onInjestSelect}
          value={this.state.selectedFilter}
          />
         
          </div>
          )
        }
        </div>

        <Selectbox
        helpText=""
        label="Aspect Ratio"
        items={aspectRatioList}
        inputPlaceholder="Type source"
        onChange={this.onServiceSelect}
        value={this.state.selectedFilterSevice}
        />
        </CardSection>
        </Card>

                  <Card
          title="Additional Fields"
          id="additional"
          classname="card"
          >
          <CardSection>
           {(this.state.target.type == "video" || this.state.target.type == "video/mp4")  ? (
            <div>
          
          <Selectbox
          helpText=""
          label="Air Version Type"
          items={airVersionList}
          inputPlaceholder="Type source"
          onChange={this.onSearchOptimizedSelect}
          value={this.state.selectedFilterOptimezed}
          />
         
          <FieldWidgets.Text label="House ID" />
          <Field field={fields[64]}>
          <Selectbox
          helpText=""
          label="Show"
          items={showList}
          inputPlaceholder="Type source"
          />
          </Field>
          <Field field={fields[65]}>
          <Selectbox
          helpText=""
          label="Season"
          items={episodeList}
          inputPlaceholder="Type source"
          />
          </Field>
          <FieldWidgets.Text label="Description" />
          <FieldWidgets.Text label="Uploader" />
          <FieldWidgets.Text label="Keywords" />
          <FieldWidgets.Text label="Production Type" />
          <FieldWidgets.Text label="Actors" />
          <FieldWidgets.Text label="Network" />
          <FieldWidgets.Text label="Language" />
          <FieldWidgets.Text label="Copyright" />
          <FieldWidgets.Text label="Restrictions" />
          </div> ) : (

          <div>
          <Selectbox
          helpText=""
          label="Air Version Type"
          items={airVersionList}
          inputPlaceholder="Type source"
          onChange={this.onSearchOptimizedSelect}
          value={this.state.selectedFilterOptimezed}
          />
          <FieldWidgets.Text label="House ID" />
          <FieldWidgets.Text label="Composistion" />
          <FieldWidgets.Text label="Color" />
          <FieldWidgets.Text label="Color Format" />
          <FieldWidgets.Text label="Promo Code" />
          <Field field={fields[64]}>
          <Selectbox
          helpText=""
          label="Show"
          items={showList}
          inputPlaceholder="Type source"
          />
          </Field>
          <Field field={fields[65]}>
          <Selectbox
          helpText=""
          label="Season"
          items={episodeList}
          inputPlaceholder="Type source"
          />
          </Field>
          <FieldWidgets.Text label="Episode Number" />
          <FieldWidgets.Text label="Description" />
          <FieldWidgets.Text label="Uploader" />
          <FieldWidgets.Text label="Keywords" />
          <FieldWidgets.Text label="Production Type" />
          <FieldWidgets.Text label="Actors" />
          <FieldWidgets.Text label="Network" />
          <FieldWidgets.Text label="Language" />
          <FieldWidgets.Text label="Copyright" />
          <FieldWidgets.Text label="Restrictions" />
          </div>
          )
        }
          </CardSection>
          </Card>



     
      
        <Card title="Detected Metadata" id="metadata">
        <CardSection>
        {(this.state.target.type == "video" || this.state.target.type == "video/mp4")  ? (
          <div>
        <FieldWidgets.Text
        label="File Name"
        value={this.state.target.name}
        />
        <FieldWidgets.Text
        label="File Type"
        value={this.state.target.type}
        />
        <FieldWidgets.Text
        label="File Size"
        value={this.state.target.size}
        />
        <FieldWidgets.Text
        label="Total Run Time"
        value="01:15:23"
        />
        <Field field={fields[58]}>
        <Selectbox
        helpText=""
        label="File Size Increment"
        items={fileIncList}
        inputPlaceholder="Type source"
        />
        </Field>
        <FieldWidgets.Text
        label="Date Created"
        value={moment
          .unix(this.state.target.lastModified)
          .format("HH:mm:ss")}
          />
          <FieldWidgets.Text
          label="Team"
          value={this.props.client.user.name}
          />
          <FieldWidgets.Text

          value={this.state.target.width + " " + "px"}
          />
          <FieldWidgets.Text
          value={this.state.target.height + " " + "px"}
          /> 
          </div> ) : (
          <div>
        <FieldWidgets.Text
        label="File Name"
        value={this.state.target.name}
        />
        <FieldWidgets.Text
        label="File Type"
        value={this.state.target.type}
        />
        <FieldWidgets.Text
        label="File Size"
        value={this.state.target.size}
        />
        <FieldWidgets.Text
        label="Total Run Time"
        value="01:15:23"
        />
        <Field field={fields[58]}>
        <Selectbox
        helpText=""
        label="File Size Increment"
        items={fileIncList}
        inputPlaceholder="Type source"
        />
        </Field>
        <FieldWidgets.Text
        label="Date Created"
        value={moment
          .unix(this.state.target.lastModified)
          .format("HH:mm:ss")}
          />
          <FieldWidgets.Text
          label="Team"
          value={this.props.client.user.name}
          />
          <FieldWidgets.Text

          value={this.state.target.width + " " + "px"}
          />
          <FieldWidgets.Text
          value={this.state.target.height + " " + "px"}
          /> 
          <FieldWidgets.Text label="Lattitude" value="85.05"/>
          <FieldWidgets.Text label="Longitude" value="180"/>
          <FieldWidgets.Text label="Model" value="Canon EOS 5D Mark III"/>
          <FieldWidgets.Text label="Serial #" value="142027003573"/>
          <FieldWidgets.Text label="Firmware" value="P330i"/>
          <FieldWidgets.Text label="Frame #" value="10" />
          <FieldWidgets.Text label="Lens (mm)" value="135" />
          <FieldWidgets.Text label="ISO" value="1600"/>
          <FieldWidgets.Text label="Aperture" value="2"/>
          <FieldWidgets.Text label="Shutter" value="1/250"/>
          <FieldWidgets.Text label="Exp. Comp." value="-0.3"/>
          <FieldWidgets.Text label="Flash Comp." value="1.2"/>
          <FieldWidgets.Text label="Program" value="Aperture Priority"/>
          <FieldWidgets.Text label="Focus Mode" value="High" />
          <FieldWidgets.Text label="White Bal." value="3" />
          <FieldWidgets.Text label="ICC Profile" value="sRGB Profile"/>
          <FieldWidgets.Text label="Contrast" value="luminance"/>
          <FieldWidgets.Text label="Sharpening" value="Capture"/>
          <FieldWidgets.Text label="Quality" value="Low" />
          <FieldWidgets.Text label="Orientation" value="Landscape" />
          <FieldWidgets.Text label="Creator" value="Marco Materazzi" />
          <FieldWidgets.Text label="Territory" value="EC" />
          </div>

          )}
          </CardSection>
          </Card>

          {/*<div id="clear" />*/}


          </CardSection>
          </Card>
          </div>
          </div>
          </div>
          </div>
          </div>
          );
}

renderAddedAndRemovedMessages = () => {
  return (
    <div>
    {this.state.uploadState.newUploadedFiles.length > 0 && (
      <div>
      Added files ({this.state.uploadState.newUploadedFiles.length}):
      <div style={{ marginLeft: 15 }}>
      {this.state.uploadState.newUploadedFiles.map((file, i) => (
        <div key={i}>fileId: {file}</div>
        ))}
      </div>
      </div>
      )}
    {this.state.uploadState.alreadyAssociatedRemovedFiles.length > 0 && (
      <div>
      Removed files ({
        this.state.uploadState.alreadyAssociatedRemovedFiles.length
      }):
      <div style={{ marginLeft: 15 }}>
      {this.state.uploadState.alreadyAssociatedRemovedFiles.map(
        (file, i) => <div key={i}>fileId: {file}</div>
        )}
      </div>
      </div>
      )}
    </div>
    );
};

renderSaveAndCancel = () => {
  return (
    <div
    style={{
      textAlign: "right"
    }}
    />
    );
};
}

const mapStateToProps = state => {
  return {
    fields: state.fields,
    lockedBy: state.contentItem.lockedBy,
    client: state.client
  };
};

export default connect(mapStateToProps)(Dropzone);