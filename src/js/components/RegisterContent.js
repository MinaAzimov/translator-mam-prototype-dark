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
import ExistingTitles from "./ExistingTitles";
import moment from "moment";
import axios from 'axios';
import firebase from './firebase.js'

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

import { ReduxFormFieldSimpleReactDropzone } from 'simple-react-dropzone';

import $ from "jquery";


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
          projects: [],
          itemsToRender: [],
          currentProject: '',
          showHiddenProject: false,
          resetNewProject: false, 
          editingLocalItem: false,
          localItem: [],
          projectName: "Project Name",
          inputValue: '',
          notifyWhenUploadComplete: false
        }
       this.rootRef = firebase.database().ref('/projects/' + this.props.client.user.name)
    }

  componentDidMount() {

    
this.rootRef.once('value', snapshot => {
var newArray = [];
snapshot.forEach((snap) => {
newArray.push(snap.val())
})
this.setState({ projects: this.state.projects.concat(newArray)})
//this.rootRef.off()
})
}


  showDropzone = () => {
    this.setState({ dropZoneShow: true, cardBoardShow: false, libraryFiltersHide: true, editExistingProject: false  });
  }

  hideDropzone = () => {
    this.setState({ dropZoneShow: false,
                  cardBoardShow: true,
                  editingLocalProject: false,
                  resetNewProject: false,               
                  libraryFiltersHide: false,
                  editingLocalItem: false,
                  localItem: [],
                  inputValue: '',
                  currentProject: ''   });  
                  this.rootRef.once('value', snapshot => {
                  var newArray = [];
                  snapshot.forEach((snap) => {
                  newArray.push(snap.val())
                  })
                  this.setState({ projects: this.state.projects.filter(project => project.name !== project.name).concat(newArray)})
                  this.rootRef.off()
                  })

  }


  getFilesData = val => {
    console.log(val)
   this.setState({itemsToRender: val })

  }

  clickNotifyMe = () => {
    this.setState({
      notifyWhenUploadComplete: !this.state.notifyWhenUploadComplete 
    });
  }



  editExistingProject = (key, item) => {
    var items = [];
    items.push(key);
    this.setState({ editingLocalProject: true,
                  resetNewProject: true,
                  itemsToRender: items,
                  currentProject: key.title });  
  
    
    console.log(key.title, item, this, this.refs)
    this.showDropzone();

  }

