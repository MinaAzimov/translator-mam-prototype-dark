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
import {
  GETTY,
  AP,
  REUTERS,
  CNBC
} from '../constants/media';
import Prompt from './Prompt';
import { IMAGE_STYLES } from '../constants/image-styles';
import TagsInput from './form/TagsInput';
import Selectbox from './form/Selectbox';
import { getContentItems } from "../services/content";


const sectionItems = getContentItems();

const MODE_FOCAL_POINT = 'focal-point';
const MODE_FOCAL_RECTANGLE = 'focal-rectangle';
const MODE_IMAGE_EDIT = 'image-edit';
const MODE_CROP = 'image-crop';

const SOURCES = [
  CNBC,
  GETTY,
  AP,
  REUTERS,
];
const SOURCES_OPTIONS = SOURCES.map(source => ({id: source, title:source, subtitle: '', disabled: false}));
















class MediaEditOverlay extends Component {

  static propTypes = {
    editMediaIds: PropTypes.array,
    mediaItems: PropTypes.array,
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    show: true,
    onClose: () => {},
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);
    const media = props.mediaItems.find(media => media.id === props.editMediaIds[0]);
    this.state = {
      mode: '',
      changed: false,
      showPrompt: false,
      selectedImageStyle: null,
      media: media
    };
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.media);
    socket.emit("UPDATE_MEDIA_ITEM", this.state.media);
    this.setState({
      mode: ''
    });
  };

  onClose = () => {
    if (!this.state.changed) {
      this.props.onClose && this.props.onClose();
      this.setState({
        mode: ''
      });
    } else {
      this.setState({
        showPrompt: true
      });
    }
  };

  onPromptCancel = () => {
    this.setState({
      showPrompt: false,
    });
  };

  onPromptOk = () => {
    this.setState({
      showPrompt: false
    });
    this.props.onClose && this.props.onClose();
  };

  onFieldChanged = (field, value) => {
    console.log("updating field", field, value);
    const { media } = this.state;
    media[field] = value;
    this.setState({
      media,
      changed: true
    });
  };

  injectMediaItem(item) {
    this.setState({
      media: item,
      changed: false
    });
  }

  setMode = (mode) => {
    if (this.state.mode === mode) {
      this.setState({
        mode: ''
      });
    } else {
      this.setState({
        mode,
        selectedImageStyle: mode === MODE_FOCAL_RECTANGLE ? IMAGE_STYLES[0] : undefined
      });
    }
  };

  getTags = () => {
    let tags = [];
    this.props.mediaItems.map(media => tags = tags.concat(media.tag));
    // remove empty
    tags = tags.filter(val => !!val);
    // remove duplicates
    return tags.reduce(function(accum, current) {
      if (accum.indexOf(current) === -1) {
        accum.push(current);
      }
      return accum;
    }, []);
  };

  onImageStyleSelect = (imageStyle) => {
    this.setState({
      selectedImageStyle: imageStyle
    });
  };

  getModeBody = () => {
    let body = null;
    switch (this.state.mode) {
      case MODE_FOCAL_RECTANGLE:
      case MODE_FOCAL_POINT:
        body = <CropsPreview
          media={this.state.media}
          onStyleSelect={this.onImageStyleSelect}
          selectedId={this.state.selectedImageStyle && this.state.selectedImageStyle.id}
        />;
        break;
      case MODE_IMAGE_EDIT:
      {
        body = <ImageEditControls
          effects={this.state.media.effects}
          key="image-edit"
          onChange={this.onFieldChanged.bind(this, 'effects')}
        />;
        break;
      }
    }

    return body;
  };

  setVideoThumbnail = (mediaItemId) => {
    this.setState({
      changed: true,
      media: {
        ...this.state.media,
        videoThumbMediaItem: mediaItemId
      }
    });
  }

  onSaveCrop = () => {
    this.setState({
      mode: ''
    });
  }

  getFocalPoint = () => {
    return this.state.media && this.state.media.focalPoint || { x: 50, y: 50 };
  };

  setFocalPoint = (focalPoint) => {
    this.setState({
      changed: true,
      media: {
        ...this.state.media,
        focalPoint
      }
    });
  };
  
  setFocalRectangle = (focalPoint) => {
    if (this.state.selectedImageStyle) {
      const imageStyle = this.state.selectedImageStyle;
      const focalRectanglePositions = this.state.media.focalRectanglePositions || {};
      focalRectanglePositions[imageStyle.id] = focalPoint;
      this.setState({
        changed: true,
        media: {
          ...this.state.media,
          focalRectanglePositions
        }
      });
    }
  };

  getFocalRectangleStart = (imageStyle) => {
    return this.state.media &&
      (this.state.media.focalRectanglePositions && this.state.media.focalRectanglePositions[imageStyle.id])
      || this.state.media.focalPoint
      || {x: 0, y: 0}; // default
  };

  modalBody = () => {
    if (!this.state.media) {
      return;
    }

    const {
      slug,
      title,
      caption,
      description,
      creator,
      tag,
      source,
      filename,
      width,
      height,
      type,
      effects,
      videoThumbSrc,
      section
      } = this.state.media;

    const isVideo = type === "video";
    const isImage = type === "image";
    const size = getSize(this.state.media);
    const expiration = getExpiration(this.state.media);
    
    return <div backdrop="static">
      {         
        isImage ? 
          <div className={`media-edit__image-preview mode--${this.state.mode}`}>
            
            {
              this.state.mode !== MODE_CROP ? (
                <div className="media-edit__image-preview--inner">
                  <div className="media-edit__image-container">
                    <div className="media-edit__image-inner">
                    <div className="media-edit__top">
                      <button
                        className={'button button_style_outline-white'}
                        onClick={this.setMode.bind(this, MODE_CROP)}
                      ><i className="fa fa-crop"></i></button>
                    </div>
                      <div className="media-edit__image-img">
                        <Image src={filename} media={this.state.media} />
                      </div>
                      {this.state.mode === MODE_FOCAL_POINT &&
                        <FocalPoint onChange={this.setFocalPoint} initialValue={this.getFocalPoint()}/>
                      }
                      {this.state.mode === MODE_FOCAL_RECTANGLE && this.state.selectedImageStyle &&
                        <FocalRectangle
                          key={`imageStyle${this.state.selectedImageStyle.id}`}
                          onChange={this.setFocalRectangle}
                          start={this.getFocalRectangleStart(this.state.selectedImageStyle)}
                          dimensions={{
                            width: this.state.selectedImageStyle.width,
                            height: this.state.selectedImageStyle.height
                          }}
                        />
                      }
                    </div>
                  </div>
                  <div className="media-edit__image-modes">
                    <button
                      className={`button ${this.state.mode === MODE_FOCAL_POINT ? 'button_style_fill-accent' : 'button_style_outline-white'}`}
                      onClick={this.setMode.bind(this, MODE_FOCAL_POINT)}
                    >Focal Point</button>
                    <button
                      className={`button ${this.state.mode === MODE_FOCAL_RECTANGLE ? 'button_style_fill-accent' : 'button_style_outline-white'}`}
                      onClick={this.setMode.bind(this, MODE_FOCAL_RECTANGLE)}
                    >Focal Rectangle</button>
                    <button
                      className={`button ${this.state.mode === MODE_IMAGE_EDIT ? 'button_style_fill-accent' : 'button_style_outline-white'}`}
                      onClick={this.setMode.bind(this, MODE_IMAGE_EDIT)}
                    >Image Edit</button>
                  </div>
                  <div className="media-edit__mode-dashboard">
                    {this.getModeBody()}
                  </div>
                </div>
              )
              :
              <div className="crop-container">
                <div className="crop-container__header">
                  <h4>Crop Image</h4>
                  <button type="button" onClick={this.onSaveCrop} className="modal-close" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div>
                  <Cropper imgSrc={filename}/>
                </div>
              </div>
            }
          </div>
        :
          null
      }
      {
        isVideo ?
          <EditVideoThumb videoItem={this.state.media} setVideoThumbnail={this.setVideoThumbnail}  />
        :
          null
      }
      <div className="media-edit__metadata form-dark-theme">
        <h2 className="media-edit__fields-header">Metadata</h2>
        <div className="media-edit__field-group">
          <div className="field__group-wrapper">
            <Text
              onChange={this.onFieldChanged.bind(this, 'slug')}
              value={slug}
              label="Slug"
            />
          </div>
          <div className="field__group-wrapper">
            <Text
              onChange={this.onFieldChanged.bind(this, 'title')}
              value={title}
              label="Title"
            />
          </div>
          <div className="field__group-wrapper">
            <Text
              onChange={this.onFieldChanged.bind(this, 'description')}
              value={description}
              label="Description"
            />
          </div>
          <div className="field__group-wrapper">
            <Text
              onChange={this.onFieldChanged.bind(this, 'caption')}
              value={caption}
              label="Caption"
            />
          </div>
          <div className="field__group-wrapper">
            <Text
              onChange={this.onFieldChanged.bind(this, 'creator')}
              value={creator}
              label="Creator"
            />
          </div>

          <div className="field__group-wrapper">
            <Selectbox
              onChange={this.onFieldChanged.bind(this, 'section')}
              value={section}
              helpText="" 
              label="Section" 
              items={sectionItems}
              search={true}
              allowCustomText={false}
              showComplex={true}
              inputPlaceholder="Start typing the title of the content item"/>

          </div>

          <div className="field__group-wrapper">
            <TagsInput
              onChange={this.onFieldChanged.bind(this, 'tag')}
              options={this.getTags()}
              value={tag}
              label="Tags"
              selectProps={{placeholder: ''}}
            />
          </div>
          <div className="field_read-only">
            <div>Source</div>
            <div>{source}</div>
          </div>
          <div className="field_read-only">
            <div>Source Filename</div>
            <div>{filename.split('/').pop()}</div>
          </div>
          <div className="field_read-only">
            <div>Width</div>
            <div>{width}</div>
          </div>
          <div className="field_read-only">
            <div>Height</div>
            <div>{height}</div>
          </div>
          {
            size ?
              <div className="field_read-only">
                <div>Size</div>
                <div>{size}</div>
              </div>
            : 
              null
          }
          {
            expiration ?
                <div className="field_read-only">
                  <div>Expires</div>
                  <div>{expiration}</div>
                </div>
              : 
                null              
          }
               

          {
            isVideo ?
              <div className="field__group-wrapper">
                <div className="field_read-only">
                  <div>Length</div>
                  <div>12:22</div>
                </div>
              </div>    
            :
              null        
          }
        </div>
      </div>
    </div>;
  };

  render() {

    const { filename } = this.state.media;
    const { show } = this.props;

    return (
      <div className="media-overlay media-overlay--show">
        <BaseModal 
          show={show} 
          onHide={this.props.onClose} 
          dialogClassName="cnbc-modal modal--media-edit" 
          bsClass="media-edit-overlay"
          transition={SlideIn}
          containerClassName="modal-container-slider">
          <div className="modal-main">
            <div className="modal-top">
              <h4 className="modal-title">Edit media item</h4>
            </div>

            <button type="button" onClick={this.props.onClose} className="modal-close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            {this.modalBody()}

            <div className="modal-bottom-cta">
              <button className="button button_style_fill-accent" onClick={this.onSubmit}>Save</button>
              <button className="button button_style_fill-accent" onClick={this.onSubmit}>Save as new</button>
              <button className="button button_style_outline-white" onClick={this.onClose}>Cancel</button>
            </div>
          </div>
        </BaseModal>

        <Prompt
          show={this.state.showPrompt}
          onCancel={this.onPromptCancel}
          onSubmit={this.onPromptOk}
          header={<h2 className="licensing-popup__title">Cancel Changes?</h2>}
          cancelText="Nevermind"
          submitText="Yes, cancel"
        >
          <h3 className="licensing-popup__info">Any unsaved changes you made will be lost. Are you sure you want to cancel?</h3>
        </Prompt>
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  return {
    mediaItems: state.fields[15].value
  }
})(MediaEditOverlay);

