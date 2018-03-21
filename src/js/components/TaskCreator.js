import React, { Component, PropTypes } from 'react';
import { getUserData } from '../services/users';
import Selectbox from './form/Selectbox';
import Text from './form/Text';
import { getAllUsers } from '../services/users';
import { getTaskTypes } from '../services/tasks';
import { connect } from 'react-redux';
import socket from "../client/socketClient";
import classNames from "classnames";

import { TASK_PRIORITY_HIGH, TASK_PRIORITY_LOW, TASK_PRIORITY_MEDIUM } from '../constants'

const actionOptions = getTaskTypes();

const usersList = (getAllUsers()).map((user,index) => {
	return {
		id: user.id,
		title: user.name
	}
});


const priorityList = [
	{
		title: "High",
		id: TASK_PRIORITY_HIGH
	},
	{
		title: "Medium",
		id: TASK_PRIORITY_MEDIUM
	},
	{
		title: "Low",
		id: TASK_PRIORITY_LOW
	},

]


class TaskCreator extends Component {

	constructor(props) {
		super(props);
		this.state={
			selectedAction: null,
			selectedUser: null,
			selectedPriority: null,
			memo: "",
			justAssigned: false
		}
	}

	setMemo = (newVal) => {
		this.setState({
			memo: newVal
		});
	}

	selectAction = (val) => {
		this.setState({
			selectedAction: val
		});
	}

	selectUser = (val) => {
		this.setState({
			selectedUser: val
		});
	}

	selectPriority = (val) => {
		this.setState({
			selectedPriority: val
		});
	}

	reset = () => {
		this.setState({
			justAssigned: false
		});
	}

	submit = (e) => {
		e.preventDefault();
		const { client } = this.props;
		let { selectedUser, selectedAction, selectedPriority, memo } = this.state;
		if (!selectedUser || !selectedAction || !selectedPriority) {
			console.log("task form invalid!");
			return;
		}

		let userId = selectedUser.id;
		let actionId = selectedAction.id;
		let priorityId = selectedPriority.id;
    socket.emit("ADD_TASK", userId, actionId, priorityId, client.user.id, memo, 1); // 1 is the conten id
    this.setState({
    	selectedAction: null,
			selectedUser: null
    })

    if (this.props.onSave) {
    	this.props.onSave();
    }
	}

	render() {
		let { selectedUser, selectedAction, justAssigned, memo, selectedPriority } = this.state;
		return (
			<div className="task-creator">
				{
					justAssigned ?
						<div>
							<div className="task-creator__success">
								Task has been assigned!
							</div>
							<button onClick={this.reset}>Create another task</button>
						</div>
					:
						<form onSubmit={this.submit}>
							<div className="field-wrapper">
								<Selectbox
									label="Action"
									value={selectedAction}
									items={actionOptions}
									onChange={this.selectAction}
								/>
							</div>
							<div className="field-wrapper">
								<Selectbox
									label="Assign to (choose user)"
									value={selectedUser}
									items={usersList}
									onChange={this.selectUser}
									search={true}
								/>
							</div>
							<div className="field-wrapper">
								<Selectbox
									label="Choose priority for this task"
									value={selectedPriority}
									items={priorityList}
									onChange={this.selectPriority}
								/>
							</div>
							<div className="field-wrapper">
								<Text value={memo} label="Memo (optional)" onChange={this.setMemo} helpText="Write a memo that will help the receiver to understand what the task is. (optional)"/>
							</div>
							<div className="form-cta">
								<button type="submit" className="task-creator__submit">Assign task</button>
								<button className="task-creator__cancel" onClick={this.props.onSave}>Cancel</button>
							</div>
						</form>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    client: state.client
  }
}

export default connect(mapStateToProps)(TaskCreator);
