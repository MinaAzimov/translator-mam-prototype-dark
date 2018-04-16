import React, { Component, PropTypes } from "react";
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

const typeListVideo=[{title:"Promo",id:0},{title:"Episodic",id:1},{title:"Theatrical",id:2},{title:"Footage",id:3},{title:"Short",id:4}];
const typeListImage=[{title:"Photography",id:0},{title:"Graphic",id:1},{title:"Art",id:2},{title:"Print",id:3},{title:"Logo",id:4}];
const secondaryTypeListVideo=[{title:"Texted",id:0},{title:"Textless",id:1},{title:"Masked",id:2},{title:"Unmasked",id:3}];
const secondaryTypeListImage=[{title:"Episodic Stills (TV)",id:0},{title:"Gallery Stills (TV)",id:1},{title:"Stills (FILM)",id:2},{title:"Behind the Scenes",id:3},{title:"Publicity Events",id:4},{title:"Artwork",id:5},{title:"Other",id:6}];
const fileIncList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const mediaTypeList=[{title:"Video",id:0},{title:"Image",id:1},{title:"Audio",id:2}];
const frameRateList=[{title:"24p",id:0},{title:"25p",id:1},{title:"29.97p",id:2},{title:"30p",id:3},{title:"48p",id:4},{title:"50i",id:5},{title:"60i",id:6},{title:"59.94p",id:7},{title:"50p",id:8},{title:"60p",id:9},{title:"72p",id:10},{title:"100p",id:11},{title:"119.88p",id:12},{title:"120p",id:13},{title:"300FPS",id:14}];
const aspectRatioList=[{title:"16x9 full frame (1:78)",id:0},{title:"16x9 letterbox (1:88)",id:1},{title:"16x9 letterbox (2:00)",id:2},{title:"16x9 letterbox (2:21)",id:3},{title:"16x9 letterbox (2:35)",id:4},{title:"16x9 letterbox (2:40)",id:5},{title:"16x9 letterbox (2:76)",id:5},{title:"16x9 side matted (1:33)",id:5},{title:"16x9 side matted (1:66)",id:5},{title:"4x3 full frame (1:33)",id:5},{title:"4x3 letterbox (1:66)",id:5},{title:"4x3 letterbox !1:78)",id:5},{title:"4x3 letterbox (2:10)",id:5},{title:"4x3 letterbox (2:35)",id:5},{title:"4x3 letterbox (2:40)",id:5},{title:"4x3 letterbox (2:76)",id:5}];
const airVersionList=[{title:"International Broadcast Master",id:0},{title:"Domestic Broadcast Master",id:1},{title:"International Broadcast Master",id:2},{title:"International French OFCOM Compliant Broadcast Master",id:3},{title:"Uncensored Master",id:4},{title:"Submaster",id:5}];
const showList=[{title:"Show 1",id:0},{title:"Show 2",id:1},{title:"Show 3",id:2},{title:"Show 4",id:3}];
const episodeList=[{title:"Season 1",id:0},{title:"Season 2",id:1},{title:"Season 3",id:2},{title:"Season 4",id:3}];
const actorsList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];
const networkList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];

class AdminCard extends Component {

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



	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, onSearchOptimizedSelect, onServiceSelect, onInjestSelect, selectedFilter, selectedFilterOptimezed, selectedFilterSevice, itemStatus, localItem, editingLocalItem, inputUploader, inputCreative,
		inputCopyright, inputRestrictions, inputStorageLocation, inputAcSource, onInputChange, inputProducer } = this.props;

		const Uploader = classNames({
			'field-text': true,
			'field__not-empty': inputUploader,
			'field__focused': this.state.focused && this.state.target == "uploader"
		});

		 const Producer = classNames({
			'field-text': true,
			'field__not-empty': inputProducer,
			'field__focused': this.state.focused && this.state.target == "producer"
		});

		 const Creative = classNames({
			'field-text': true,
			'field__not-empty': inputCreative,
			'field__focused': this.state.focused && this.state.target == "creative"
		});

		 const Copyrights = classNames({
			'field-text': true,
			'field__not-empty': inputCopyright,
			'field__focused': this.state.focused && this.state.target == "copyrights"
		});

		 const Restrictions = classNames({
			'field-text': true,
			'field__not-empty': inputRestrictions,
			'field__focused': this.state.focused && this.state.target == "restrictions"
		});

		 const Storage = classNames({
			'field-text': true,
			'field__not-empty': inputStorageLocation,
			'field__focused': this.state.focused && this.state.target == "storage"
		});

		 const AcSource = classNames({
			'field-text': true,
			'field__not-empty': inputAcSource,
			'field__focused': this.state.focused && this.state.target == "acSource"
		});


		return(
	      <Card title="Admin" id="admin">
			<CardSection>
					<div>

					{/*<div className={Uploader}>
					<label className="field__label">
				    Uploader
				    </label>
				    <input className="field-text__input"  id="uploader"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputUploader} onChange={this.props.onInputChange.bind(this)}/>
			        </div> */}

			        <FieldWidgets.Text
						label="Uploader"
						value={this.props.client.user.name}
					/>

			        <div className={Producer}>
					<label className="field__label">
				    Producer
				    </label>
				    <input className="field-text__input"  id="producer"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputProducer} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

			        <div className={Creative}>
					<label className="field__label">
				    Creative
				    </label>
				    <input className="field-text__input"  id="creative"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputCreative} onChange={this.props.onInputChange.bind(this)}/>
			        </div>
					<label className="admin-label"> Legal </label>
			        <div className={Copyrights}>
					<label className="field__label">
				    Copyrights
				    </label>
				    <input className="field-text__input"  id="copyrights"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputCopyright} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

			        <div className={Restrictions}>
					<label className="field__label">
				    Restrictions
				    </label>
				    <input className="field-text__input"  id="restrictions"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputRestrictions} onChange={this.props.onInputChange.bind(this)}/>
			        </div>
					<label className="admin-label"> Sources </label>

					<div className={Storage}>
					<label className="field__label">
				    Physical storage location
				    </label>
				    <input className="field-text__input"  id="storage"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputStorageLocation} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

			        <FieldWidgets.Text
						label="Storage Location"
					/>

			        <div className={AcSource}>
					<label className="field__label">
				    Acquisition source
				    </label>
				    <input className="field-text__input"  id="acSource"  onBlur={this.onBlur} onFocus={this.onFocus}  value={this.props.inputAcSource} onChange={this.props.onInputChange.bind(this)}/>
			        </div>

					
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

export default connect(mapStateToProps)(AdminCard);