import React, { Component, PropTypes } from 'react';
import Chat from './Chat';
import BaseLayout from './BaseLayout';
import Field from './Field';
import ProjectItem from './ProjectItem';
import ProjectCardHeader from './ProjectCardHeader';
import TaskList from './TaskList';
import TaskCreator from './TaskCreator';
import SelectRepeater from './form/SelectRepeater';
import Selectbox from './form/Selectbox';
import TextArea from './form/TextArea';
import FieldWidgets from './form/FieldWidgets';
import EditPageHeader from './EditPageHeader';
import RTEditor from './RTEditor';
import MediaCard from './MediaCard';
import Switch from './form/Switch';
import SocialMediaPreview from './SocialMediaPreview';
import PageTitle from './PageTitle';
import Dropzone from './Dropzone';
import { Card, CardSection, CardBoard } from './Card';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import TagsInput from "./form/TagsInput";
import moment from "moment";
import axios from 'axios';

import projectsFolake from '../../../mock/folake.json';
import projectsCharlotte from '../../../mock/charlotte.json';
import projectsDanielle from '../../../mock/danielle.json';
import projectsJenny from '../../../mock/jenny.json';
import projectsLuke from '../../../mock/luke.json';
import projectsMatthew from '../../../mock/matthew.json';
import projectsMia from '../../../mock/mia.json';
import projectsReed from '../../../mock/reed.json';

import projectsHiddenFolake from '../../../mock/hiddenProjects/folakeHidden.json';
import projectsHiddenCharlotte from '../../../mock/hiddenProjects/charlotteHidden.json';
import projectsHiddenDanielle from '../../../mock/hiddenProjects/danielleHidden.json';
import projectsHiddenJenny from '../../../mock/hiddenProjects/jennyHidden.json';
import projectsHiddenLuke from '../../../mock/hiddenProjects/lukeHidden.json';
import projectsHiddenMatthew from '../../../mock/hiddenProjects/matthewHidden.json';
import projectsHiddenMia from '../../../mock/hiddenProjects/miaHidden.json';
import projectsHiddenReed from '../../../mock/hiddenProjects/reedHidden.json';

import projects from '../../../mock/projects.json';

import DropzoneComponent from 'react-dropzone-component';

import NotifyButton from "./NotifyButton";

import { ReduxFormFieldSimpleReactDropzone } from 'simple-react-dropzone';

import $ from "jquery";


const hiddenProjects = {
  "projects": [
    {
      "title": "12 Monkeys Season 4 Promo",
      "items": [
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "video",
          "readyForIngest": true,
          "readyForService": true,
          "searchOptimized": false,
          "lastEditedBy": "Mia Butera",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_s4_promo1.png",
          "height": 760,
                    "width": 1280,
                    "id": 1,
        },
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "video",
          "readyForIngest": false,
          "readyForService": false,
          "searchOptimized": false,
          "lastEditedBy": "Grecia Lopez",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_s4_promo2.png",
          "height": 760,
                    "width": 1280,
                    "id": 3
        },
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "image",
          "readyForIngest": false,
          "readyForService": false,
          "searchOptimized": false,
          "lastEditedBy": "Lova Yazdani",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_gallery_309Recap_02.jpg",
          "height": 760,
                    "width": 1280,
                    "id": 2

        },
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "image",
          "readyForIngest": false,
          "readyForService": false,
          "searchOptimized": false,
          "lastEditedBy": "Grecia Lopez",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_gallery_309Recap_04.jpg",
          "height": 760,
                    "width": 1280,
                    "id": 4
        },
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "image",
          "readyForIngest": false,
          "readyForService": false,
          "searchOptimized": false,
          "lastEditedBy": "Grecia Lopez",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_gallery_309Recap_05.jpg",
          "height": 760,
                    "width": 1280,
                    "id": 5
        },
        {
          "name": "12 Monkeys Gallery Wrap Up",
          "subtitle": "12 Monkeys Season 4 Promotional Material",
          "type": "image",
          "readyForIngest": false,
          "readyForService": false,
          "searchOptimized": false,
          "lastEditedBy": "Grecia Lopez",
          "lastEditedOn": "03/15/18 at 02:15 PM",
          "lastModified": 1496769563000,
          "size": 1523232,
          "img": "/assets/img/syfy/12-monkeys-season-4/12Monkeys_gallery_309Recap_07.jpg",
          "height": 760,
                    "width": 1280,
                    "id": 7
        }
      ]
    }
  ]
}




const allItems = getContentItems();
const franchiseItems = getContentItems("franchise");
const templateItems = getContentItems("template");
const skinItems = getContentItems("skin");
const sourceItems = getContentItems("source");

const primaryAssetTypes = [
 "franchise", "person", "company", "security", "place"
]

