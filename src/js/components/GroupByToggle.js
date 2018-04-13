import React, { Component, PropTypes } from 'react';

import classNames from "classnames";


export default class GroupByToggle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actionsOptionsOpen: false
		};
	}

	/*toggleGroupBy = () => {
	    this.setState({
	      groupByStatus: !this.state.groupByStatus
	    });
	}*/

	handleClickOutside = (event) => {
		(!this.refs.wrapper.contains(event.target)) ? (
			this.setState({
				actionsOptionsOpen: false
			})
		) : null;
	}

	openActionsOptions = () => {
		this.setState({
			actionsOptionsOpen: !this.state.actionsOptionsOpen
		});
	}

	componentDidMount() {
			document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
			document.removeEventListener('mousedown', this.handleClickOutside);
	}

	render() {
		const { actionsOptionsOpen } = this.state;
		const { toggle, groupByStatus } = this.props;

		const classnames = classNames({
			"group-by": true,
			"group-by--open": actionsOptionsOpen
		})

		return (
			<div className={classnames}>
				{/*<div className="actions-header actions-header--left">
					<GroupByToggle 
					toggle={this.toggleGroupBy}
					groupByStatus={this.state.groupByStatus}
					/>
				</div>*/}
				<div onClick={this.openActionsOptions}>
					<i className="iconcss icon-group-by"></i>
					<span>Group By: { groupByStatus ? 'Status' : 'File Type'}</span>
				</div>
				<ul className="actions-header-options" ref="wrapper">
					<li><a onClick={() => {toggle(); this.openActionsOptions()}}><i className="iconcss icon-file-types"></i> File Type</a></li>
					<li><a onClick={() => {toggle(); this.openActionsOptions()}}><i className="iconcss icon-statuses"></i> Status</a></li>
				</ul>
			</div>
		);
	}
}