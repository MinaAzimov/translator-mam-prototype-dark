import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom"; 
import Field from "../Field";
import BaseLayout from "../BaseLayout";
import { Card, CardSection, CardBoard } from "../Card";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import classNames from "classnames";
import moment from "moment";
import Selectbox from "../form/Selectbox";
import TextArea from "../form/TextArea";
import FieldWidgets from "../form/FieldWidgets";
import Switch from "../form/Switch";
import UploadedFile from "../UploadedFile";
import Truncate from 'react-truncate';
import $ from "jquery";
import RegistrationStatus from '../RegistrationStatus';

const typeListVideo=[{title:"-None-",id:0, dropdown: "MaterialType"},{title:"Promo",id:1, dropdown: "MaterialType"},{title:"Episodic",id:2, dropdown: "MaterialType"},{title:"Theatrical",id:3, dropdown: "MaterialType"},{title:"Footage",id:4, dropdown: "MaterialType"},{title:"Short",id:5, dropdown: "MaterialType"}];
const typeListImage=[{title:"-None-",id:0, dropdown: "MaterialType"},{title:"Photography",id:1, dropdown: "MaterialType"},{title:"Graphic",id:2, dropdown: "MaterialType"},{title:"Art",id:3, dropdown: "MaterialType"},{title:"Print",id:4, dropdown: "MaterialType"},{title:"Logo",id:5, dropdown: "MaterialType"}];
const textListVideo=[{title:"-None-",id:0, dropdown: "Text"},{title:"Texted",id:1, dropdown: "Text"},{title:"Textless",id:2, dropdown: "Text"},{title:"Masked",id:3, dropdown: "Text"},{title:"Unmasked",id:4, dropdown: "Text"}];
const textListImage=[{title:"-None-",id:0, dropdown: "Text"},{title:"Episodic Stills (TV)",id:1, dropdown: "Text"},{title:"Gallery Stills (TV)",id:2, dropdown: "Text"},{title:"Stills (FILM)",id:3, dropdown: "Text"},{title:"Behind the Scenes",id:4, dropdown: "Text"},{title:"Publicity Events",id:5, dropdown: "Text"},{title:"Artwork",id:6, dropdown: "Text"},{title:"Other",id:7, dropdown: "Text"}];
const productionTypeList=[{title:"-None-",id:0, dropdown: "ProductionType"},{title:"Digital",id:1, dropdown: "ProductionType"},{title:"Broadcast",id:2, dropdown: "ProductionType"},{title:"Event",id:3, dropdown: "ProductionType"},{title:"Live Event",id:4, dropdown: "ProductionType"},{title:"Web Event",id:5, dropdown: "ProductionType"},{title:"Special",id:6, dropdown: "ProductionType"}];
const mediaTypeList=[{title:"-None-",id:0, dropdown: "MediaType"},{title:"Video",id:1, dropdown: "MediaType"},{title:"Audio",id:2, dropdown: "MediaType"},{title:"Image",id:3, dropdown: "MediaType"}];
const frameRateList=[{title:"24p",id:0},{title:"25p",id:1},{title:"29.97p",id:2},{title:"30p",id:3},{title:"48p",id:4},{title:"50i",id:5},{title:"60i",id:6},{title:"59.94p",id:7},{title:"50p",id:8},{title:"60p",id:9},{title:"72p",id:10},{title:"100p",id:11},{title:"119.88p",id:12},{title:"120p",id:13},{title:"300FPS",id:14}];
const aspectRatioList=[{title:"-None-",id:0, dropdown: "AspectRatio"},{title:"16x9 full frame (1:78)",id:1, dropdown: "AspectRatio"},{title:"16x9 letterbox (1:88)",id:2, dropdown: "AspectRatio"},{title:"16x9 letterbox (2:00)",id:3, dropdown: "AspectRatio"},{title:"16x9 letterbox (2:21)",id:4, dropdown: "AspectRatio"},{title:"16x9 letterbox (2:35)",id:5, dropdown: "AspectRatio"},{title:"16x9 letterbox (2:40)",id:6, dropdown: "AspectRatio"},{title:"16x9 letterbox (2:76)",id:7, dropdown: "AspectRatio"},{title:"16x9 side matted (1:33)",id:8, dropdown: "AspectRatio"},{title:"16x9 side matted (1:66)",id:9, dropdown: "AspectRatio"},{title:"4x3 full frame (1:33)",id:10, dropdown: "AspectRatio"},{title:"4x3 letterbox (1:66)",id:11, dropdown: "AspectRatio"},{title:"4x3 letterbox !1:78)",id:12, dropdown: "AspectRatio"},{title:"4x3 letterbox (2:10)",id:13, dropdown: "AspectRatio"},{title:"4x3 letterbox (2:35)",id:14, dropdown: "AspectRatio"},{title:"4x3 letterbox (2:40)",id:15, dropdown: "AspectRatio"},{title:"4x3 letterbox (2:76)",id:16, dropdown: "AspectRatio"}];
const airVersionList=[{title:"-None-",id:0, dropdown: "Air Version"},{title:"International Broadcast Master",id:1, dropdown: "Air Version"},{title:"Domestic Broadcast Master",id:2, dropdown: "Air Version"},{title:"International Broadcast Master",id:3, dropdown: "Air Version"},{title:"International French OFCOM Compliant Broadcast Master",id:4, dropdown: "Air Version"},{title:"Uncensored Master",id:5, dropdown: "Air Version"},{title:"Submaster",id:6, dropdown: "Air Version"}];
const showList=[{title:"-None-",id:0, dropdown: "Series"},{title:"Show 1",id:1, dropdown: "Series"},{title:"Show 2",id:2, dropdown: "Series"},{title:"Show 3",id:3, dropdown: "Series"},{title:"Show 4",id:4, dropdown: "Series"}];
const seasonList=[{title:"-None-",id:0, dropdown: "Season"},{title:"Season 1",id:1, dropdown: "Season"},{title:"Season 2",id:2, dropdown: "Season"},{title:"Season 3",id:3, dropdown: "Season"},{title:"Season 4",id:4, dropdown: "Season"}];
const episodeList=[{title:"-None-",id:0, dropdown: "Episode"},{title:"Episode 1",id:1, dropdown: "Episode"},{title:"Episode 2",id:2, dropdown: "Episode"},{title:"Episode 3",id:3, dropdown: "Episode"},{title:"Episode 4",id:4, dropdown: "Episode"}];
const networkList=[{title:"-None-",id:0, dropdown: "Network"},{title:"Bravo",id:1, dropdown: "Network"},{title:"E!",id:2, dropdown: "Network"},{title:"USA",id:3, dropdown: "Network"},{title:"SyFy",id:4, dropdown: "Network"},{title:"Universal Kids",id:5, dropdown: "Network"},{title:"Oxygen",id:6, dropdown: "Network"}];
const contentTypeList=[{title:"Show",id:0, },{title:"Event",id:1},{title:"Promo",id:2},{title:"Uncategorized",id:3}];

