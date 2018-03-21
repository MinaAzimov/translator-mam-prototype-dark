import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import socket from "../client/socketClient";

class UserSettingsMenu extends Component {


	logout = () => {
		let sid = window.SESSION_ID;
		let userId = this.props.client.user.id;
    socket.emit("LOGOUT", userId, sid);
	}

	render() {
		let { client } = this.props;
		return (
			<div className="user-settings-menu">
				<div className="user-settings-menu__list">
					<div className="user-settings-menu__item" onClick={this.logout}>
						Log out
					</div>
				</div>
			</div>
		)
	}
}

export default UserSettingsMenu;
