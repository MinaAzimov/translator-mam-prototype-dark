require("waypoints/lib/noframework.waypoints.js");

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class WaypointReact extends Component {

	componentDidMount () {
		this.waypoint = new Waypoint({
		  element: this.refs.container,
		  handler: (direction) => {
		  	this.props.handler(direction);
		  },
		  offset: this.props.offset
		})
	}

	componentWillUnmount() {
		this.waypoint.destroy();
	}

	render() {
		return (
			<span ref="container"></span>
		)
	}
}



