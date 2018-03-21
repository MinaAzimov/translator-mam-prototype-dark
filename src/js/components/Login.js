import React, { Component, PropTypes } from 'react';
import socket from "../client/socketClient";
import ProfileImg from "./ProfileImg";

import { getAllUsers } from "../services/users";
import { getRoleConfig } from "../services/roles";

import Selectbox from "./form/Selectbox";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
//import { fetch } from "fetch";
import $ from "jquery";
import * as Cookies from "js-cookie";

let allUsers = getAllUsers();









class Login extends Component {

	constructor(props) {
		super(props);
		this.state={
			selectedUser: null
		}

	}

	submit = (e) => {
		e.preventDefault();
		let selectedUser = this.state.selectedUser;
		if (!selectedUser) {
			return;
		}
		// Get the session cookie
		let sid = window.SESSION_ID;
		let userId = selectedUser.user.id;
    socket.emit("LOGIN", userId, sid);
	}

	onSelect = (val) => {
		this.setState({
			selectedUser: val
		})
	}

	render() {
		let { selectedUser } = this.state;
		let loggedOutUsers = allUsers.filter(user=> {
			let loggedInUser = this.props.users.find(loggedInUser => loggedInUser.id === user.id);
			return (loggedInUser === undefined);
		});
		let selectItems = loggedOutUsers.map((user,index) => {
			let roleConfig = getRoleConfig(user.role);
			return {
				title: user.name,
				subtitle: roleConfig.label,
				id: user.id,
				user: user
			}
		});

		return (
			<div className="login">
				<form className="login-form card" onSubmit={this.submit}>
					<div className="login-img__wrapper">
						 <ReactCSSTransitionGroup transitionName="login-img__img" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
						{
							selectedUser ?
								<div className="login-img__img" key={selectedUser.user.id}>
									<div className="login-img__profile">
										<img src={"/assets" + selectedUser.user.avatarImgPath } />
									</div>
								</div>
							:
								<div className="login-img__img" key={-1}>
									<div className="login-img__profile">
										<img src="/assets/img/avatar/generic.jpg" />
									</div>
								</div>
						}
						</ReactCSSTransitionGroup>
					</div>
					<label className="login-label">
						Select your user
					</label>
					<Selectbox
						onChange={this.onSelect}
						value={selectedUser}
						helpText=""
						label="Name / Role"
						items={selectItems}
						search={false}
						allowCustomText={false}
						showComplex={true}
						inputPlaceholder=""
						disableNone
					/>
					<button type="submit">Log in</button>
				</form>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(mapStateToProps)(Login);
