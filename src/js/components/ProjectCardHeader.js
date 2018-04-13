import React, { Component, PropTypes } from 'react';
import classNames from "classnames";


export default class ProjectCardHeader extends Component {


	render() {
    const { type, toggleExpanded, expanded, numberItems } = this.props;
		
    const classname = classNames({
      'library-header': true,
      'library-header--expanded': expanded,
    })

		return (
			<div className={classname}>
          <div className="library-header-row">
            <div onClick={() => toggleExpanded()} className="library-item library-item--thumb library-header-item item-clickable">{type} ({numberItems}) <i className="iconcss icon-line-arrow-up"></i></div>                  
            <div className="library-item library-item--title library-header-item">Title / Filename</div>
            <div className="library-item library-item--owner library-header-item">Owner</div>
            <div className="library-item library-item--date library-header-item">Uploaded <i className="iconcss icon-last-modified"></i></div>
            <div className="library-item library-item--date library-header-item">Modified <i className="iconcss icon-last-modified"></i></div>
            <div className="library-item library-item--size library-header-item">Size</div>
            <div className="library-item library-item--type library-header-item">Type</div>
            <div className="library-item library-item--status library-header-item">Status</div>
            <div className="library-item library-item--edit library-header-item">Edit</div>
          </div>
        </div>
		)
	}
}