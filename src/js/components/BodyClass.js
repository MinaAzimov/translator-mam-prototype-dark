import React, { Component, PropTypes } from 'react';
import $ from "jquery";

class BodyClassManager {

	constructor() {
		this.classnames = {};
	}

	add(classname) {
		let item = this.classnames[classname];
		if (item === undefined) {
			this.classnames[classname] = 1;
			$("body").addClass(classname);
		}
		else {
			this.classnames[classname]++;
		}
	}

	remove(classname) {
		let item = this.classnames[classname];
		if (item === undefined) {
			return;
		}
		else {
			this.classnames[classname]--;
			if (this.classnames[classname] === 0) {
				$("body").removeClass(classname);
				delete this.classnames[classname];
			}
		}
	}
}

const bodyClassManager = new BodyClassManager();

export default class BodyClass extends Component {
	
	static defaultProps = {
		className: "",
		manager: bodyClassManager
	}

	componentDidMount() {
		this.props.manager.add(this.props.className);
	}

	componentWillUnmount() {
		this.props.manager.remove(this.props.className);
	}

	componentDidUpdate(prevProps) {
		if (this.props.className !== prevProps.className) {
			this.props.manager.remove(prevProps.className);
			this.props.manager.add(this.props.className);
		}
	}

	render() {
		return null;
	}

}

