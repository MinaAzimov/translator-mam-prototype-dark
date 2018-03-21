import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class Nav extends Component {
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
				{/*<div className="nav-toolbelt">
					<a href="http://toolbelt.cnbc.com">
						<i className="iconcss icon-toolbelt-logo"></i> Go to toolbelt
					</a>
				</div>*/}
			</div>
		)
	}
}
