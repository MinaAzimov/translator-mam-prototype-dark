import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import BaseModal from 'react-overlays/lib/Modal';
import { SlideIn } from './ModalTransition';
import Text from './form/Text';
import EditVideoThumb from './EditVideoThumb';
import { FocalPoint, CropsPreview, FocalRectangle, Cropper } from './FocalPoint';
import { Image, ImageEditControls } from './ImageEdit';
import { connect } from 'react-redux';
import { Creatable } from 'react-select';
import lodash from "lodash";
import socket from '../client/socketClient';
import { getSize, getExpiration } from '../services/media';
import Prompt from './Prompt';
import { IMAGE_STYLES } from '../constants/image-styles';
import TagsInput from './form/TagsInput';
import Selectbox from './form/Selectbox';
import { getContentItems } from "../services/content";
import Dropzone from './Dropzone';
import { Card, CardSection, CardBoard } from './Card';
import Field from "./Field";
import FieldWidgets from "./form/FieldWidgets";
import moment from "moment";
import ReactTimeout from 'react-timeout'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classNames from "classnames";


import Truncate from 'react-truncate';

const typeListVideo=[{title:"Promo",id:0},{title:"Episodic",id:1},{title:"Theatrical",id:2},{title:"Footage",id:3},{title:"Short",id:4}];
const typeListImage=[{title:"Photography",id:0},{title:"Graphic",id:1},{title:"Art",id:2},{title:"Print",id:3},{title:"Logo",id:4}];
const secondaryTypeListVideo=[{title:"Texted",id:0},{title:"Textless",id:1},{title:"Masked",id:2},{title:"Unmasked",id:3}];
const secondaryTypeListImage=[{title:"Episodic Stills (TV)",id:0},{title:"Gallery Stills (TV)",id:1},{title:"Stills (FILM)",id:2},{title:"Behind the Scenes",id:3},{title:"Publicity Events",id:4},{title:"Artwork",id:5},{title:"Other",id:6}];
const contentTypeList=[{title:"Show",id:0},{title:"Event",id:1},{title:"Promo",id:2},{title:"Uncategorized",id:3}];
const showList=[{title:"Show 1",id:0},{title:"Show 2",id:1},{title:"Show 3",id:2},{title:"Show 4",id:3}];
const episodeList=[{title:"Season 1",id:0},{title:"Season 2",id:1},{title:"Season 3",id:2},{title:"Season 4",id:3}];
const aspectRatioList=[{title:"16x9 full frame (1:78)",id:0},{title:"16x9 letterbox (1:88)",id:1},{title:"16x9 letterbox (2:00)",id:2},{title:"16x9 letterbox (2:21)",id:3},{title:"16x9 letterbox (2:35)",id:4},{title:"16x9 letterbox (2:40)",id:5},{title:"16x9 letterbox (2:76)",id:5},{title:"16x9 side matted (1:33)",id:5},{title:"16x9 side matted (1:66)",id:5},{title:"4x3 full frame (1:33)",id:5},{title:"4x3 letterbox (1:66)",id:5},{title:"4x3 letterbox !1:78)",id:5},{title:"4x3 letterbox (2:10)",id:5},{title:"4x3 letterbox (2:35)",id:5},{title:"4x3 letterbox (2:40)",id:5},{title:"4x3 letterbox (2:76)",id:5}];

