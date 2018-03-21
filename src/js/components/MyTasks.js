import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import { connect } from 'react-redux'
import moment from 'moment'
import { TASK_PRIORITY_HIGH, TASK_PRIORITY_LOW, TASK_PRIORITY_MEDIUM } from '../constants'
import { getUserData } from '../services/users.js'


import Repeater from './form/Repeater'


class MyTasks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			taskItems: this.getTaskItems(props.tasks)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.tasks !== this.props.tasks) {
			this.setState({
				taskItems: this.getTaskItems(nextProps.tasks)
			});
		}
	}

	onChange = (val) => {
		this.setState({
			taskItems: val
		})
	}

	getTaskItems(tasks) {

		let { client } = this.props;
		let myTasks = tasks.filter(task => task.assignedTo === client.user.id);
		let taskItems = myTasks.map((task,index) => {
			return {
				_repeaterItemId: index,
				value: task
			}
		});

		return taskItems;
	}

	render() {

		let { tasks, client } = this.props;
		let { taskItems } = this.state;
		let myTasks = tasks.filter(task => task.assignedTo === client.user.id);

		return (
			<div className="my-tasks">
				<div className="my-tasks__list">
					{
						taskItems.length > 0 ?
							<Repeater onChange={this.onChange} items={taskItems} allowAdd={false}>
								<MyTaskItem />
							</Repeater>					
						:
							<div>There are currently no tasks assigned to you.</div>
					}

				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    client: state.client
  }
}

export default connect(mapStateToProps)(MyTasks);





class MyTaskItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			completed: false
		}
	}

	check = () => {
		const completed = this.state.completed;
		this.setState({
			completed: !completed
		})


		// Hack to rmeove item from list
		if (!completed) {
			setTimeout(()=>{
				this.props.onRemove();
			}, 300);
		}
	}

	render () {
		let completed = this.state.completed;
		let { description, priority, assignedAt, assignedBy, memo } = this.props.value;
		let m = moment(assignedAt).fromNow();
		let avatar = getUserData(assignedBy).avatarImgPath;
		
		let classnames = classNames({
			'list-item': true,
			'list-item--draggable': true,
			'mytask-item': true,
			'mytask-item--high': priority === TASK_PRIORITY_HIGH,
			'mytask-item--low': priority === TASK_PRIORITY_LOW,
			'mytask-item--medium': priority === TASK_PRIORITY_MEDIUM
		});

		return (
			<div className={classnames}>
				<div className="list-item__inner">
					<div className="list-item__img">
						<img src={"/assets" + avatar} />
					</div>
					<div className="list-item__text">
						<div className="list-item__line1">{description}</div>
						{ memo ? <div className="list-item__desc">{memo}</div> : null }
						<div className="list-item__line2">{m}</div>			
					</div>
					<div className="mytask-check">
						<div 
							className={"mytask-check__box" + (completed ? " mytask-check__box-checked" : "" )}
							onClick={this.check}
						>
						</div>
						<div className="mytask-check__text">Completed</div>
					</div>
				</div>
			</div>
		)
	}
}