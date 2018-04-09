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


import Truncate from 'react-truncate';


const typeList = [
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
      removed: false

    }
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.media);
    socket.emit("UPDATE_MEDIA_ITEM", this.state.media);
  };

  close() {
     setTimeout(() => { 
        this.setState({
      saveStatus: "Save"
     })

         }, 1000); 
   

      if(this.state.saveStatus == "Save") {
        this.setState({
      showPrompt: true
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
      saveStatus: "Saved"
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
    });
  }
  else {
   this.props.closeModal();
   this.props.disableBulkEdit();   
}
  };


  onPromptOk = () => {
    this.setState({
      showPrompt: false
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

  render() {


    const { fields, showModal, closeModal, itemsForBulk, disableBulkEdit, editingLocalProject, removeFileFromOverlay } = this.props;
    const {saveStatus, filesArray, removed} = this.state;
    

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

                      <span className="dz-title"><Truncate lines={1} ellipsis={"..." + file.name.slice(-12)}>
                          { file.name }
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
            <Card title="Basic Info" id="basic-info">
                      <CardSection>
                        <Field field={fields[57]}>
                        <Selectbox
                          helpText=""
                          label="Material Type"
                          items={typeList}
                          inputPlaceholder="Type source"
                         
                        />
                         </Field>
                        <Field field={fields[59]}>
                          <Selectbox
                            helpText=""
                            label="Secondary Type"
                            items={secondaryTypeListImage}
                            inputPlaceholder="Type source"
                          />
                        </Field>
                      </CardSection>
                    </Card>

                     <Card title="Detected Metadata" id="metadata">
                      <CardSection>
                      <div className="disabled">
                        <FieldWidgets.Text
                          label="File Name"
                          value="- -"
                          className="disabled"
                        />
                        </div>
                        <div className="disabled">
                        <FieldWidgets.Text
                          label="File Type"
                          value="- -"
                        />
                         </div>
                         <div className="disabled">
                        <FieldWidgets.Text
                          label="File Size"
                          value="- -"
                          className="disabled"
                        />
                         </div>
                        <div className="disabled">
                        <FieldWidgets.Text
                          label="Date Created"
                          value="03/19/2018"
                        />
                        </div>
                       
                      </CardSection>
                    </Card>
                    <Card title="Additional Fields" id="additional">
                      <CardSection>
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
                       <FieldWidgets.Text label="Season Number" />
                       <FieldWidgets.Text label="Description" />
                       <FieldWidgets.Text label="Uploader" />
                       <FieldWidgets.Text label="Keywords" />
                       <FieldWidgets.Text label="Production Type" />
                       <FieldWidgets.Text label="Actors" />
                       <FieldWidgets.Text label="Network" />
                       <FieldWidgets.Text label="Language" />
                       <FieldWidgets.Text label="Copyright" />
                       <FieldWidgets.Text label="Restrictions" />
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
