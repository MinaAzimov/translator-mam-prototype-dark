
import taskData from "../../../mock/tasks.json";
import { getAllTasks } from "../services/tasks";

const initialState = getAllTasks();

export default function tasks(state = initialState, action) {
  switch (action.type) {
  	case 'ADD_TASK':
  		let newTasks = state.slice();
      newTasks.push({
        assignedTo: action.assignedTo,
        assignedBy: action.assignedBy,
        description: action.description,
        assignedAt: action.assignedAt,
        priority: action.priority,
        memo: action.memo,
        associatedContentId: action.associatedContentId
      });
      return newTasks;
    default:
      return state
  }
}
