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
const contentTypeList=[{title:"Show",id:0},{title:"Event",id:1},{title:"Promo",id:2},{title:"Uncategorized",id:3}];

class BasicInfoCard extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	addNewFields = val => {
		console.log(val);
		this.setState({
			"contentType": val
		})
		let element;
		if ( val.title == "Event") {
			element = (
			    <div>
			      <h1>Hello, world!</h1>
			      <h2>It is {new Date().toLocaleTimeString()}.</h2>
			    </div>
			  );
		}
		// ReactDOM.render(element, document.getElementById('hiddenFields'));
	};

	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, onSearchOptimizedSelect, onServiceSelect, onInjestSelect, selectedFilter, selectedFilterOptimezed, selectedFilterSevice, itemStatus } = this.props;

		return(

			       <Card title="Basic Info" id="basic-info">
					<CardSection>
					<div>
					{(this.props.target.type == "video" || this.props.target.type == "video/mp4")  ? (
					<div>
						<Field field={fields[57]}>
						<Selectbox
						helpText=""
						label="Material Type"
						items={typeListVideo}
						inputPlaceholder="Type source"
						/>
						</Field>
						<Selectbox
						helpText=""
						label="Secondary Type"
						items={secondaryTypeListVideo}
						inputPlaceholder="Type source"
						onChange={this.props.onInjestSelect}
						value={this.props.selectedFilter}
						required={true}
						/>
						<Selectbox
						helpText=""
						label="Content Type"
						items={contentTypeList}
						onChange={this.addNewFields}
						value={this.state.contentType}
						inputPlaceholder="Type source"
						required={true}
						/>
						<div style={{display: ((this.state.contentType != null) &&(this.state.contentType.title == "Show")) ? 'block' : 'none' }}>
							<Field field={fields[64]}>
							<Selectbox
							helpText=""
							label="Show"
							items={showList}
							inputPlaceholder="Type source"
							onChange={this.props.onSearchOptimizedSelect}
							value={this.props.selectedFilterOptimezed}
							required={true}
							/>
							</Field>
							<Field field={fields[65]}>
							<Selectbox
							helpText=""
							label="Season"
							items={episodeList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
							<FieldWidgets.Text label="Episode Number" />
						</div>
						<div style={{display: ((this.state.contentType != null) &&(this.state.contentType.title == "Promo")) ? 'block' : 'none' }}>
							<Field field={fields[64]}>
							<Selectbox
							helpText=""
							label="Show"
							items={showList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
							<Field field={fields[65]}>
							<Selectbox
							helpText=""
							label="Season"
							items={episodeList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
						</div>

						<Field field={fields[61]}>
						<Selectbox
						helpText=""
						label="Frame Rate"
						items={frameRateList}
						inputPlaceholder="Type source"
						required={true}
						/>
						</Field>

						<Selectbox
						helpText=""
						label="Aspect Ratio"
						items={aspectRatioList}
						inputPlaceholder="Type source"
						onChange={this.props.onServiceSelect}
						value={this.props.selectedFilterSevice}
						/>

						<FieldWidgets.Text 
						label="Network" 
						value={this.props.client.user.brand}
						/>
						<FieldWidgets.Text 
						label="Uploader" 
						value={"(You) " + this.props.client.user.name}
						/>
						<FieldWidgets.Text
						label="Team"
						value={this.props.client.user.team}
						/>
					</div>
					) : ( 
					<div>
						<Field field={fields[74]}>
						<Selectbox
						helpText=""
						label="Material Type"
						items={typeListImage}
						inputPlaceholder="Type source"
						/>
						</Field>
						<Selectbox
						helpText=""
						label="Secondary Type"
						items={secondaryTypeListImage}
						inputPlaceholder="Type source"
						onChange={this.props.onInjestSelect}
						value={this.props.selectedFilter}
						required={true}
						/>
						<Selectbox
						helpText=""
						label="Content Type"
						items={contentTypeList}
						onChange={this.addNewFields}
						value={this.state.contentType}
						inputPlaceholder="Type source"
						required={true}
						/>
						<div style={{display: ((this.state.contentType != null) &&(this.state.contentType.title == "Show")) ? 'block' : 'none' }}>
							<Field field={fields[64]}>
							<Selectbox
							helpText=""
							label="Show"
							items={showList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
							<Field field={fields[65]}>
							<Selectbox
							helpText=""
							label="Season"
							items={episodeList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
							<FieldWidgets.Text label="Episode Number" />
						</div>
						<div style={{display: ((this.state.contentType != null) &&(this.state.contentType.title == "Promo")) ? 'block' : 'none' }}>
							<Field field={fields[64]}>
							<Selectbox
							helpText=""
							label="Show"
							items={showList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
							<Field field={fields[65]}>
							<Selectbox
							helpText=""
							label="Season"
							items={episodeList}
							inputPlaceholder="Type source"
							required={true}
							/>
							</Field>
						</div>
						<Selectbox
						helpText=""
						label="Aspect Ratio"
						items={aspectRatioList}
						inputPlaceholder="Type source"
						onChange={this.props.onServiceSelect}
						value={this.props.selectedFilterSevice}
						/>
						<FieldWidgets.Text 
						label="Network" 
						value={this.props.client.user.brand}
						/>
						<FieldWidgets.Text 
						label="Uploader" 
						value={"(You) " + this.props.client.user.name}
						/>
						<FieldWidgets.Text
						label="Team"
						value={this.props.client.user.team}
						/>
					</div>
					)
					}
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

export default connect(mapStateToProps)(BasicInfoCard);