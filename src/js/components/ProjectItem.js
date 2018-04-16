import React, { Component, PropTypes } from 'react';
import classNames from "classnames";
import moment from "moment";

import RegistrationStatus from './RegistrationStatus';


export default class ProjectItem extends Component {

  callLocalEdit() {
    this.props.editExistingProject();            
  }

  formatBytes = (a,b) => {
    if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]
  }


	render() {
    const { user, name, subtitle, type, img, editExistingItem, editingLocalItem, readyForIngest, readyForService, searchOptimized, key, id, item, project, title, size, lastModified, shellType } = this.props;
		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
    const shellSrc = "/assets/img/icons/shell-placeholder.jpg";


    const iconClassnames = classNames({
      'iconcss': true,
      'icon-type-video': (type == 'video/mp4') || (type == 'video/avi'),
      'icon-type-image': (type == 'image/jpeg') || (type == 'image/jpg') || ( type =='image/png') || ( type =='image/svg+xml'),
      'icon-type-audio': type == 'audio/mp3'
    })
		
    return (
			<div className="library-container">
        <div className="library-pagination-bar">
          <table className="library-table">
            <tbody>
              <tr className="library-item-row" >
                <td className="library-item library-item--thumb">
                { 
                type == 'video/mp4' && shellType !== 'shell'  ? 
                  <img className="library-item-thumb" src={thumbSrc}/> : 
                  shellType == 'shell' ? <img className="library-item-thumb" src={shellSrc}/> :
                  <img className="library-item-thumb" src={img}/>
                    }
                </td>
                <td className="library-item library-item--title">
                  <div className="library-item-text">{title}</div>
                  <div className="library-item-text">{name}</div>
                </td>
                <td className="library-item library-item--owner">
                  <div className="library-item-text">{user.name}</div>
                </td>
                <td className="library-item library-item--date">
                  <div className="library-item-text">{moment(lastModified).format("MMM D")}</div>
                </td>
                <td className="library-item library-item--date">
                  <div className="library-item-text">{moment(lastModified).format("MMM D")}</div>
                </td>
                <td className="library-item library-item--size">
                  <div className="library-item-text">{this.formatBytes(size)}</div>
                </td>
                <td className="library-item library-item--type">
                  <div className="library-item-text">
                    <i className={iconClassnames}></i>
                  </div>
                </td>
                <td className="library-item library-item--status">
                  <div className="library-item-text">
                    <RegistrationStatus
                    isReadyForIngest={readyForIngest}
                    isReadyForService={readyForService}
                    isSearchOptimized={searchOptimized}
                    /> 
                  </div>
                </td>
                <td className="library-item library-item--edit" ref={project} value={key} key={item} onClick={this.props.editExistingItem.bind(this, key, project, item)}>
                  <div className="library-item-text">
                    <i className="iconcss icon-edit"></i>  
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
		)
	}
}