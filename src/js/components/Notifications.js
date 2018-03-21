import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getNotificationFromAction } from '../client/notifications'
import classNames from 'classnames';
import moment from 'moment';
import { readAllNotifications } from '../actions';
import { browserHistory } from 'react-router';

class Notifications extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isOpen: false
		}
	}

	componentDidMount() {
		// Refreshes the component every 30 seconds to update time
		this.interval = setInterval(() => {
			this.forceUpdate();
		}, 30000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	toggleOpen = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
		this.props.dispatch(readAllNotifications());
	}

	itemClick (link) {
		browserHistory.push(link);
		this.setState({
			isOpen: false
		});
	}

	render() {
		let { notifications } = this.props;
		let numUnread = notifications.filter(n => !n.isRead).length;
		let count = notifications.length;
		let classnames = classNames({
			"notifications": true,
			"notifications--open": this.state.isOpen
		})
		return (
			<div className={classnames}>
				<div className="notifications-trigger" onClick={this.toggleOpen}>
					<i className="fa fa-bell"></i>
				</div>
				{
					numUnread > 0 ?
						<div className="notifications-count">
							{ numUnread }
						</div>
					:
						null
				}
				<div className="notifications-list">
				{
					notifications.length > 0 ?
						notifications.reverse().map((n,index) => {
							let item = getNotificationFromAction(n.action);
							let time = moment(item.timestamp).fromNow();
							let imgSrc = item.imgSrc;
							return (
								<div className="notification-item list-item" key={index} onClick={this.itemClick.bind(this, item.link)}>
									<div className="list-item__inner">
										<div className="list-item__img">
											<img src={"/assets" + imgSrc} />
										</div>
										<div className="list-item__text">
											<div className="list-item__line1">{item.text}</div>
											<div className="list-item__line2">{time}</div>			
										</div>
									</div>
								</div>
							)
						})
					:
						<div className="notification-item notification-item--empty">
						You have no new notifications
						</div>
				}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    notifications: state.client.notifications
  }
}

export default connect(mapStateToProps)(Notifications);