const primaryAssetItems = allItems.filter(item => {
  return primaryAssetTypes.indexOf(item.type) !== -1;
});


class RegisterContent extends Component {

  constructor(props) {
        super(props);
        this.state = {
          dropZoneShow: false,
          cardBoardShow: true,
          libraryFiltersHide: false,
          editingLocalProject: false,
          projects: projects.projects,
          showHiddenProject: false,
          hiddenProjects: hiddenProjects.projects,
          resetNewProject: false
        }
      
    }

  componentDidMount() {
    // This code should eventually be replaced
    $('.favorite-page').click( function() {
      $(this).toggleClass("active");
    });

  }

  componentWillMount() {

    if(this.props.client.user.name == "Folake Ayiloge") {
      this.setState({hiddenProjects: projectsHiddenFolake.projectsHiddenFolake,
                    projects: projectsFolake.projectsFolake  })
    }

    if(this.props.client.user.name == "Matthew Eylenberg") {
      this.setState({hiddenProjects: projectsHiddenMatthew.projectsHiddenMatthew,
                    projects: projectsMatthew.projectsMatthew  })
    }

    if(this.props.client.user.name == "Reed Flocks") {
      this.setState({hiddenProjects: projectsHiddenReed.projectsHiddenReed,
                    projects: projectsReed.projectsReed  })
    }

    if(this.props.client.user.name == "Jenny Kim") {
      this.setState({hiddenProjects: projectsHiddenJenny.projectsHiddenJenny,
                    projects: projectsJenny.projectsJenny  })
    }

    if(this.props.client.user.name == "Charlotte Lewis") {
      this.setState({hiddenProjects: projectsHiddenCharlotte.projectsHiddenCharlotte,
                    projects: projectsCharlotte.projectsCharlotte  })
    }

    if(this.props.client.user.name == "Mia Butera") {
      this.setState({hiddenProjects: projectsHiddenMia.projectsHiddenMia,
                    projects: projectsMia.projectsMia  })
    }

    if(this.props.client.user.name == "Danielle Maynard") {
      this.setState({hiddenProjects: projectsHiddenDanielle.projectsHiddenDanielle,
                    projects: projectsDanielle.projectsDanielle  })
    }

    if(this.props.client.user.name == "Luke Marron") {
      this.setState({hiddenProjects: projectsHiddenLuke.projectsHiddenLuke,
                    projects: projectsLuke.projectsLuke  })
    }
  }

  showDropzone = () => {
    this.setState({ dropZoneShow: true, cardBoardShow: false, libraryFiltersHide: true  });
  }

  hideDropzone = () => {
    this.setState({ dropZoneShow: false,
                  cardBoardShow: true,
                  editingLocalProject: false,
                  showHiddenProject: true,
                  resetNewProject: false,               
                  libraryFiltersHide: false   });               
  }

  editExistingProject = () => {
    this.setState({ editingLocalProject: true,
                  resetNewProject: true });  
    this.showDropzone();
  }