const productionTypeList=[{title:"-None-",id:0, dropdown: "ProductionType"},{title:"Digital",id:1, dropdown: "ProductionType"},{title:"Broadcast",id:2, dropdown: "ProductionType"},{title:"Event",id:3, dropdown: "ProductionType"},{title:"Live Event",id:4, dropdown: "ProductionType"},{title:"Web Event",id:5, dropdown: "ProductionType"},{title:"Special",id:6, dropdown: "ProductionType"}];
const assosiationsList=[{title:"-None-",id:0, dropdown: "Assosiations"},{title:"Title",id:1, dropdown: "Assosiations"}];
const versionTypeList=[{title:"-None-",id:0, dropdown: "VersionType"},{title:"International Broadcast Master",id:1, dropdown: "VersionType"},{title:"Domestic Broadcast Master",id:2, dropdown: "VersionType"},{title:"International [Territory] OFCOM Compliant",id:3, dropdown: "VersionType"},{title:"Broadcast Master",id:4, dropdown: "VersionType"},{title:"Uncensored Master",id:5, dropdown: "VersionType"},{title:"Submaster",id:6, dropdown: "VersionType"}];
const languageList=[{title:"-None-",id:0, dropdown: "Language"},{title:"English",id:1, dropdown: "Language"},{title:"German",id:2, dropdown: "Language"},{title:"Spanish",id:3, dropdown: "Language"},{title:"French",id:4, dropdown: "Language"}];
const textListVideo=[{title:"-None-",id:0, dropdown: "Text"},{title:"Texted",id:1, dropdown: "Text"},{title:"Textless",id:2, dropdown: "Text"},{title:"Masked",id:3, dropdown: "Text"},{title:"Unmasked",id:4, dropdown: "Text"}];


class EditFileOverlay extends Component {

