import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ProfileImg from "./ProfileImg";
import classNames from 'classnames';
import socket from "../client/socketClient";
import { Modal } from 'react-bootstrap';
import Field from './Field';
import Switch from './form/Switch';
import Prompt from './Prompt';
import $ from "jquery";

class EditPageHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			publishModalOpen: false,
			mobileNotification: false
		}
	}

	onClickRevert = () => {
		socket.emit("REVERT_CONTENT");
	}

	toggleMobileNotification = () => {
		this.setState({
			mobileNotification: !this.state.mobileNotification
		})
	}

	showPreview = (e) => {
		e.preventDefault();
		window.open("/preview", "_blank", "toolbar=no,width=1000,height=700,left=1300");
	}

	lock = (e) => {
		e.preventDefault();
		if (this.props.lockedBy	=== null) {
					socket.emit("LOCK_CONTENT", this.props.client.user.id);
		}
		else {
					socket.emit("LOCK_CONTENT");
		}
	}

	savePublish = (e) => {
		e.preventDefault();
		socket.emit("PUBLISH_CONTENT");
		this.setState({
			publishModalOpen: false,
			mobileNotification: false
		})
	}

	openPublishModal = (e) => {
		e.preventDefault();
		this.setState({
			publishModalOpen: true
		})
	}

	closePublishModal = (e) => {
		if (e) {
			e.preventDefault();
		}
		this.setState({
			publishModalOpen: false
		})
	}

	componentDidMount() {
    // This code should eventually be replaced
    $('.header-controls-trigger').click( function() {
      $(".header-controls-wrapper").toggleClass("open");
    });
  }

	render() {
		const {publishModalOpen, mobileNotification} = this.state;
		const { client, users, isChanged, lockedBy, homepageField, postToTwitterField } = this.props;
		const classnames = classNames({
			'edit-page-header': true,
			'edit-page-header--show-changed': isChanged
		})
		const allowedToLock = ([
			"USER_ROLE_COPYEDITOR",
			"USER_ROLE_HOTSEAT",
			"USER_ROLE_NEWSASSOCIATE"
		]).indexOf(client.user.role) !== -1;

		return (
			<div className="edit-page-header__wrapper">
				<div className={classnames}>
					<div className="edit-page-header__users">
						<div className="users-editing">Currently editing<span>:</span></div>
						{
							users.map((user,index)=>{
								return (
									<div className="edit-page-header__user-item" key={index}>
										<ProfileImg user={user} />
									</div>
								)
							})
						}
					</div>
					<div className="edit-page-header__controls">
						<button className="button button_style_transparent-gray header-controls-trigger">
							<i className="fa fa-ellipsis-v"></i>
							<div className="header-status-text">Modified</div>
						</button>
						<div className="header-controls-wrapper">

						{
							allowedToLock ?
							  <button className="edit-page-header__lock" onClick={this.lock}>
							  	{
							  		lockedBy !== null ?
							  			<span><i className="fa fa-lock"></i>Lock</span>
							  		:
							  			<span><i className="fa fa-unlock"></i>Lock</span>
							  	}
							  </button>
							 :
							 	null
						}
							<button onClick={this.showPreview}>Preview</button>
							<div className="edit-page-header__on-change">
								<div className="edit-page-header__on-change-inner">
									<div className="edit-page-header__modified">Modified</div>
									<div>
										<button onClick={this.onClickRevert}>Revert changes</button>
										<button>Save as...</button>
										<button onClick={this.openPublishModal}>Publish</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>


				<Prompt
          show={publishModalOpen}
          onCancel={this.closePublishModal}
          onSubmit={this.savePublish}
          header={<h2 className="licensing-popup__title">Are you sure you want to publish?</h2>}
          cancelText="Cancel"
          submitText="Publish"
          className="publish-prompt dark-prompt"
        >
        <div className="show-to-USER_ROLE_HOTSEAT">
	        <div className="field-wrapper">
	        	<Switch value={mobileNotification} onChange={this.toggleMobileNotification} label="Send mobile notification"/>
	        </div>
	        <div className="field-wrapper--spaced">
		        <Field field={homepageField}>
		          <Switch/>
		        </Field>
	        </div>

	        <Field field={postToTwitterField}>
	          <Switch/>
	        </Field>	      
	      </div>
        </Prompt>



			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    client: state.client,
    isChanged: state.contentItem.isChanged,
    lockedBy: state.contentItem.lockedBy,
    homepageField: state.fields[32],
    postToTwitterField: state.fields[33]
  }
}

export default connect(mapStateToProps)(EditPageHeader);