  render() {

   

    const { dropZoneShow, cardBoardShow, libraryFiltersHide, showHiddenProject } = this.state;
    const { fields, lockedBy, client } = this.props;

    const classnames = classNames({
      'edit-content': true,
      'page-wrapper': true,
      'edit-content--locked': lockedBy !== null,
    })

    const dropzoneClassname = classNames({
      'dropzone-wrapper': true,
      'dropzone-wrapper--show': dropZoneShow,
    })

    const showCardBoard = classNames({
      'cardBoard-wrapper': cardBoardShow,
      'cardBoard-wrapper--hide': dropZoneShow,
    })

     const displayHiddenProject = classNames({
      'card--id-project2': true,
      'card--id-project2--show': showHiddenProject,
    })

    const libraryFilterClassname = classNames({
      'library-filters': true,
      'library-filters--hide': libraryFiltersHide,
    })

    let projectsData;

    projectsData = this.state.projects.map((project, index) =>
          <div id={"test" + index} key={index} className={showCardBoard}>
            <Card title={project.title} id={"project" + index}>
              <div className="actions-header actions-header--right">
                <div className="go-to-project">
                  <i className="iconcss icon-upload" onClick={this.showDropzone.bind(this)}></i>
                  <span>Go To Project</span>
                </div>
              </div>
              <div className="actions-header actions-header--left">
                <div className="last-edited">
                  <i className="iconcss icon-last-modified"></i>
                  <span>Last Modified by {this.props.client.user.name.split(' ').shift()} on {moment().format("MMM D")}</span>
                </div>

                <div className="group-by">
                  <i className="iconcss icon-group-by"></i>
                  <span>Group By: File Type</span>
                </div>

                </div>
              <CardSection>
                { (project.items.filter((obj) => obj.type == 'video').length > 0) ? 
                (
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
                { (project.items.filter((obj) => obj.type == 'image').length > 0) ? 
                (
                  <ProjectCardHeader type='Image'/>
                ) : null
                }
                { 
                  project.items
                    .filter((obj) =>
                      obj.type == 'image'
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
                { (project.items.filter((obj) => obj.type == 'audio').length > 0) ? 
                (
                  <ProjectCardHeader type='Audio'/>
                ) : null
                }
                { 
                  project.items
                    .filter((obj) =>
                      obj.type == 'audio'
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
              </CardSection>
            </Card>
          </div>
    );


    let hiddenProjectsData;

    hiddenProjectsData = this.state.hiddenProjects.map((project, index) =>
          <div id={"test" + index} key={index} className={displayHiddenProject}>
            <Card title={project.title} id={"project" + index} >
              <CardSection>

              <div className="actions-header actions-header--right">
                <div className="go-to-project">
                  <i className="iconcss icon-upload" onClick={this.showDropzone.bind(this)}></i>
                  <span>Go To Project</span>
                </div>
              </div>
              <div className="actions-header actions-header--left">
                <div className="last-edited">
                    <i className="iconcss icon-last-modified"></i>
                    <span>Last Modified by {this.props.client.user.name.split(' ').shift()} on {moment().format("MMM D")}</span>
                </div>
                <div className="group-by">
                    <i className="iconcss icon-group-by"></i>
                    <span>Group By: File Type</span>
                </div>
              </div>

                { (project.items.filter((obj) => obj.type == 'video').length > 0) ? 
                (
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
                      editingLocalProject={this.state.editingLocalProject}
                      editExistingProject={this.showDropzone}
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
                { (project.items.filter((obj) => obj.type == 'image').length > 0) ? 
                (
                  <ProjectCardHeader type='Image'/>
                ) : null
                }
                { 
                  project.items
                    .filter((obj) =>
                      obj.type == 'image'
                    )
                    .map((item, index) =>
                      <ProjectItem
                      editingLocalProject={this.state.editingLocalProject}
                      editExistingProject={this.showDropzone}
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
                { (project.items.filter((obj) => obj.type == 'audio').length > 0) ? 
                (
                  <ProjectCardHeader type='Audio'/>
                ) : null
                }
                {
                  project.items
                    .filter((obj) =>
                      obj.type == 'audio'
                    )
                    .map((item, index) =>
                      <ProjectItem
                      editingLocalProject={this.state.editingLocalProject}
                      editExistingProject={this.showDropzone}
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
              </CardSection>
            </Card>
          </div>
    );


    const lockerEditor = lockedBy !== null ? getUserData(this.props.lockedBy) : null;

    return (
      <div className={classnames}>
        <BaseLayout fields={fields} pageTitle="New article">

        <div className={libraryFilterClassname}>
            <div className="library-filters-title">
              <span>Register Content</span>
            </div>
            <div className="library-filters-wrapper">
              <i className="iconcss icon-close filter-close"/>
              <div className="library-filter-label">Filters</div>
               
              </div>
              <div className="library-filter-controls filters__controls">
                <button className="apply" onClick={this.showDropzone.bind(this)}>New Project<i className="iconcss icon-plus"></i></button>
              </div>
        </div>
         
         
      <div className="centered">
        <CardBoard>
            <p id="header">Recent Projects</p>

            
            <div id="test2" className={showCardBoard}>
             { hiddenProjectsData }
              {  projectsData  }
            </div>

            <div className={dropzoneClassname}>

               <Card id="dropzone">
               <div className="uploading-content-header">
                <div className="uploading-content-col">
                  <Field addPencil={true} field={fields[68]}>
                    <FieldWidgets.Text />
                  </Field>
                  </div>
                  <div id="upload" className="uploading-content-col">
                  <div className="dz-master-progress">
                    <span className="dz-master-progress--text-lg">Uploaded 8 of 8</span>
                    <span className="dz-master-progress--text-sm"><i className="iconcss icon-last-modified"></i>3/22/18</span>
                  </div>
                    <div className="uploading-content-row">
                      <button className="apply">Notify When Complete<i className="iconcss icon-bullhorn"></i></button>
                      <span className="dz-upload">
                        <div className="dz-master-progress--bar">
                        <div className="dz-master-progress--bar-inner"></div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
  
                <CardSection>
                 <Dropzone 
                 localFiles={this.state.projects[0].items} 
                 editingLocalProject={this.state.editingLocalProject}
                 resetNewProject={this.state.resetNewProject}
                 hideDropzone={this.hideDropzone}/>
                 </CardSection>
              </Card>
           </div>
           
          
            </CardBoard>
          </div>
        </BaseLayout>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fields: state.fields,
    lockedBy: state.contentItem.lockedBy,
    client: state.client
  }
}

export default connect(mapStateToProps)(RegisterContent);
