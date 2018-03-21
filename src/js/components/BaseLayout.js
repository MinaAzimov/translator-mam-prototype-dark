import React, { Component, PropTypes } from 'react';
import TopHeader from './TopHeader';
import Nav from './Nav';
import $ from "jquery";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import classNames from "classnames";
import MediaOverlay from './MediaOverlay';
import BodyClass from './BodyClass';



class BaseLayout extends Component {

	constructor(props) {
		super(props);
		this.state = {
			navOpen: false,
			mediaOverlayOpen: false
		}
	}

	componentDidMount() {
			let classname = 'user-role--' + this.props.client.user.role;
			 classname = classname + ' dark-theme';
			$("body").addClass(classname);
	}

	toggleNav = () => {
		this.setState({
			navOpen: !this.state.navOpen
		})
	}

	toggleMediaOverlay = () => {
		this.setState({
			mediaOverlayOpen: !this.state.mediaOverlayOpen
		})
	}

	render() {
		let userRole = this.props.client.user.role;

		const classnames = classNames({
			'page-base': true,
			'nav--open': this.state.navOpen,
		}, 'user-role--' + userRole);

		return (
			<div className={classnames}>
				<BodyClass className={'user-role--' + this.props.client.user.role} />
				<TopHeader pageTitle={this.props.pageTitle}/>
				<Nav toggleMediaOverlay={this.toggleMediaOverlay} />
				<div className="nav-trigger" onClick={this.toggleNav}>
					<span></span>
				</div>
				<div className="main">
					{this.props.children}
				</div>
        <MediaOverlay
          show={this.state.mediaOverlayOpen}
          onClose={this.toggleMediaOverlay}
          onSubmit={this.toggleMediaOverlay}
          multi={true}
          mode="SAVE"
          cancelCaption="Close"
        />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    client: state.client
  }
}


BaseLayout = DragDropContext(HTML5Backend)(BaseLayout);
BaseLayout = connect(mapStateToProps)(BaseLayout);

export default BaseLayout;
