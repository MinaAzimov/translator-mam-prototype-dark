import React, { Component, PropTypes } from 'react';


export default class ProjectCardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true, 
    };
  }

	render() {
    const { type } = this.props;
		
		return (
			{ (project.items.filter((obj) => obj.type == 'video').length > 0) ? (
        <ProjectCardHeader type='Video'/>
      ) : null
      }
      { 
        project.items
          .filter((obj) =>
            obj.type == 'video'
          )
          .map((item, index) =>
            <ProjectItem
            //editingLocalProject={this.state.editingLocalProject}
            //editExistingProject={this.editExistingProject}
            key={index}
            name={item.name}
            subtitle={item.subtitle}
            type={item.type}
            img={item.img}
            readyForIngest={item.readyForIngest}
            readyForService={item.readyForService}
            searchOptimized={item.searchOptimized}
            />
          )
      }
		)
	}
}