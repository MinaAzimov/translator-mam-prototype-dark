 import React, { Component, PropTypes } from 'react';


export default class ProjectCardHeader extends Component {


	render() {
    const { type } = this.props;
		
		return (
			<thead className="library-header">
                <tr className="library-header-row">
                  <th className="library-item library-header-item">{type} <i className="iconcss icon-line-arrow-up"> </i></th>                  
                  <th className="library-item library-header-item">Title / Description</th>
                  <th className="library-item library-header-item">Type</th>
                  <th className="library-item library-header-item">Status</th>
                  <th className="library-item library-header-item">Edit</th>
                </tr>
              </thead>
		)
	}
}