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
import Text from "../form/Text";
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
const actorsList=[{title:"Actor 1",id:0},{title:"Actor 2",id:1},{title:"Actor 3",id:2},{title:"Actor 4",id:3}];
const languageList=[{title:"English",id:0},{title:"Spanish",id:1},{title:"Chinese",id:2},{title:"Russian",id:3}];
const networkList=[{title:"Kb",id:0},{title:"Mb",id:1},{title:"Gb",id:2}];

class AdditionalInfoCard extends Component {


	render() {

		const thumbSrc = "/assets/img/icons/video-placeholder.jpg";
		const { closeFilesInformation, fields, target, selected, onSearchOptimizedSelect, onServiceSelect, onInjestSelect, selectedFilter, selectedFilterOptimezed, selectedFilterSevice, itemStatus,
		updateHouseID, updateComposition, updateColor, updatePromoCode, inputHouseID, inputComposition, inputColor, inputPromoCode, inputDescription, inputUploader, inputKeywords, inputProductionType, 
		inputActors, inputNetwork, inputLanguage, inputCopyright, inputRestrictions, updateDescription, updateUploader, updateKeywords, updateProductionType, updateActors,
		updateNetwork, updateLanguage, updateCopyright, updateRestrictions, localItem, editingLocalItem } = this.props;

		return(

			       <Card
					title="Additional Fields"
					id="additional"
					classname="card"
					>
					 <form>

					<CardSection>
					 {(this.props.target.type == "video" || this.props.target.type == "video/mp4")  ? (
						<div>
					
				    <div className="field-text">
				    <label className="field__label">
				    House ID
				    </label>
				    <input className="field-text__input" placeholder="HouseID" value={this.props.inputHouseID} onChange={this.props.updateHouseID.bind(this)}/>
			        </div>
					

				
					<div className="field-text">
				    <label className="field__label">
				    Description
				    </label>
				    <input className="field-text__input"  value={this.props.inputDescription} onChange={this.props.updateDescription.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Uploader
				    </label>
				    <input className="field-text__input"  value={this.props.inputUploader} onChange={this.props.updateUploader.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Keywords
				    </label>
				    <input className="field-text__input"  value={this.props.inputKeywords} onChange={this.props.updateKeywords.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Production Type
				    </label>
				    <input className="field-text__input"  value={this.props.inputProductionType} onChange={this.props.updateProductionType.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Actors
				    </label>
				    <input className="field-text__input"  value={this.props.inputActors} onChange={this.props.updateActors.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Network
				    </label>
				    <input className="field-text__input"  value={this.props.inputNetwork} onChange={this.props.updateNetwork.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Language
				    </label>
				    <input className="field-text__input"  value={this.props.inputLanguage} onChange={this.props.updateLanguage.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Copyright
				    </label>
				    <input className="field-text__input"  value={this.props.inputCopyright} onChange={this.props.updateCopyright.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Restrictions
				    </label>
				    <input className="field-text__input"  value={this.props.inputRestrictions} onChange={this.props.updateRestrictions.bind(this)}/>
			        </div>
					</div> ) : (

					<div>
					<div className="field-text">
				    <label className="field__label">
				    House ID
				    </label>
				    <input className="field-text__input"  value={this.props.inputHouseID} onChange={this.props.updateHouseID.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Composition
				    </label>
				    <input className="field-text__input"  value={this.props.inputComposition} onChange={this.props.updateComposition.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Color
				    </label>
				    <input className="field-text__input"  value={this.props.inputColor} onChange={this.props.updateColor.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Promo Code
				    </label>
				    <input className="field-text__input"  value={this.props.inputPromoCode} onChange={this.props.updatePromoCode.bind(this)}/>
			        </div>

					<div className="field-text">
				    <label className="field__label">
				    Description
				    </label>
				    <input className="field-text__input"  value={this.props.inputDescription} onChange={this.props.updateDescription.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Uploader
				    </label>
				    <input className="field-text__input"  value={this.props.inputUploader} onChange={this.props.updateUploader.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Keywords
				    </label>
				    <input className="field-text__input"  value={this.props.inputKeywords} onChange={this.props.updateKeywords.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Production Type
				    </label>
				    <input className="field-text__input"  value={this.props.inputProductionType} onChange={this.props.updateProductionType.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Actors
				    </label>
				    <input className="field-text__input"  value={this.props.inputActors} onChange={this.props.updateActors.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Network
				    </label>
				    <input className="field-text__input"  value={this.props.inputNetwork} onChange={this.props.updateNetwork.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Language
				    </label>
				    <input className="field-text__input"  value={this.props.inputLanguage} onChange={this.props.updateLanguage.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Copyright
				    </label>
				    <input className="field-text__input"  value={this.props.inputCopyright} onChange={this.props.updateCopyright.bind(this)}/>
			        </div>
					<div className="field-text">
				    <label className="field__label">
				    Restrictions
				    </label>
				    <input className="field-text__input"  value={this.props.inputRestrictions} onChange={this.props.updateRestrictions.bind(this)}/>
			        </div>

					</div>
					)
				}
					</CardSection>
					</form>
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

export default connect(mapStateToProps)(AdditionalInfoCard);