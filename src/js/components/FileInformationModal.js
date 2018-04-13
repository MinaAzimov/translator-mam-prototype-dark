import React, { Component, PropTypes } from "react";
import Chat from "./Chat";
import Field from "./Field";
import BaseLayout from "./BaseLayout";
import { Card, CardSection, CardBoard } from "./Card";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import { getContentItems } from "../services/content";
import { getUserData } from "../services/users";
import moment from "moment";
import Selectbox from "./form/Selectbox";
import TextArea from "./form/TextArea";
import FieldWidgets from "./form/FieldWidgets";
import Switch from "./form/Switch";
import Svg from "./staticFields/Svg";
import UploadedFile from "./UploadedFile";
import Truncate from 'react-truncate';
import $ from "jquery";
import RegistrationStatus from './RegistrationStatus';
import { SimpleReactDropzone } from "../lib/ui/SimpleReactDropzone";
import { defaultIcons } from "../lib/ui/DefaultIcons";
import EditFileOverlay from './EditFileOverlay';
import EssentialsCard from './staticFields/EssentialsCard';
import TechSpecsCard from './staticFields/TechSpecsCard';
import AdminCard from './staticFields/AdminCard';
import DatesCard from './staticFields/DatesCard';
import DescriptiveInfoCard from './staticFields/DescriptiveInfoCard';
import ReferenceIdCard from './staticFields/ReferenceIdCard';
import CommentsCard from './staticFields/CommentsCard';
import NotifyButton from './NotifyButton';

const typeListVideo=[{title:"Promo",id:0},{title:"Episodic",id:1},{title:"Theatrical",id:2},{title:"Footage",id:3},{title:"Short",id:4}];
const typeListImage=[{title:"Photography",id:0},{title:"Graphic",id:1},{title:"Art",id:2},{title:"Print",id:3},{title:"Logo",id:4}];
const secondaryTypeListVideo=[{title:"Texted",id:0},{title:"Textless",id:1},{title:"Masked",id:2},{title:"Unmasked",id:3}];
const secondaryTypeListImage=[{title:"Episodic Stills (TV)",id:0},{title:"Gallery Stills (TV)",id:1},{title:"Stills (FILM)",id:2},{title:"Behind the Scenes",id:3},{title:"Publicity Events",id:4},{title:"Artwork",id:5},{title:"Other",id:6}];
const fileIncList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const mediaTypeList=[{title:"Video",id:0},{title:"Audio",id:1},{title:"Image",id:2}];
const frameRateList=[{title:"24p",id:0},{title:"25p",id:1},{title:"29.97p",id:2},{title:"30p",id:3},{title:"48p",id:4},{title:"50i",id:5},{title:"60i",id:6},{title:"59.94p",id:7},{title:"50p",id:8},{title:"60p",id:9},{title:"72p",id:10},{title:"100p",id:11},{title:"119.88p",id:12},{title:"120p",id:13},{title:"300FPS",id:14}];
const aspectRatioList=[{title:"16x9 full frame (1:78)",id:0},{title:"16x9 letterbox (1:88)",id:1},{title:"16x9 letterbox (2:00)",id:2},{title:"16x9 letterbox (2:21)",id:3},{title:"16x9 letterbox (2:35)",id:4},{title:"16x9 letterbox (2:40)",id:5},{title:"16x9 letterbox (2:76)",id:5},{title:"16x9 side matted (1:33)",id:5},{title:"16x9 side matted (1:66)",id:5},{title:"4x3 full frame (1:33)",id:5},{title:"4x3 letterbox (1:66)",id:5},{title:"4x3 letterbox !1:78)",id:5},{title:"4x3 letterbox (2:10)",id:5},{title:"4x3 letterbox (2:35)",id:5},{title:"4x3 letterbox (2:40)",id:5},{title:"4x3 letterbox (2:76)",id:5}];
const airVersionList=[{title:"International Broadcast Master",id:0},{title:"Domestic Broadcast Master",id:1},{title:"International Broadcast Master",id:2},{title:"International French OFCOM Compliant Broadcast Master",id:3},{title:"Uncensored Master",id:4},{title:"Submaster",id:5}];
const showList=[{title:"Show 1",id:0},{title:"Show 2",id:1},{title:"Show 3",id:2},{title:"Show 4",id:3}];
const episodeList=[{title:"Season 1",id:0},{title:"Season 2",id:1},{title:"Season 3",id:2},{title:"Season 4",id:3}];
const actorsList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const networkList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];

class FileInformationModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isDetected: true,
			target: ''
		}
	}


  static defaultProps = {
    onChange: () => {},
    onStartEdit: () => {},
    onStopEdit: () => {}
  };

  onChange = (e) => {
		let newVal = e.target.value;
		this.setState({
			value: newVal
		});
		if (this.props.onChange) {
			this.props.onChange(newVal);
		}
	};

	onFocus = (e) => {
		this.setState({ 
			focused: true,
			isDetected: false,
			target: e.target.id
		});
		if (this.props.onStartEdit) {
			this.props.onStartEdit();
		}
	};


	onBlur = (e) => {
		this.setState({ focused: false });
		if (this.props.onStopEdit) {
			this.props.onStopEdit();
		}
	};

	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, itemStatus, saveFilesInformation,
		 updateHouseID, updateComposition, updateColor, updatePromoCode, updateShow, inputHouseID, inputComposition, inputColor, inputPromoCode, inputShow, inputSeason, inputDescription, inputUploader, inputKeywords, inputProductionType, 
		 inputActors, inputLanguage, inputCopyright, inputRestrictions, updateSeason, updateDescription, updateUploader, updateKeywords, updateProductionType, updateActors,
		 updateNetwork, updateLanguage, updateCopyright, updateRestrictions, inputMediaType, inputMaterialType, inputSecondaryType, inputFrameRate, inputAspectRatio, updateMediaType,
		 updateMaterialType, updateSecondaryType, updateAspectRatio, updateFrameRate, inputTitle, inputSubtitle, updateTitle, updateSubtitle, updateContentType, inputContentType, localItem, editingLocalItem, bulkEditOpen, inputFileName, onInputChange, onDropDownChange,
		 inputAssosiations, inputEpisode, inputVersionType, inputText, inputAirVersion, inputNetwork, inputProducer, inputCreative, inputStorageLocation, inputAcSource, inputUserDescription, inputPeople, inputUserComments  } = this.props;

		const classnames = classNames({
			"files-information": true,
			"files-information--show": selected
		});

		const classnamesInputTitle  = classNames({
			'field-text field-text--lg': true,
			'field__not-empty': inputTitle,
			'field__focused': this.state.focused && this.state.target == "title"
		});

		const classnamesInputSubtitle = classNames({
			'field-text field-text--lg': true,
			'field__not-empty': inputSubtitle,
			'field__focused': this.state.focused && this.state.target == "desc"
		});

		
		

		return (
	   				<Card id="cards-wrapper">
					<div className="files-information-close" onClick={this.props.closeFilesInformation}><i className="iconcss icon-close-thin"></i></div>
					<button className="save-button" onClick={this.props.saveFilesInformation}><span>Save</span><i className="iconcss icon-save"></i></button>
					<div className={classnamesInputTitle}>
				    <input className="field-text__input" onBlur={this.onBlur} id="title" onFocus={this.onFocus} value={this.props.inputTitle} onChange={this.props.updateTitle.bind(this)}/>
				    <label className="field__label">
				    Title
				    </label>
			        </div>

					<div className={classnamesInputSubtitle}>
				    <input className="field-text__input" id="desc" value={this.props.inputSubtitle} onBlur={this.onBlur} onFocus={this.onFocus} onChange={this.props.updateSubtitle.bind(this)}/>
				    <label className="field__label">
				    Description
				    </label>
			        </div>

					<div className="filling-out-status">
					<span>
					<RegistrationStatus
					isReadyForIngest={ (this.props.itemStatus == "Ready For Ingest" || this.props.itemStatus == "Ready For Service" || this.props.itemStatus == "Search Optimized") ? true : false }
					isReadyForService={ (this.props.itemStatus == "Ready For Service" || this.props.itemStatus == "Search Optimized") ? true : false }
					isSearchOptimized={ this.props.itemStatus == "Search Optimized" ? true : false }
					/>
					{this.props.itemStatus}
					</span>
					<span>
					{ (this.props.target.type == "video" || this.props.target.type == "video/mp4") ? (<i className="iconcss icon-type-video"></i>) : null}
					{ (this.props.target.type == "image" || this.props.target.type == "image/jpeg") ? (<i className="iconcss icon-type-image"></i>) : null}
					{ (this.props.target.type == "audio" || this.props.target.type == "image/mp3") ? (<i className="iconcss icon-type-audio"></i>) : null}
					{ this.props.target.type }
					</span>
					<span><div className="swatch"></div>Detected Fields</span>
					<span><div className="required-legend">*</div>Required Fields</span>
					<div className="notify-others">
						<NotifyButton
						drawer={true}/>
					</div>
	 
					</div>



					<CardSection id="files-info-cards-section">
						<EssentialsCard 
						onInputChange={this.props.onInputChange}
						onDropDownChange={this.props.onDropDownChange}
						inputFileName={this.props.inputFileName}
						inputAssosiations={this.props.inputAssosiations}
						inputEpisode={this.props.inputEpisode}
						inputVersionType={this.props.inputVersionType}
						inputText={this.props.inputText}
						inputAirVersion={this.props.inputAirVersion}
						inputNetwork={this.props.inputNetwork}
						inputKeywords={this.props.inputKeywords}
						inputPromoCode={this.props.inputPromoCode}
						inputShow={this.props.inputShow}
						inputSeason={this.props.inputSeason}
						inputMediaType={this.props.inputMediaType}
			            inputMaterialType={this.props.inputMaterialType}
			            inputSecondaryType={this.props.inputSecondaryType}
			            inputFrameRate={this.props.inputFrameRate}
			            inputAspectRatio={this.props.inputAspectRatio}
			            inputContentType={this.props.inputContentType}
			            inputLanguage={this.props.inputLanguage}
			            inputProductionType={this.props.inputProductionType}
						bulkEditOpen={this.props.bulkEditOpen}
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						/>

						<TechSpecsCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						inputEpisodeNumber={this.props.inputEpisodeNumber}
						inputDescription={this.props.inputDescription}
						inputKeywords={this.props.inputKeywords}
						inputActors={this.props.inputActors}
						inputNetwork={this.props.inputNetwork}
						inputLanguage={this.props.inputLanguage}
						inputHouseID={this.props.inputHouseID}
						inputComposition={this.props.inputComposition}
						inputColor={this.props.inputColor}
						inputPromoCode={this.props.inputPromoCode}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						/>

						<AdminCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						inputProducer={this.props.inputProducer}
						inputUploader={this.props.inputUploader}
						inputCreative={this.props.inputCreative}
						inputCopyright={this.props.inputCopyright}
						inputRestrictions={this.props.inputRestrictions}
						inputStorageLocation={this.props.inputStorageLocation}
						inputAcSource={this.props.inputAcSource}
						onInputChange={this.props.onInputChange}
						/>

						<DescriptiveInfoCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						inputUserDescription={this.props.inputUserDescription}
						onInputChange={this.props.onInputChange}
						inputPeople={this.props.inputPeople}
						/>

						<DatesCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						/>

						<ReferenceIdCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						/>

						<CommentsCard
						editingLocalItem={this.props.editingLocalItem}
						localItem={this.props.localItem}
						saveFilesInformation={this.saveFilesInformation}
						closeFilesInformation={this.props.closeFilesInformation}
						target={this.props.target}
						selected={this.props.selected}
						onServiceSelect={this.props.onServiceSelect}
						onInjestSelect={this.props.onInjestSelect}
						onSearchOptimizedSelect={this.props.onSearchOptimizedSelect}
						selectedFilterOptimezed={this.props.selectedFilterOptimezed}
						selectedFilter={this.props.selectedFilter}
						selectedFilterSevice={this.props.selectedFilterSevice}
						itemStatus={this.props.itemStatus}
						onInputChange={this.props.onInputChange}
						inputUserComments={this.props.inputUserComments}
						/>



					</CardSection>
					</Card>
					    	
		)
	}
}

const mapStateToProps = state => {
	return {
		fields: state.fields,
		lockedBy: state.contentItem.lockedBy,
		client: state.client
	};
};

export default connect(mapStateToProps)(FileInformationModal);