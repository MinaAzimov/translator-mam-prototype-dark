import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import RegistrationStatus from './RegistrationStatus';


export default class ProjectItem extends Component {



  callLocalEdit() {
    this.props.editExistingProject();            
  }


	render() {
    const { name, subtitle, type, img, editExistingItem, editingLocalItem, readyForIngest, readyForService, searchOptimized, key, id, item, project } = this.props;
		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";


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
                  <td className="library-item">
                  { 
                  (type == 'video/mp4' || type == 'video/avi') ? (
                    <img className="library-item-thumb" src={thumbSrc}/>) : (
                    <img className="library-item-thumb" src={img}/>)
                      }
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">{name}</div>
                    <div className="library-item-text">{subtitle}</div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">
                      <i className={iconClassnames}></i>
                    </div>
                  </td>
                  <td className="library-item">
                    <div className="library-item-text">
                      <RegistrationStatus
                      isReadyForIngest={readyForIngest}
                      isReadyForService={readyForService}
                      isSearchOptimized={searchOptimized}
                      /> 
                    </div>
                  </td>
                  <td className="library-item" ref={project} value={key} key={item} onClick={this.props.editExistingItem.bind(this, key, project, item)}>
                    <div className="library-item-text">
                      <i className="iconcss icon-edit" ></i>  
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