import React, { Component, PropTypes } from 'react';
import SlideDown from './SlideDown';
import { connect } from 'react-redux';
import { getMediaItem } from '../services/content';


class SocialMediaPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

	render() {
    let mediaItemSrc;
    
    let promoMediaItem = this.props.mediaItems.filter((item) => {
      return (item.usage && item.usage.id === 0);
    })

    if (promoMediaItem.length > 0) {
      mediaItemSrc = getMediaItem(promoMediaItem[0].mediaId).filename;
    }

    let { ogTitle, ogDescription, post } = this.props;

    return (
      <div>
        {
          (()=>{
            switch (this.props.type) {

              case "facebook":
                return (
                  <div className="social-preview facebook">
                    <div className="facebook-user">
                      <img src="/assets/img/avatar/cnbc.jpg" className="avatar" />
                      <div className="facebook-user-info">
                        <div className="facebook-username">CNBC</div>
                        <div className="facebook-time">18 min - <span className="iconcss icon-globe"></span></div>
                      </div>
                    </div>
                    <div className="facebook-content">
                      <div className="facebook-post">{ this.props.title }</div>
                      <div className="facebook-summary">

                          {
                            mediaItemSrc ?
                              <div className="facebook-img">
                                <img src={mediaItemSrc} />
                              </div>
                            :
                              null
                          }
                        <div className="facebook-summary-content">
                          <div className="facebook-summary-title">{ this.props.pageTitle }</div>
                          <div className="facebook-summary-description">{ this.props.description }</div>
                          <div className="facebook-summary-source">CNBC.com | BY CNBC</div>
                        </div>
                      </div>
                      <div className="facebook-share-bar">
                        <div className="facebook-share-emoji">
                          <img src="/assets/img/icons/emoji-1.svg" className="emoji" />
                          <div className="facebook-share-count"> 52</div>
                        </div>
                        <div className="facebook-share-info">
                          <div className="facebook-share-info-item">
                            <div className="facebook-share-count">25 Comments</div>
                          </div>
                          <div className="facebook-share-info-item">
                            <div className="facebook-share-count"> 12 Share</div>
                          </div>
                        </div>
                      </div>
                      <div className="facebook-action-bar">
                        <div className="facebook-action-item">
                          <i className="iconcss icon-facebook-like" />
                          <div className="facebook-action-item-title">Like</div>
                        </div>
                        <div className="facebook-action-item">
                          <i className="iconcss icon-facebook-comment" />
                          <div className="facebook-action-item-title">Like</div>
                        </div>
                        <div className="facebook-action-item">
                          <i className="iconcss icon-facebook-reply" />
                          <div className="facebook-action-item-title">Like</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              case "twitter":
                return (
                  <div className="social-preview twitter">
                    <div className="twitter-user">
                      <img src="/assets/img/avatar/cnbc.jpg" className="avatar" />
                    </div>
                    <div className="twitter-content">
                      <div className="twitter-header">
                        <div className="twitter-username">CNBC</div>
                        <div className="twitter-handle">@CNBC</div>
                        <div className="twitter-time">- 20m</div>
                      </div>
                      <div className="twitter-post">{ post }</div>
                      <div className="twitter-summary">

                          {
                            mediaItemSrc ?
                              <div className="twitter-img">
                                <img src={mediaItemSrc} />
                              </div>
                            :
                              null
                          }
                        <div className="twitter-summary-content">
                          <div className="twitter-summary-title">{ ogTitle }</div>
                          <div className="twitter-summary-description">{ ogDescription }</div>
                          <div className="twitter-summary-source">CNBC.com</div>
                        </div>
                      </div>
                      <div className="twitter-actions">
                        <div className="twitter-action-item">
                          <i className="iconcss icon-twitter-reply" />
                          <div className="twitter-action-count">5</div>
                        </div>
                        <div className="twitter-action-item">
                          <i className="iconcss icon-twitter-retweet" />
                          <div className="twitter-action-count">8</div>
                        </div>
                        <div className="twitter-action-item">
                          <i className="iconcss icon-twitter-like" />
                          <div className="twitter-action-count">2</div>
                        </div>
                        <div className="twitter-action-item">
                          <i className="iconcss icon-twitter-more" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
                case "linkedin":
                return (
                  <div className="social-preview linkedin">
                    <div className="linkedin-post"><span>cnbc</span> { this.props.description }</div>
                    {
                      mediaItemSrc ?
                        <div className="linkedin-img">
                          <img src={mediaItemSrc} />
                        </div>
                      :
                        null
                    }
                    <div className="linkedin-action-bar">
                      <div className="linkedin-action-item">Like (37)</div>
                      <div className="linkedin-action-item">Comment</div>
                      <div className="linkedin-action-item">Share</div>
                      <div className="linkedin-action-item">4 hours ago</div>
                    </div>
                    <div className="linkedin-likes">
                      <i className="iconcss icon-linkedin-like" />
                      <div className="linkedin-like-text"><span>John Smith,</span> <span>Julie Greene</span> +16</div>
                    </div>
                    <div className="linkedin-comments">
                      <textarea rows="4" cols="50" placeholder="Add a comment..." className="comment-input"></textarea>
                    </div>
                  </div>
                )

              default:
                return null;
            }
          })()
        }
      </div>
    )
	}
}



const mapStateToProps = (state) => {
  return {
    pageTitle: state.fields[0].value,
    description: state.fields[7].value,
    mediaItems: state.fields[16].value,
  }
}

export default connect(mapStateToProps)(SocialMediaPreview);
