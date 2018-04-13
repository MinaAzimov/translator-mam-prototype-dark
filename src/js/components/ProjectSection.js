import React, { Component, PropTypes } from 'react';
import classNames from "classnames";

import ProjectItem from './ProjectItem';
import ProjectCardHeader from './ProjectCardHeader';

{ /*(!this.state.groupByStatus) ? (
  <div>
    <ProjectSection
    type="video"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
    <ProjectSection
    type="image"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
    <ProjectSection
    type="audio"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
  </div>
) : (
  <div>
    <ProjectSection
    type="needs metadata"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
    <ProjectSection
    type="ready for ingest"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
    <ProjectSection
    type="ready for service"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
    <ProjectSection
    type="search optimized"
    project={project}
    editingLocalItem={this.state.editingLocalItem}
    editExistingItem={this.editExistingItem}
    localItem={this.state.localItem}
    />
  </div>
)*/}

export default class ProjectSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true, 
    };
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

	render() {
    const { user, type, project, editingLocalItem, editExistingItem, localItem } = this.props;

    let items;

    (type == 'video') ? (
      items = project.items.filter((obj) => (obj.type == 'video/mp4' || obj.type == 'video/avi'))
    ) : null;

    (type == 'image') ? (
      items = project.items.filter((obj) => (obj.type == 'image/jpeg' || obj.type == 'image/jpg' || obj.type == 'image/png' || obj.type == 'image/svg+xml'))
    ) : null;

    (type == 'audio') ? (
      items = project.items.filter((obj) => (obj.type == 'audio/mp3'))
    ) : null;

    (type == 'needs metadata') ? (
      items = project.items.filter((obj) => (obj.inputStatus == "Needs Metadata"))
    ) : null;

    (type == 'ready for ingest') ? (
      items = project.items.filter((obj) => (obj.inputStatus == "Ready For Ingest"))
    ) : null;

    (type == 'ready for service') ? (
      items = project.items.filter((obj) => (obj.inputStatus == "Ready For Service"))
    ) : null;

    (type == 'search optimized') ? (
      items = project.items.filter((obj) => (obj.inputStatus == "Search Optimized"))
    ) : null;
		
		return (
      <div>
			{ 
        (items.length > 0) ? (<ProjectCardHeader type={type} toggleExpanded={this.toggleExpanded} expanded={this.state.expanded} numberItems={items.length}/>) : null
      }
      { (this.state.expanded) ? ( 
        items.map((item, index) =>
          <ProjectItem
          user={user}
          editingLocalItem={editingLocalItem}
          editExistingItem={editExistingItem}
          localItem={localItem}
          key={index}
          id={item.id}
          title={item.inputTitle}
          name={item.name}
          lastModified={item.lastModified}
          subtitle={item.inputSubtitle}
          type={item.type}
          img={item.img}
          size={item.size}
          item={item}
          project={project}
          ref={project}
          readyForIngest={(item.inputStatus == "Ready For Ingest" || item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
          readyForService={(item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
          searchOptimized={item.inputStatus == "Search Optimized" ? true : false }
          />
        )) : null
      }
      </div>
		)
	}
}