import React, { Component, PropTypes } from 'react';
import MediaOverlay from './MediaOverlay';
import { getMediaItem } from '../services/content';
import { connect } from 'react-redux';
import FileUploadProgress from './FileUploadProgress';
import moment from "moment";
import UploadCountdown from './UploadCountdown';

 function msToTime(duration) {
        var milliseconds = parseInt((duration%1000)/100)
            , seconds = parseInt((duration/1000)%60)
            , minutes = parseInt((duration/(1000*60))%60)
            , hours = parseInt((duration/(1000*60*60))%24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }


function generateThumbnail(i) {
    //generate thumbnail URL data
    var context = thecanvas.getContext('2d');
    context.drawImage(video, 0, 0, 220, 150);
    var dataURL = thecanvas.toDataURL();

    //create img
    var img = document.createElement('img');
    img.setAttribute('src', dataURL);

    //append img in container div
    document.getElementById('thumbnailContainer').appendChild(img);
}

class EditVideoThumb extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	mediaGalleryOpen: false,
      frameImgData: null,
      currFrame: 0,
      extractedVideoFrameImg: null,
      transcoding: false

    }
  }

  componentDidMount() {
    if (!this.props.upload) {
      this.refs.video.addEventListener("timeupdate", this.setSeekPosition);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.upload && !this.props.upload) {
      this.refs.video.addEventListener("timeupdate", this.setSeekPosition);
    }

  }

  openGallery = () => {
  	this.setState({
  		mediaGalleryOpen: true
  	})
  }

  closeGallery = () => {
    this.setState({
      mediaGalleryOpen: false
    })
  }

  onChooseThumbnail = (items) => {
    this.props.setVideoThumbnail(items[0].id);
    this.setState({
      mediaGalleryOpen: false
    })
  }

  deleteThumbnail = () => {
    if (this.state.extractedVideoFrameImg) {
      this.setState({
        extractedVideoFrameImg: null
      })
    }
    this.props.setVideoThumbnail(null);
  }

  setSeekPosition = () => {
    this.setState({
      currFrame: this.refs.video.currentTime
    })
  }

  generateThumbnailFromVideo = () => {
      //generate thumbnail URL data
      var thecanvas = this.refs.canvas;
      var video = this.refs.video;
      var context = thecanvas.getContext('2d');
      context.drawImage(video, 0, 0, 300, 168);
      var dataURL = thecanvas.toDataURL();

      this.setState({
        extractedVideoFrameImg: dataURL
      });
      this.props.setVideoThumbnail(null);
  }

  onHitTranscode = () => {
    this.setState({
      transcoding: true
    })
  }



  render () {


    let { upload } = this.props;
    const { filename, videoThumbMediaItem } = this.props.videoItem;
    const { mediaGalleryOpen, currFrame, extractedVideoFrameImg } = this.state;

    let videoThumbSrc, timeRemaining;
    if (videoThumbMediaItem !== undefined && videoThumbMediaItem !== null) {
      let videoThumbItem = getMediaItem(videoThumbMediaItem);
      videoThumbSrc = videoThumbItem ? videoThumbItem.filename : "";
    }
    else {
      videoThumbSrc = extractedVideoFrameImg;
    }

    if (upload) {
      let d = Date.now() - upload.startedAt;
      timeRemaining = moment.utc(d).format("mm:ss");
    }

  	return (
      <div className="media-edit__video-preview">
        {
          upload ?
              <div className="media-edit__video-upload">
                <div className="media-edit__video-upload-inner">
                  <div className="media-edit__video-upload-msg">
                    {
                      this.state.transcoding ?
                        <span>Transcoding </span>
                      :
                        <span>Uploading </span> 
                    }
                    video (Est. <UploadCountdown timeout={20000} startedAt={upload.startedAt} onHitTranscode={this.onHitTranscode} /> remaining)
                  </div>
                  <FileUploadProgress timeout={20000} startedAt={upload.startedAt} />
                </div>
              </div>
          :
            null
        }
        <div className="media-edit__video-container">
          <canvas ref="canvas" style={{display:"none"}} />
          {
            !upload ?
              <video src={filename} controls ref="video"></video>
            :
              null
          }

          <div className="media-edit__video-thumb-under">
            <h3 className="image-effects__group-title">Video thumbnail</h3>
            <button className={'button_style_outline-white' + (upload ? ' disabled' : '')} onClick={this.generateThumbnailFromVideo}>
              Use current frame ({msToTime(currFrame*1000)})
            </button>
            <button className='button_style_outline-white' onClick={this.openGallery}>
              Add from library
            </button>
            <button className='button_style_outline-white' onClick={this.openGallery}>
              Upload
            </button>
          </div>
          <div className="media-edit__video-thumb">
            {
              videoThumbSrc ?
                <div>
                  <img src={videoThumbSrc} />
                </div>
              :
                <div>
                  <div className="media-edit__no-thumb">
                    No thumbnail chosen
                  </div>
                </div>
            }
          </div>
        </div>
        <MediaOverlay
          show={mediaGalleryOpen}
          onClose={this.closeGallery}
          onSubmit={this.onChooseThumbnail}
          multi={false}
          allowEdit={false}
          title="Select Video Thumbnail"
          saveCaption="Save video thumbnail"
          imageOnly={true}
        />
      </div>
  	)
  }
}


export default connect((state, ownProps) => {
  let upload = state.uploads ? state.uploads.find(upload => upload.mediaItemId === ownProps.videoItem.id) : undefined;
  return {
    upload: upload
  }
})(EditVideoThumb);

