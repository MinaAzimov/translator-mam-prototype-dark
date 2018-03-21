import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { mediaLicenseOpen } from './../actions/media-license';
import FileUploadProgress from './FileUploadProgress';
import MediaEditOverlay from './MediaEditOverlay';
import { getMediaItem } from '../services/content';
import { getSize, getExpiration } from '../services/media';

import moment from 'moment'
import { 
  LAST_USED_FORMAT,
  EXPIRATION_FORMAT,
  GETTY,
  GETTY_OPTIONS,
  GETTY_PLACEHOLDERS,
  AP,
  AP_OPTIONS,
  AP_PLACEHOLDERS,
  REUTERS,
  REUTERS_ONETIME,
  REUTERS_PREMIUM,
  REUTERS_PLACEHOLDERS
} from '../constants/media';
import { Image } from './ImageEdit';

const defaultOnClick = () => {};
class MediaPreviewItem extends Component {
  static propTypes = {
    children: PropTypes.any,
    mediaLicenseOpen: PropTypes.func,
    id: PropTypes.number,
    type: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.string,
    tag: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    source: PropTypes.string,
    filename: PropTypes.string,
    licensed: PropTypes.bool,
    lastused: PropTypes.string,
    onetime: PropTypes.bool,
    premium: PropTypes.bool,
    editable: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: defaultOnClick,
    className: '',
    editable: true
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  onSubmit = (media) => {
    if (this.props.onSubmit) {
      this.props.onSubmit(media);
    }
    this.closeEditOverlay()
  }

  closeEditOverlay = () => {
    this.setState({
      isEditing: false
    });
    if (this.props.onCloseEdit) {
      this.props.onCloseEdit();
    }
  }

  openEditOverlay = (e) => {
    e.stopPropagation();
    this.setState({
      isEditing: true
    });
    if (this.props.onOpenEdit) {
      this.props.onOpenEdit();
    }
  };

  canLicense = () => {
    return [AP, GETTY, REUTERS].indexOf(this.props.source) !== -1;
  };

  isLicensed = () => {
    return this.props.licensed;
  };

  license = (e) => {
    switch (this.props.source) {
      case AP:
        this.props.mediaLicenseOpen(this.props.id, AP_PLACEHOLDERS);
        break;
      case GETTY:
        this.props.mediaLicenseOpen(this.props.id, GETTY_PLACEHOLDERS);
        break;
      case REUTERS:
      {
        const licensing_info = this.props.onetime ?
          'One-time use' :
          'Premium use';
        const placeholders = {
          ...REUTERS_PLACEHOLDERS,
          licensing_info: REUTERS_PLACEHOLDERS.licensing_info + licensing_info
        };
        this.props.mediaLicenseOpen(this.props.id, placeholders);
        break;
      }
    }
    e.stopPropagation();
  };

  displayLicense = () => {
    let view = null;

    if (this.props.licensed) {
      switch (this.props.source) {
        case AP:
        {
          const expiration = getExpiration(this.props);
          view = (<div>
            <span className="file-preview__license-info file-preview__expiration">Expires: {expiration}</span>
            <span className="file-preview__licensed">©</span>
          </div>);
          break;
        }
        case GETTY:
        {
          const licenseSize = getSize(this.props);
          view = (<div>
            <span className="file-preview__license-info file-preview__size">Size: {licenseSize}</span>
            <span className="file-preview__licensed">©</span>
          </div>);
          break;
        }
        case REUTERS:
        {
          const licenseType = this.props.onetime ? REUTERS_ONETIME : (this.props.premium ? REUTERS_PREMIUM : '');
          view = licenseType ? (<div>
            <span className="file-preview__license-info file-preview__license-type">Type: {licenseType}</span>
            <span className="file-preview__licensed">©</span>
          </div>) : view;
          break;
        }
      }
    }

    return view;
  };

  getIconClass = () => {
    switch(this.props.type) {
      case 'image':
        return 'fa-camera';
      case 'video':
        return 'fa-video-camera';
      case 'chart':
        return 'fa-pie-chart';
      case 'audio':
        return 'fa-volume-up';
    }
    return '';
  };

  getSourceIconClass = () => {
    switch(this.props.source) {
      case AP:
        return 'file-preview__ap-icon';
      case GETTY:
        return 'file-preview__getty-icon';
      case REUTERS:
        return 'file-preview__reuters-icon';
    }
    return '';
  };

  render () {

    console.log("Rendering preview item, is editable?", this.props.editable);

    // Any property of the media item will be available
    const { title, slug, filename, onClick, className, editable, id, upload, type } = this.props;

    const section = this.props.section ? this.props.section.title : "Markets";

    let thumbSrc;
    if (type === "image" || type === "chart") {
      thumbSrc = filename;
    }
    else if (type === "video") {
      let videoThumbMediaItem = this.props.videoThumbMediaItem;
      if (videoThumbMediaItem !== undefined && videoThumbMediaItem !== null) {
        thumbSrc = getMediaItem(videoThumbMediaItem).filename;
      }
      else {
        thumbSrc = "/assets/img/icons/video-placeholder.jpg";
      }
    }

    return (
      <div onClick={onClick} className={`file file--modal file_type_img file_view_grid ${className}`}>
        <div className="hidden file__id">{ slug }</div>
        <div className="file__img">
          <div className="file__controls">
            { 
              upload ?
                <div className="file__uploading-msg">
                  <img src={thumbSrc} />
                  <span>Uploading { type }...</span>
                }
                </div>
              :
              	<Image src={thumbSrc} media={this.props} />
            }

            <div className="file__overlay">
              {
                editable ? 
                  <button onClick={this.openEditOverlay} className="button button_style_outline-white file__edit-button">Edit</button>
                :
                  null
              }
            </div>
            <i className={`file-preview__source-icon ${this.getSourceIconClass()}`}></i>
            {onClick !== defaultOnClick && <div className="file__checkmark"></div>}
            <div className="file__type">
              <i className={`fa ${this.getIconClass()}`}></i>
            </div>
            {!this.isLicensed() && this.canLicense() &&
              <button onClick={this.license} className="button_style_outline-white file__license-button">©</button>
            }
            {this.displayLicense()}
            { 
              upload ?
                <FileUploadProgress timeout={20000} startedAt={upload.startedAt} />
              :
                null
            }            
          </div>
        </div>
        {this.props.slug && !this.props.showDetail && <div className="file__title">{ slug }</div>}
        {
          this.props.showDetail ? (
            <div className="file__details">
              <div className="file__details-section">{section}</div>
              <div className="file__details-length">11:00</div>
              <div className="file__details-title">{title}</div>
              <div className="file__details-slug">{slug}</div>
            </div>
          )
          :
          null
        }
        <div>
          {this.props.children || null}
        </div>
        <MediaEditOverlay 
          show={this.state.isEditing}
          editMediaIds={[this.props.id]} 
          onSubmit={this.onSubmit}
          onClose={this.closeEditOverlay}
        />
      </div>);
  }
}

export default connect((state, ownProps) => {
  let upload = state.uploads ? state.uploads.find(upload => upload.mediaItemId === ownProps.id) : undefined;
  return {
    upload: upload
  }
}, { mediaLicenseOpen })(MediaPreviewItem);









