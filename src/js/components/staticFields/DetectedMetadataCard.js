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

class DetectedMetadataCard extends Component {



	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, onSearchOptimizedSelect, onServiceSelect, onInjestSelect, selectedFilter, selectedFilterOptimezed, selectedFilterSevice, itemStatus } = this.props;

		return(
	      <Card title="Detected Technical Metadata" id="metadata">
			<CardSection>
				{(this.props.target.type == "video" || this.props.target.type == "video/mp4")  ? (
					<div>
						<Field field={fields[60]} detected={mediaTypeList[0]}>
						<Selectbox
						helpText=""
						label="Media Type Class"
						items={mediaTypeList}
						/>
						</Field>
						<FieldWidgets.Text
						label="File Name"
						value={this.props.target.name}
						required={true}
						/>
						<FieldWidgets.Text
						label="File Type"
						value={this.props.target.type}
						required={true}
						/>
						<FieldWidgets.Text
						label="File Size"
						value={this.props.target.size}
						/>
						<FieldWidgets.Text
						label="Total Run Time"
						value="01:15:23"
						/>
						<Field field={fields[58]} detected={fileIncList[1]}>
						<Selectbox
						helpText=""
						label="File Size Increment"
						items={fileIncList}
						/>
						</Field>
						<FieldWidgets.Text
						label="Date Created"
						value={moment.unix(this.props.target.lastModified).format("HH:mm:ss")}
						/>
						<FieldWidgets.Text
						label="Display Width"
						value={"1200 px"}
						/>
						<FieldWidgets.Text
						label="Display Height"
						value={"720 px"}
						/> 
					</div> 
					) : (
					<div>
						<Field field={fields[75]} detected={mediaTypeList[1]}>
						<Selectbox
						helpText=""
						label="Media Type Class"
						items={mediaTypeList}
						/>
						</Field>
						<FieldWidgets.Text
						label="File Name"
						value={this.props.target.name}
						required={true}
						/>
						<FieldWidgets.Text
						label="File Type"
						value={this.props.target.type}
						required={true}
						/>
						<FieldWidgets.Text
						label="File Size"
						value={this.props.target.size}
						/>
						<Field field={fields[58]} detected={fileIncList[0]}>
						<Selectbox
						helpText=""
						label="File Size Increment"
						items={fileIncList}
						/>
						</Field>
						<FieldWidgets.Text
						label="Date Created"
						value={moment
							.unix(this.props.target.lastModified)
							.format("HH:mm:ss")}
						/>
						<FieldWidgets.Text
						label="Display Width"
						value={this.props.target.width + " " + "px"}
						/>
						<FieldWidgets.Text
						label="Display Height"
						value={this.props.target.height + " " + "px"}
						/> 
						<FieldWidgets.Text label="Lattitude" value="85.05"/>
						<FieldWidgets.Text label="Longitude" value="180"/>
						<FieldWidgets.Text label="Model" value="Canon EOS 5D Mark III"/>
						<FieldWidgets.Text label="Serial #" value="142027003573"/>
						<FieldWidgets.Text label="Firmware" value="P330i"/>
						<FieldWidgets.Text label="Frame #" value="10" />
						<FieldWidgets.Text label="Lens (mm)" value="135" />
						<FieldWidgets.Text label="ISO" value="1600"/>
						<FieldWidgets.Text label="Aperture" value="2"/>
						<FieldWidgets.Text label="Shutter" value="1/250"/>
						<FieldWidgets.Text label="Exp. Comp." value="-0.3"/>
						<FieldWidgets.Text label="Flash Comp." value="1.2"/>
						<FieldWidgets.Text label="Program" value="Aperture Priority"/>
						<FieldWidgets.Text label="Focus Mode" value="High" />
						<FieldWidgets.Text label="White Bal." value="3" />
						<FieldWidgets.Text label="ICC Profile" value="sRGB Profile"/>
						<FieldWidgets.Text label="Contrast" value="luminance"/>
						<FieldWidgets.Text label="Sharpening" value="Capture"/>
						<FieldWidgets.Text label="Quality" value="Low" />
						<FieldWidgets.Text label="Orientation" value="Landscape" />
						<FieldWidgets.Text label="Creator" value="Marco Materazzi" />
						<FieldWidgets.Text label="Territory" value="EC" />
					</div>
					)}
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

export default connect(mapStateToProps)(DetectedMetadataCard);