const versionTypeList=[{title:"-None-",id:0, dropdown: "VersionType"},{title:"International Broadcast Master",id:1, dropdown: "VersionType"},{title:"Domestic Broadcast Master",id:2, dropdown: "VersionType"},{title:"International [Territory] OFCOM Compliant",id:3, dropdown: "VersionType"},{title:"Broadcast Master",id:4, dropdown: "VersionType"},{title:"Uncensored Master",id:5, dropdown: "VersionType"},{title:"Submaster",id:6, dropdown: "VersionType"}];
const languageList=[{title:"-None-",id:0, dropdown: "Language"},{title:"English",id:1, dropdown: "Language"},{title:"German",id:2, dropdown: "Language"},{title:"Spanish",id:3, dropdown: "Language"},{title:"French",id:4, dropdown: "Language"}];

const assosiationsList=[{title:"-None-",id:0, dropdown: "Assosiations"},{title:"Title",id:1, dropdown: "Assosiations"}];

class EssentialsCard extends Component {

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

	addNewFields = val => {

		this.setState({
			"contentType": val
		})
		let element;
		(val) => this.props.updateContentType(val)
		
	};

	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, onSearchOptimizedSelect, onServiceSelect, onInjestSelect, selectedFilter, selectedFilterOptimezed, selectedFilterSevice, itemStatus,
		inputMediaType, inputMaterialType, inputSecondaryType, inputFrameRate, inputAspectRatio, inputShow, inputSeason, inputContentType, localItem, editingLocalItem, bulkEditOpen, inputFileName, onInputChange, onDropDownChange,
		 inputAssosiations, inputEpisode, inputVersionType, inputText, inputAirVersion, inputNetwork, inputKeywords, inputLanguage, inputProductionType } = this.props;

		 const Filename = classNames({
			'field-text': true,
			'field__not-empty': inputFileName,
			'field__focused': this.state.focused && this.state.target == "filename"
		});

		 const Keywords = classNames({
			'field-text': true,
			'field__not-empty': inputKeywords,
			'field__focused': this.state.focused && this.state.target == "keywords"
		});



		return(

			       <Card title="Essentials" id="essentials">
					<CardSection>
					<div>
					{/*<Selectbox
					helpText=""
					label="Network"
					items={networkList}
					inputPlaceholder="Type source"
					value={this.props.client.user.name == "Folake Ayiloge" ? networkList[1] : networkList[2]} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>*/}
					
					{/*<Selectbox
					helpText=""
					label="Media Type Class"
					items={mediaTypeList}
					inputPlaceholder="Type source"
					value={this.props.target.type == "image/jpeg" || this.props.target.type == "image/jpg" || this.props.target.type == "image/png" ? mediaTypeList[3] : mediaTypeList[1]} 
					onChange={this.props.onDropDownChange.bind(this)}
					required={true}
					/>*/}
					<FieldWidgets.Text
						label="Network"
						value={this.props.client.user.name == "Folake Ayiloge" ? networkList[1].title : networkList[2].title} 
					/>
					<FieldWidgets.Text
						label="Media Type Class"
						value={this.props.target.type == "image/jpeg" || this.props.target.type == "image/jpg" || this.props.target.type == "image/png" ? mediaTypeList[3].title : mediaTypeList[1].title} 
						required={true}
					/>
					<FieldWidgets.Text
						label="File Name"
						value={this.props.target.name}
						required={true}
					/>
					{/*<div className={Filename} >
					//<label className="field__label" >
				    //File Name <span style={{color: 'red'}}>*</span>
				    //</label>
				    //<input className="field-text__input"  id="filename"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.target.name} onChange={this.props.onInputChange.bind(this)}/>
			        //</div>
					//</div>
					//<div> */}
					 {(this.props.target.type == "video" || this.props.target.type == "video/mp4")  ? (
					
					<div>
				
					<Selectbox
					helpText=""
					label="Material Type"
					items={typeListVideo}
					inputPlaceholder="Type source"
					value={this.props.inputMaterialType} 
					onChange={this.props.onDropDownChange.bind(this)}
					required={true}
					/>

					<Selectbox
					helpText=""
					label="Production Type"
					items={productionTypeList}
					inputPlaceholder="Type source"
					value={this.props.inputProductionType} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

			        <Selectbox
					helpText=""
					label="Assosiations"
					items={assosiationsList}
					value={this.props.inputAssosiations} 
					onChange={this.props.onDropDownChange.bind(this)}
					inputPlaceholder="Type source"
					/>

			        <Selectbox
					helpText=""
					label="Series"
					items={showList}
					value={this.props.inputShow} 
					onChange={this.props.onDropDownChange.bind(this)}
					inputPlaceholder="Type source"
					/>


					<Selectbox
					helpText=""
					label="Season"
					items={seasonList}
					inputPlaceholder="Type source"
					value={this.props.inputSeason} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					<Selectbox
					helpText=""
					label="Episode"
					items={episodeList}
					inputPlaceholder="Type source"
					value={this.props.inputEpisode} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					<Selectbox
					helpText=""
					label="Version Type"
					items={versionTypeList}
					inputPlaceholder="Type source"
					value={this.props.inputVersionType} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					<div className={Keywords}>
					<label className="field__label">
				    Keywords
				    </label>
				    <input className="field-text__input"  id="keywords"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputKeywords} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

			        <Selectbox
					helpText=""
					label="Language"
					items={languageList}
					inputPlaceholder="Type source"
					value={this.props.inputLanguage} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

			        <Selectbox
					helpText=""
					label="Text"
					items={textListVideo}
					inputPlaceholder="Type source"
					value={this.props.inputText} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

			        <Selectbox
					helpText=""
					label="Aspect Ratio"
					items={aspectRatioList}
					inputPlaceholder="Type source"
					value={this.props.inputAspectRatio} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>
				
					
						</div>

					) : (
					<div>
						<Selectbox
					helpText=""
					label="Material Type"
					items={typeListImage}
					inputPlaceholder="Type source"
					value={this.props.inputMaterialType} 
					onChange={this.props.onDropDownChange.bind(this)}
					required={true}
					/>

					<Selectbox
					helpText=""
					label="Production Type"
					items={productionTypeList}
					inputPlaceholder="Type source"
					value={this.props.inputProductionType} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					 <Selectbox
					helpText=""
					label="Assosiations"
					items={assosiationsList}
					value={this.props.inputAssosiations} 
					onChange={this.props.onDropDownChange.bind(this)}
					inputPlaceholder="Type source"
					/>



			        <Selectbox
					helpText=""
					label="Series"
					items={showList}
					value={this.props.inputShow} 
					onChange={this.props.onDropDownChange.bind(this)}
					inputPlaceholder="Type source"
					/>


					<Selectbox
					helpText=""
					label="Season"
					items={seasonList}
					inputPlaceholder="Type source"
					value={this.props.inputSeason} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					<Selectbox
					helpText=""
					label="Episode"
					items={episodeList}
					inputPlaceholder="Type source"
					value={this.props.inputEpisode} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>


					<Selectbox
					helpText=""
					label="Version Type"
					items={versionTypeList}
					inputPlaceholder="Type source"
					value={this.props.inputVersionType} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>

					<div className={Keywords}>
					<label className="field__label">
				    Keywords
				    </label>
				    <input className="field-text__input"  id="keywords"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputKeywords} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

			        <Selectbox
					helpText=""
					label="Language"
					items={languageList}
					inputPlaceholder="Type source"
					value={this.props.inputLanguage} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>


					<Selectbox
					helpText=""
					label="Aspect Ratio"
					items={aspectRatioList}
					inputPlaceholder="Type source"
					value={this.props.inputAspectRatio} 
					onChange={this.props.onDropDownChange.bind(this)}
					/>




					</div>
					)}
					</div>
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

export default connect(mapStateToProps)(EssentialsCard);