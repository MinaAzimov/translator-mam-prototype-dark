import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from "classnames";
import $ from "jquery";
import BodyClass from './BodyClass';
import Switch from './form/Switch';
import socket from "../client/socketClient";

class Nav extends Component {

	constructor(props) {
		super(props);
		
	}

	componentDidMount() {
			
	}

	logout = () => {
		let sid = window.SESSION_ID;
		let userId = this.props.client.user.id;
	    socket.emit("LOGOUT", userId, sid);
	}

	handleClick() {
		let classname = 'user-role';
		classname = classname + ' dark-theme';
		$("body").toggleClass(classname);
	}

	render() {
		return (
			<div className="nav">
				{/*<div className="nav-heading">
					<img src="/assets/img/library/bee-logo.svg" />
				</div>*/}
				<div className="nav-list">
					{ /* <Link to="dashboard" activeClassName="nav-item__active-link"> */}
						<div className="nav-item" style={{'opacity': '0.2'}}>
							<i className="material-icons">home</i>
							Home 
						</div>
					{ /*</Link> */}

					{ /* <Link to="content" activeClassName="nav-item__active-link"> */}
						<div className="nav-item" style={{'opacity': '0.2'}}>
							<i className="material-icons">inbox</i>
							Work Orders 
						</div>
					{ /*</Link> */}

					<Link to="mam" activeClassName="nav-item__active-link">
						<div className="nav-item">
							<i className="iconcss icon-register-content-logo"></i>
							Register Content {/*New Article */}
						</div>				
					</Link>
					
					{ /* <Link to="edit" activeClassName="nav-item__active-link"> */}
						<div className="nav-item" style={{'opacity': '0.2'}}>
							<i className="material-icons">merge_type</i>
							Mapping {/*New Article */}
						</div>
					{ /*</Link> */}
					<div className="nav-item" style={{'opacity': '0.2'}}>
						<i className="material-icons">movie</i>
						<a href="#" onClick={this.props.toggleMediaOverlay}>Assets</a> {/*Media */}
					</div>	
					{/*<div className="nav-item disabled">Author</div>
					<div className="nav-item disabled">Collections</div>
					<div className="nav-item disabled">Configuration</div>*/}
				</div>
				<div className="nav-toolbelt" onClick={this.handleClick.bind(this)} style={{'opacity': '0.2'}} >
					<a style={{'bottom': '92px'}} >
						<i className="material-icons"></i>Switch Theme
					</a>
				</div>
				<div className="nav-toolbelt" onClick={this.logout} style={{'opacity': '0.4'}}>
					<a>
						<i className="iconcss icon-user"></i>Log Out
					</a>
				</div>
			</div>
			)
	}
}

const mapStateToProps = (state) => {
  return {
    client: state.client
  }
}

Nav = connect(mapStateToProps)(Nav);

export default Nav;