  static propTypes = {
    editMediaIds: PropTypes.array,
    mediaItems: PropTypes.array,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    show: true,
    onClose: () => {show: false},
    onSubmit: () => {},
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

  constructor(props) {
    super(props);
    
    this.state = {
      mode: '',
      changed: false,
      showPrompt: false,
      selectedImageStyle: null,
      checked: true,
      showPrompt: false,
      filesArray: [],
      saveStatus: "Save",
      removed: false,
      inputMaterialType: '',
      inputSecondaryType: '',
      inputShow: '',
      inputSeason: '',
      inputEpisode: '',
      value: '',
      isDetected: true,
      target: '',
      inputUserDescription: '',
      inputKeywords: '',
      inputTitle: '',
      inputProductionType: '',
      inputPeople: '',
      inputProducer: '',
      inputComments: '',
      inputLanguage: '',
      inputCopyright: '',
      inputRestrictions: '',
      inputAFD: '',
      inputAspectRatio: '',
      inputTeam: '',
      inputPStorage: '',
      inputStorageLocation: '',
      inputAcSource: '',
      inputPremiereDate: '',
      inputAssosiations: '',
      inputVersionType: '',

    }
    this.handleChange = this.handleChange.bind(this);
  }

  addNewFields = val => {
    console.log(val);
    this.setState({
      "contentType": val
    })
    let element;
    (val) => this.props.updateContentType(val)
    
  };

  onSubmit = () => {
    this.props.onSubmit(this.state.media);
    socket.emit("UPDATE_MEDIA_ITEM", this.state.media);
  };


  onFocus = (e) => {
    this.setState({ 
      focused: true,
      isDetected: false,
      target: e.target.id
    });
    if (this.props.onStartEdit) {
      this.props.onStartEdit();
    }
  };


  onBlur = (e) => {
    this.setState({ focused: false });
    if (this.props.onStopEdit) {
      this.props.onStopEdit();
    }
  };

  close() {
     setTimeout(() => { 
        this.setState({
      saveStatus: "Save",
      inputMaterialType: '',
      inputSecondaryType: '',
      inputShow: '',
      inputSeason: '',
      value: '',
      isDetected: true,
      target: '',
      inputUserDescription: '',
      inputKeywords: '',
      inputTitle: '',
      inputProductionType: '',
      inputPeople: '',
      inputProducer: '',
      inputComments: '',
      inputLanguage: '',
      inputCopyright: '',
      inputRestrictions: '',
      inputAFD: '',
      inputAspectRatio: '',
      inputTeam: '',
      inputPStorage: '',
      inputStorageLocation: '',
      inputAcSource: '',
      inputPremiereDate: '',
      contentType: '',
      inputAssosiations: '',
      inputEpisode: '',
      inputVersionType: '',
      inputText: '',
     })

         }, 1000); 
   

      if(this.state.saveStatus == "Save") {
        this.setState({
      showPrompt: true,
     });
    }

else {
   this.props.closeModal();
   this.props.disableBulkEdit();   
}

  };

  changeStatus(){

   this.setState({
      showPrompt: false,
      saveStatus: "Saved",
      inputMaterialType: '',
      inputSecondaryType: '',
      inputShow: '',
      inputSeason: '',
      value: '',
      isDetected: true,
      target: '',
      inputUserDescription: '',
      inputKeywords: '',
      inputTitle: '',
      inputProductionType: '',
      inputPeople: '',
      inputProducer: '',
      inputComments: '',
      inputLanguage: '',
      inputCopyright: '',
      inputRestrictions: '',
      inputAFD: '',
      inputAspectRatio: '',
      inputTeam: '',
      inputPStorage: '',
      inputStorageLocation: '',
      inputAcSource: '',
      inputPremiereDate: '',
      contentType: '',
      inputAssosiations: '',
      inputEpisode: '',
      inputVersionType: '',
      inputText: '',
    });
   this.props.closeModal();
   this.props.disableBulkEdit();
   setTimeout(() => { 
        this.setState({
      saveStatus: "Save"
     })

         }, 1000);   

  }

    onPromptCancel = () => {
 if(this.state.saveStatus == "Save") {

    this.setState({
      showPrompt: false,
      inputMaterialType: '',
      inputSecondaryType: '',
      inputShow: '',
      inputSeason: '',
      value: '',
      isDetected: true,
      target: '',
      inputUserDescription: '',
      inputKeywords: '',
      inputTitle: '',
      inputProductionType: '',
      inputPeople: '',
      inputProducer: '',
      inputComments: '',
      inputLanguage: '',
      inputCopyright: '',
      inputRestrictions: '',
      inputAFD: '',
      inputAspectRatio: '',
      inputTeam: '',
      inputPStorage: '',
      inputStorageLocation: '',
      inputAcSource: '',
      inputPremiereDate: '',
      contentType: '',
      inputAssosiations: '',
      inputEpisode: '',
      inputVersionType: '',
      inputText: '',
    });
  }
  else {
   this.props.closeModal();
   this.props.disableBulkEdit();   
}
  };


  onPromptOk = () => {
    this.setState({
      showPrompt: false,
      inputMaterialType: '',
      inputSecondaryType: '',
      inputShow: '',
      inputSeason: '',
      value: '',
      isDetected: true,
      target: '',
      inputUserDescription: '',
      inputKeywords: '',
      inputTitle: '',
      inputProductionType: '',
      inputPeople: '',
      inputProducer: '',
      inputComments: '',
      inputLanguage: '',
      inputCopyright: '',
      inputRestrictions: '',
      inputAFD: '',
      inputAspectRatio: '',
      inputTeam: '',
      inputPStorage: '',
      inputStorageLocation: '',
      inputAcSource: '',
      inputPremiereDate: '',
      contentType: '',
      inputAssosiations: '',
      inputEpisode: '',
      inputVersionType: '',
      inputText: '',
    });
   this.props.closeModal();
   this.props.disableBulkEdit();  
  };

  whichAnimationEvent = () => {
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

  handleRemoval = (i) => {
    this.props.removeFileFromOverlay(i);
    this.setState({filesArray: this.props.itemsForBulk});
  }

  handleChange = (i, file) => {
    console.log(file);
    console.log(i.target);
    i.target.parentNode.parentNode.classList.add('animate-out');
    i.persist();
    // this.props.removeFileFromOverlay(i);

    const animationEvent = this.whichAnimationEvent();
    i.target.parentNode.parentNode.addEventListener(animationEvent, () => {
      this.props.removeFileFromOverlay(i);
      this.setState({filesArray: this.props.itemsForBulk});
      i.target.parentNode.parentNode.classList.remove('animate-out');
      i.stopPropagation();
    });
    console.log(animationEvent);
  }

  updateMaterialType = val => {
    this.setState({
      inputMaterialType: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputMaterialType = val;
      file.test = "edited";
      file.inputStatus = "Ready For Ingest"
      console.log(file)
    })
  }

    updateAssosiations = val => {
    this.setState({
      inputAssosiations: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputAssosiations = val;
      file.test = "edited";
      console.log(file)
    })
  }

  updateProductionType = val => {
    this.setState({
      inputProductionType: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputProductionType = val;
      file.test = "edited"
      console.log(file)
    })
  }

  updateShow = val => {
    this.setState({
      inputShow: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputShow = val;
      file.test = "edited"
      console.log(file)
    })
  }

  updateSeason = val => {
    this.setState({
      inputSeason: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputSeason = val;
      file.test = "edited"
      console.log(file)
    })
  }

    updateEpisode = val => {
    this.setState({
      inputEpisode: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputEpisode = val;
      file.test = "edited"
      console.log(file)
    })
  }

  updateAspectRatio = val => {
    this.setState({
      inputAspectRatio: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputAspectRatio = val;
      file.test = "edited"
      console.log(file)
    })
  }

    updateVersionType = val => {
    this.setState({
      inputVersionType: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputVersionType = val;
      file.test = "edited"
      console.log(file)
    })
  }

      updateLanguage = val => {
    this.setState({
      inputLanguage: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputLanguage = val;
      file.test = "edited"
      console.log(file)
    })
  }

    updateText = val => {
    this.setState({
      inputText: val
    });

    this.props.itemsForBulk.forEach((file, i) => {
      file.inputText = val;
      file.test = "edited"
      console.log(file)
    })
  }



  updateUserDescription = (e) => {
    this.setState({
      inputUserDescription: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
      file.inputUserDescription = e.target.value;
      file.test = "edited"
      console.log(file)
    })
  }

  updateKeywords = (e) => {
    this.setState({
      inputKeywords: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
      file.inputKeywords = e.target.value;
      file.test = "edited"
      console.log(file)
    })
  }

  updateTitle = (e) => {
    this.setState({
      inputTitle: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
     
        file.inputTitle = e.target.value + "_" + i;
        file.editedInBulk = "edited";
      console.log(file)
      
      
    })
  }

  updatePeople = (e) => {
    this.setState({
      inputPeople: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputPeople = e.target.value;
        file.test = "edited"
    })
  }

  updateProducer = (e) => {
    this.setState({
      inputProducer: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputProducer = e.target.value;
        file.test = "edited"
    })
  }

  updateTheathricalTitle = (e) => {
    this.setState({
      inputTheatricalTitle: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputTheatricalTitle = e.target.value;
        file.test = "edited"
    })
  }

    updateComments = (e) => {
    this.setState({
      inputComments: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputComments = e.target.value;
        file.test = "edited"
    })
  }


  updateCopyright = (e) => {
    this.setState({
      inputCopyright: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputCopyright = e.target.value;
        file.test = "edited"
    })
  }

  updateRestrictions = (e) => {
    this.setState({
      inputRestrictions: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputRestrictions = e.target.value;
        file.test = "edited"
    })
  }

  updateAFD = (e) => {
    this.setState({
      inputAFD: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputAFD = e.target.value;
        file.test = "edited"
    })
  }

  updateTeam = (e) => {
    this.setState({
      inputTeam: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputTeam = e.target.value;
        file.test = "edited"
    })
  }

  updatePStorage = (e) => {
    this.setState({
      inputPStorage: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputPStorage = e.target.value;
        file.test = "edited"
    })
  }

  updateStorageLocation = (e) => {
    this.setState({
      inputStorageLocation: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputStorageLocation = e.target.value;
        file.test = "edited"
    })
  }

   updateAcScource = (e) => {
    this.setState({
      inputAcSource: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputAcSource = e.target.value;
        file.test = "edited"
    })
  }

  updatePremiereDate = (e) => {
    this.setState({
      inputPremiereDate: e.target.value
    });
    this.props.itemsForBulk.forEach((file, i) => {
        file.inputPremiereDate = e.target.value;
        file.test = "edited"
    })
  }



  render() {


    const { fields, showModal, closeModal, itemsForBulk, disableBulkEdit, editingLocalProject, removeFileFromOverlay, type } = this.props;
    const {saveStatus, filesArray, removed} = this.state;


      const UserDescription = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputUserDescription,
      'field__focused': this.state.focused && this.state.target == "userDescription"
    });

       const Title = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputTitle,
      'field__focused': this.state.focused && this.state.target == "title"
    });

      const Keywords = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputKeywords,
      'field__focused': this.state.focused && this.state.target == "keywords"
    });


      const People = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputPeople,
      'field__focused': this.state.focused && this.state.target == "people"
    });

      const Producer = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputProducer,
      'field__focused': this.state.focused && this.state.target == "producer"
    });

      const TheatricalTitle = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputTheatricalTitle,
      'field__focused': this.state.focused && this.state.target == "theatrical"
    });

      const Comments = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputComments,
      'field__focused': this.state.focused && this.state.target == "comments"
    });


      const Copyright = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputCopyright,
      'field__focused': this.state.focused && this.state.target == "copyright"
    });

      const Restrictions = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputRestrictions,
      'field__focused': this.state.focused && this.state.target == "restrictions"
    });

      const AFD = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputAFD,
      'field__focused': this.state.focused && this.state.target == "AFD"
    });



      const Team = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputTeam,
      'field__focused': this.state.focused && this.state.target == "team"
    });

      const PStorage = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputPStorage,
      'field__focused': this.state.focused && this.state.target == "pstorage"
    });

      const StorageLocation = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputStorageLocation,
      'field__focused': this.state.focused && this.state.target == "storageLocation"
    });

      const AcSource = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputAcSource,
      'field__focused': this.state.focused && this.state.target == "acSource"
    });

       const PremiereDate = classNames({
      'field-text': true,
      'field__not-empty': this.state.inputPremiereDate,
      'field__focused': this.state.focused && this.state.target == "premiereDate"
    });


    

    return (
      <div className="media-overlay media-overlay">

        <BaseModal 
          show={showModal} 
          dialogClassName="cnbc-modal modal--media-edit" 
          transition={SlideIn}
          containerClassName="modal-container-slider">
          <div className="modal-main">
            <div className="modal-top">
              <h4 className="modal-title">Bulk Edit Metadata <span>({itemsForBulk.length})</span></h4>
            </div>
              <div className="dz-container-1">
            <div className="filepicker dropzone dz-clickable">
              <div className="dz-clickable" id="dz-custom-mesg-2">
            <div className="overflow-scrolling">
             {!removed ? (
               itemsForBulk.map((file, i) => (
                
                    <div key={i} className="dz-preview-new dz-processing dz-image-preview" >

                      <div className="dz-image">
                        <div>
                          <img  data-dz-thumbnail className="thumbnail" src={ file.previewTemplate.firstElementChild.firstChild.currentSrc}/>
                        </div>
                      </div>
                      <div className="dz-details">
                      <div className="dz-size">
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

                      <span className="dz-title"><Truncate lines={1} ellipsis={"..." + file.inputTitle.slice(-12)}>
                          { file.inputTitle }
                      </Truncate></span>

                      <span className="dz-icon">
                        { (file.type == 'image/jpeg') ? <i className="iconcss icon-type-image"></i> : null }
                        { (file.type == 'image/png') ? <i className="iconcss icon-type-image"></i> : null }
                        { (file.type == 'video/mp4') ? <i className="iconcss icon-type-video"></i> : null }
                      </span>

                      <div className="dz-checkbox">
                       <input 
                         key={i}
                         value={i} 
                         defaultChecked={this.state.checked}
                         type='checkbox' 
                         onClick={(i)=>this.handleChange(i, file)}     
                         />
                          <div className="check">
                            <i className="iconcss icon-checkmark"></i>
                          </div>
                     </div>



                      <div className="dz-filename">
                        <a className="downloadLink">
                          <span />
                        </a>
                      </div>

                      <div className="dz-remove" >
                        <div>
                          <svg
                            style={{
                              display: "inlineBlock",
                              color: "rgba(0, 0, 0, 0.87)",
                              fill: "currentColor",
                              height: "24px",
                              width: "24px",
                              userSelect: "none",
                              viewBo: "0 0 24 24"
                            }}
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </div>
                      </div>

                      <div className="dz-progress">
                        <span
                          className="dz-upload"
                          style={{ width: this.state.percentage + "%" }}
                        >
                          <strong />
                        </span>
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
                 filesArray.map((file, i) => (
                
                    <div key={i} className="dz-preview-new dz-processing dz-image-preview" >

                      <div className="dz-image">
                        <div>
                         
                          <img  data-dz-thumbnail className="thumbnail" src={ file.previewTemplate.firstElementChild.firstChild.currentSrc}/>
                         
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
                      </div>

                      <div className="dz-size">
                      <div>
                     <input 
                       key={i} 
                       defaultChecked={this.state.checked}
                       type='checkbox' 
                       onClick={(e)=>this.handleChange(e,file)}     
                       />
                     </div>
                        <span>
                         {file.name ? (
                          <strong>{(file.size / 1024).toFixed(2)}KB</strong>
                          ): (
                         <strong>{(file.upload.total / 1024).toFixed(2)} KB</strong>
                          )}
                          
                        </span>
                      </div>
                      <div className="dz-filename">
                        <a className="downloadLink">
                          <span />
                        </a>
                      </div>
                      <div className="dz-remove" >
                        <div>
                          <svg
                            style={{
                              display: "inlineBlock",
                              color: "rgba(0, 0, 0, 0.87)",
                              fill: "currentColor",
                              height: "24px",
                              width: "24px",
                              userSelect: "none",
                              viewBo: "0 0 24 24"
                            }}
                          >
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="dz-progress">
                        <span
                          className="dz-upload"
                          style={{ width: this.state.percentage + "%" }}
                        >
                          <strong />
                        </span>
                      </div>

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
            <Card title="Essentials" id="basic-info">
                      <CardSection>

                      <div className={Title}>
                        <label className="field__label">
                         Title (by editing this field you will overwrite all existing titles)
                        </label>
                        <input className="field-text__input"  id="title"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputTitle} onChange={this.updateTitle.bind(this)}/>
                      </div>

                         {

                            (type.length > 0 && (type == "image/jpeg" || type == "image/jpg" || type == "image/png")) ? 
                             <Selectbox
                                helpText=""
                                label="Material Type"
                                items={typeListIm}
                                inputPlaceholder="Type source"
                                value={this.state.inputMaterialType} 
                                onChange={this.updateMaterialType.bind(this)}
                                />
                           : 

                           <div>
                              <Selectbox
                                helpText=""
                                label="Material Type"
                                items={typeListVideo}
                                inputPlaceholder="Type source"
                                value={this.state.inputMaterialType} 
                                onChange={this.updateMaterialType.bind(this)}
                              />

                              <Selectbox
                                helpText=""
                                label="Text"
                                items={textListVideo}
                                inputPlaceholder="Type source"
                                value={this.state.inputText} 
                                onChange={this.updateText.bind(this)}
                                />
                          </div>

                          }

                           <Selectbox
                              helpText=""
                              label="Production Type"
                              items={productionTypeList}
                              inputPlaceholder="Type source"
                              value={this.state.inputProductionType} 
                              onChange={this.updateProductionType.bind(this)}
                            />

                            <Selectbox
                              helpText=""
                              label="Assosiations"
                              items={assosiationsList}
                              inputPlaceholder="Type source"
                              value={this.state.inputAssosiations} 
                              onChange={this.updateAssosiations.bind(this)}
                            />
                         
                  
                                <Selectbox
                                helpText=""
                                label="Series"
                                items={showList}
                                value={this.state.inputShow} 
                                onChange={this.updateShow.bind(this)}
                                inputPlaceholder="Type source"
                                />
                                <Selectbox
                                helpText=""
                                label="Season"
                                items={episodeList}
                                inputPlaceholder="Type source"
                                value={this.state.inputSeason} 
                                onChange={this.updateSeason.bind(this)}
                                />
                                <Selectbox
                                helpText=""
                                label="Episode"
                                items={episodeList}
                                inputPlaceholder="Type source"
                                value={this.state.inputEpisode} 
                                onChange={this.updateEpisode.bind(this)}
                                />
                              
                                <Selectbox
                                helpText=""
                                label="Aspect Ratio"
                                items={aspectRatioList}
                                inputPlaceholder="Type source"
                                value={this.state.inputAspectRatio} 
                                onChange={this.updateAspectRatio.bind(this)}
                                />
                                <Selectbox
                                  helpText=""
                                  label="Version Type"
                                  items={versionTypeList}
                                  inputPlaceholder="Type source"
                                  value={this.state.inputVersionType} 
                                  onChange={this.updateVersionType.bind(this)}
                                  />
                                <div className={Keywords}>
                                <label className="field__label">
                                 Keywords
                                </label>
                                <input className="field-text__input"  id="keywords"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputKeywords} onChange={this.updateKeywords.bind(this)}/>
                               </div>
                              <Selectbox
                                  helpText=""
                                  label="Language"
                                  items={languageList}
                                  inputPlaceholder="Type source"
                                  value={this.state.inputLanguage} 
                                  onChange={this.updateLanguage.bind(this)}
                                  />
                      </CardSection>
                    </Card>

                
                    <Card title="Descriptive Info" id="additional">
                      <CardSection>
                       
                      <div className={UserDescription}>
                        <label className="field__label">
                         User Description
                        </label>
                        <input className="field-text__input"  id="userDescription"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputUserDescription} onChange={this.updateUserDescription.bind(this)}/>
                      </div>
                      
              
                       <div className={People}>
                        <label className="field__label">
                         People
                        </label>
                        <input className="field-text__input"  id="people"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputPeople} onChange={this.updatePeople.bind(this)}/>
                      </div>

                      </CardSection>
                    </Card>


                    <Card title="Dates" id="dates">
                      <CardSection>
                       
                      <div className={PremiereDate}>
                        <label className="field__label">
                         Premiere Date
                        </label>
                        <input className="field-text__input"  id="premiereDate"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputPremiereDate} onChange={this.updatePremiereDate.bind(this)}/>
                      </div>
                      
              
                       <FieldWidgets.Text label="Shoot Date" />

                      </CardSection>
                    </Card>

                    <Card title="Admin" id="admin">
                      <CardSection>
                       
                      <div className={Producer}>
                        <label className="field__label">
                         Producer
                        </label>
                        <input className="field-text__input"  id="producer"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputProducer} onChange={this.updateProducer.bind(this)}/>
                      </div>
                      <FieldWidgets.Text label="Creative" />
                       <div className={Copyright}>
                        <label className="field__label">
                         Copyright
                        </label>
                        <input className="field-text__input"  id="copyright"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputCopyright} onChange={this.updateCopyright.bind(this)}/>
                      </div>
                       <div className={Restrictions}>
                        <label className="field__label">
                         Restrictions
                        </label>
                        <input className="field-text__input"  id="restrictions"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputRestrictions} onChange={this.updateRestrictions.bind(this)}/>
                      </div>

                      <div className={PStorage}>
                        <label className="field__label">
                         P Storage Location
                        </label>
                        <input className="field-text__input"  id="pstorage"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputPStorage} onChange={this.updatePStorage.bind(this)}/>
                      </div>
                      <div className={StorageLocation}>
                        <label className="field__label">
                         Storage Location
                        </label>
                        <input className="field-text__input"  id="storageLocation"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputStorageLocation} onChange={this.updateStorageLocation.bind(this)}/>
                      </div>
                      <div className={AcSource}>
                        <label className="field__label">
                         Acquisition Source
                        </label>
                        <input className="field-text__input"  id="acSource"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputAcSource} onChange={this.updateAcScource.bind(this)}/>
                      </div>
                      

                      </CardSection>
                    </Card>

                    <Card title="Comments" id="comments">
                      <CardSection>
                       
                      <div className={Comments}>
                        <label className="field__label">
                         Comments
                        </label>
                        <input className="field-text__input"  id="comments"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.state.inputComments} onChange={this.updateComments.bind(this)}/>
                      </div>

                      </CardSection>
                    </Card>

                
             </div>
              </div>
               </div>

            <button type="button" onClick={this.close.bind(this)} className="modal-close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          

            <div className="modal-bottom-cta">
              <button className="button button_style_fill-accent" onClick={this.changeStatus.bind(this)}>{saveStatus}</button>
              <button className="button button_style_outline-white" onClick={this.close.bind(this)}>Cancel</button>
            </div>
          </div>
        </BaseModal>
        <Prompt
          show={this.state.showPrompt}
          onCancel={this.onPromptCancel}
          onSubmit={this.onPromptOk}
          header={<h2 className="licensing-popup__title">Cancel Changes?</h2>}
          cancelText="Nevermind"
          submitText="Yes, Cancel"
        >
          <h3 className="licensing-popup__info">Any unsaved changes you made will be lost. Are you sure you want to cancel?</h3>
        </Prompt>

        
     
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

export default connect(mapStateToProps)(EditFileOverlay);
