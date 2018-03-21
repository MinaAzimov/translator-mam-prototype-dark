import React, { Component, PropTypes } from 'react';
import DelayChain from '../lib/delayChain.js';
import classNames from 'classnames';

export default class SlideDown extends Component {

	static defaultProps = {
		classPrefix: "slide-down"
	}

	constructor(props) {
		super(props);
		this.dc = new DelayChain();
		let openPhase = this.props.isOpen ? "open" : "closed";
		this.state = {
			openPhase: openPhase
		}
	}

	open() {
		this.dc.cancel();
		this.setState({
			openPhase: "open-start"
		})
		this.dc.delay(20, () => {
			this.setState({
				openPhase: "opening"
			})
		}).delay(this.props.duration, () => {
			this.setState({
				openPhase: "open"
			})
		})
	}

	close () {
		this.dc.cancel();
		this.setState({
			openPhase: "close-start"
		})		
		this.dc.delay(20, () =>{
			this.setState({
				openPhase: "closing"
			})
		}).delay(this.props.duration, () => {
			this.setState({
				openPhase: "closed"
			})
		})		
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen && !this.props.isOpen) {
			this.open();
		}
		else if (!nextProps.isOpen && this.props.isOpen) {
			this.close();
		}
	}

	getContainerStyle() {
		const openPhase = this.state.openPhase;
		switch (openPhase) {
			case "open-start":
				return {
					height: "0",
					overflow: "hidden"
				}
			case "opening":
				return {
					height: this.refs.content.offsetHeight,
					overflow: "hidden"
				}
			case "open":
				return {
					height: "auto",
					overflow: "visible"
				}
			case "close-start":
				return {
					height: this.refs.content.offsetHeight,
					overflow: "hidden"
				}
			case "closing":
			case "closed":
				return {
					height: 0,
					overflow: "hidden"
				}
		}
	}

	render () {

		const { openPhase } = this.state;
		const { classPrefix } = this.props;
		const classnames = classNames({
			'slide-down': true
		}) + ' ' + classPrefix + '--' + this.state.openPhase;

		let style = this.getContainerStyle();

		return (
			<div className={classnames} style={style}>
				<div className="slide-down__inner" ref="content">
					{ 
						openPhase !== "closed" ?
							this.props.children 
						:
							null
					}
				</div>
			</div>
		)
	}


}