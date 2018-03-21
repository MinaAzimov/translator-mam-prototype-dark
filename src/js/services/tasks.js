import taskTypesData from "../../../mock/taskTypes";
import taskData from "../../../mock/tasks";

export function getTaskTypes() {
	return taskTypesData.taskTypes;
}

export function getTaskTypeData(id) {
	return taskTypesData.taskTypes.find(taskType => taskType.id === id);
}

export function getAllTasks() {
	return taskData.tasks;
}