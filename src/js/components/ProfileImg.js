import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { staticUrl } from '../lib/utils';
export default class ProfileImg extends Component {
	render() {
		let imgSrc = this.props.user.avatarImgPath;
		let colorProfile = this.props.user.colorProfile;
		let classnames = classNames({
			"profile-img": true,
			"profile-img--big": this.props.size === "big"
		}, "theme-color-background-" + colorProfile);
		return (
			<div className={classnames} title={this.props.user.name}>
				<div className="profile-img__photo">
					<img src={staticUrl(imgSrc)} />
				</div>
			</div>
		)
	}
}