fireClick = (node) => {
    if ( document.createEvent ) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        node.dispatchEvent(evt);    
    } else if( document.createEventObject ) {
        node.fireEvent('onclick') ; 
    } else if (typeof node.onclick == 'function' ) {
        node.onclick(); 
    }
}

   editExistingItem = (key, project, item) => {
    var items = [];

    items.push(project);
    this.setState({ editingLocalProject: true,
                  resetNewProject: true,
                  itemsToRender: items,
                  editingLocalItem: true,
                  localItem: item,
                  currentProject: items[0].title });  
  
    console.log(items[0].title)
    console.log(this.state.localItem)
    console.log(this.state.currentProject)
    console.log(this.state.editingLocalItem)

    setTimeout(()=> { this.showDropzone()
     this.fireClick(document.getElementById(this.state.localItem.name)) }, 500);


    
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    });
    console.log(this.state.inputValue)
  }



  render() {

   

    const { dropZoneShow, cardBoardShow, libraryFiltersHide, showHiddenProject } = this.state;
    const { fields, lockedBy, client } = this.props;

    const notifyButtonclassnames = classNames({
      'apply': true,
      'notify-upload-complete-btn': true,
      'notify-upload-complete-btn--checked': this.state.notifyWhenUploadComplete
    })

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

            <Card title={project.title} id={"project" + index} lastModified={"Last Modified by " + this.props.client.user.name.split(' ').shift() + " on " + moment().format("MMM D")}>
              <div className="actions-header actions-header--right">
                <div className="go-to-project" onClick={this.editExistingProject.bind(this, project, index)}>
                  <i className="iconcss icon-upload"></i>
                  <span>Go To Project</span>
                </div>
              </div>
              <div className="actions-header actions-header--left">

                <div className="group-by">
                  <i className="iconcss icon-group-by"></i>
                  <span>Group By: File Type</span>
                </div>

              </div>
              <CardSection ref={project.title}>
                { (project.items.filter((obj) => obj.type == 'video').length > 0) ? 
                (
                  <ProjectCardHeader type='Video'/>
                ) : null
                }
                { 
                  project.items
                    .filter((obj) =>
                      obj.type == 'video/mp4' || obj.type == 'video/avi'
                    )
                    .map((item, index) =>
                      <ProjectItem
                      editingLocalItem={this.state.editingLocalItem}
                      editExistingItem={this.editExistingItem}
                      localItem={this.state.localItem}
                      key={index}
                      id={item.id}
                      name={item.name}
                      subtitle={item.subtitle}
                      type={item.type}
                      img={item.img}
                      item={item}
                      project={project}
                      ref={project}
                      readyForIngest={(item.inputStatus == "Ready For Ingest" || item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      readyForService={ (item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      searchOptimized={ item.inputStatus == "Search Optimized" ? true : false }
                      />
                    )
                }
                { (project.items.filter((obj) => obj.type == 'image/jpeg' || obj.type == 'image/jpg' || obj.type == 'image/png' || obj.type == 'image/svg+xml').length > 0) ? 
                (
                  <ProjectCardHeader type='Image'/>
                ) : null
                }
                { 
                  project.items
                    .filter((obj) =>
                      obj.type == 'image/jpeg' || obj.type == 'image/jpg' || obj.type == 'image/png' || obj.type == 'image/svg+xml'
                    )
                    .map((item, index) =>
                      <ProjectItem
                      editingLocalItem={this.state.editingLocalItem}
                      editExistingItem={this.editExistingItem}
                      localItem={this.state.localItem}
                      key={index}
                      id={item.id}
                      name={item.name}
                      subtitle={item.subtitle}
                      type={item.type}
                      img={item.img}
                      item={item}
                      project={project}
                      ref={project}
                      readyForIngest={(item.inputStatus == "Ready For Ingest" || item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      readyForService={ (item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      searchOptimized={ item.inputStatus == "Search Optimized" ? true : false }
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
                      (obj.type == 'audio' || obj.type == 'audio/mp3')
                    )
                    .map((item, index) =>
                      <ProjectItem
                      editingLocalItem={this.state.editingLocalItem}
                      editExistingItem={this.editExistingItem}
                      localItem={this.state.localItem}
                      key={index}
                      id={item.id}
                      name={item.name}
                      subtitle={item.subtitle}
                      type={item.type}
                      img={item.img}
                      item={item}
                      project={project}
                        ref={project}
                      readyForIngest={(item.inputStatus == "Ready For Ingest" || item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      readyForService={ (item.inputStatus == "Ready For Service" || item.inputStatus == "Search Optimized") ? true : false }
                      searchOptimized={ item.inputStatus == "Search Optimized" ? true : false }
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
          <div className="centered">
            <div className="library-filters-title">
              <span>Register Content</span>
            </div>
            <div className="library-filters-wrapper">
              <i className="iconcss icon-close filter-close"/>
              <div className="library-filter-label">Filters</div>
               
              </div>
              <div className="library-filter-controls filters__controls">
                <ExistingTitles newTitle={this.showDropzone}/>
                {/*<button className="apply" onClick={this.showDropzone.bind(this)}>New Project<i className="iconcss icon-plus"></i></button>*/}
              </div>
              </div>
        </div>
         
         
      <div className="centered">
        <CardBoard>
            <p id="header">Recent Projects</p>

            
            <div id="test2" className={showCardBoard}>
            
              {  projectsData  }
            </div>

            <div className={dropzoneClassname}>

               <Card id="dropzone">
               <div className="uploading-content-header">
                <div className="uploading-content-col">
                  {/*<FieldWidgets.Text 
                  label={this.state.projectName}
                  value={this.state.inputValue}
                  onChange={this.updateInputValue}
                  addPencil={true}
                  />*/}
                  {/*<div class="field-text field__detected field__pencil">
                    <label class="field__label">
                      <span class="field__label_required"></span>
                    </label>*/}
                    <input value={this.state.inputValue} label={this.state.projectName} onChange={this.updateInputValue}></input>
                  {/*</div>*/}
                  </div>          
                  <div id="upload" className="uploading-content-col">
                  <div className="dz-master-progress">
                    <span className="dz-master-progress--text-lg">Uploaded 8 of 8</span>
                    <span className="dz-master-progress--text-sm"><i className="iconcss icon-last-modified"></i>3/22/18</span>
                  </div>
                    <div className="uploading-content-row">
                      <button className={notifyButtonclassnames} onClick={this.clickNotifyMe}>Notify When Complete<i className="iconcss icon-bullhorn"></i></button>
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
             
              
                 getFilesData={this.getFilesData}
                 localItem={this.state.localItem}
                 editingLocalItem={this.state.editingLocalItem}
                 currentProject={this.state.currentProject} 
                 inputValue={this.state.inputValue}
                 localFiles={this.state.itemsToRender} 
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
