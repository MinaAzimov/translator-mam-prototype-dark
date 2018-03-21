import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import moment from "moment";

export default class UploadCountdown extends Component {

	static defaultProps = {
		timeout: 2000,
		startedAt: 0
	}


	constructor(props) {
		super(props);
		this.state = {
			progress: 0 // 0 - 100
		}
	}

	componentDidMount() {
		const numIntervals = Math.floor(this.props.timeout / 30);
		this.interval = setInterval(()=> {
			console.log(Date.now() - this.props.startedAt);
			if (Date.now() - this.props.startedAt > 12000) {
				this.props.onHitTranscode();
			}
			this.forceUpdate();
		}, 16);
	}

	componentDidUpdate() {
		if (Date.now() - this.props.startedAt >= this.props.timeout) {
			clearInterval(this.interval);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let progress; // 0 - 100
    let d = this.props.timeout + this.props.startedAt - Date.now();
    let timeRemaining = moment.utc(d).format("mm:ss");
		return (
			<span>{timeRemaining}</span>
		)
	}
}
