import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../services/users';
import moment from "moment";
import TaskCreator from './TaskCreator';
import SlideDown from './SlideDown';
import { Modal } from 'react-bootstrap';
import Prompt from './Prompt';

class TaskList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			addTaskOpen: false
		}
	}

	componentDidMount() {
		// Refreshes the component every 30 seconds to update time
		this.interval = setInterval(() => {
			this.forceUpdate();
		}, 30000)
	}

	addClick = (e) => {
		e.preventDefault();
		this.setState({
			addTaskOpen: true
		})
	}

	onSave = (e) => {
		this.setState({
			addTaskOpen: false
		})
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let tasks = this.props.tasks.filter(task=>task.associatedContentId === 1);
		let { addTaskOpen } = this.state;
		return (
			<div className="task-list__wrapper">
				<div className="task-list">
					{
						tasks.map((task,index) => {
							let user = getUserData(task.assignedTo);
							let assigner = getUserData(task.assignedBy);
							let m = moment(task.assignedAt).fromNow();
							return (
								<div key={index} className="list-item task-item">
									<div className="list-item__inner">
										<div className="list-item__text">
											<div className="list-item__line1">
												{ task.description }
											</div>
											<div className="list-item__line2">
												Assigned by { assigner.name } to { user.name } { m }
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

					<Prompt
	          show={addTaskOpen}
	          onCancel={this.onSave}
	          onSubmit={this.onSave}
	          header={<h2 className="licensing-popup__title">Add New Task</h2>}
	          cancelText=""
	          submitText=""
						className="dark-prompt"
	        >
	          <TaskCreator onSave={this.onSave} />
	        </Prompt>
				<button className="task-list__open-add" onClick={this.addClick}>Add new task</button>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(TaskList);
