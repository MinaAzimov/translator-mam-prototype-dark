import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class FileUploadProgress extends Component {

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
		progress = Math.min(((Date.now() - this.props.startedAt) / this.props.timeout) * 100, 100);

		let classnames = classNames({
			'file-upload-progress': true
		})

		return (
			<div className={classnames}>
				<div className="file-upload-progress__completed" style={{width: progress + "%"}}></div>
			</div>
		)
	}
}
