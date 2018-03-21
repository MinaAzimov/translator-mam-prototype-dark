


const initialState = {
	connectionStatus: "CONN_STATUS_WAITING",
	user: null,
  notifications: []
}

export default function client(state = initialState, action) {
  switch (action.type) {

    case 'READ_ALL_NOTIFICATIONS': {
      let notifications = state.notifications.slice();
      notifications.forEach(n => {
        n.isRead = true;
      });
      return Object.assign({}, state, { notifications });
    }
    
    case 'ADD_TASK': {
      if (action.assignedTo === state.user.id) {
        let notifications = state.notifications.slice();
        notifications.push({
          action: action,
          isRead: false
        });
        return Object.assign({}, state, { notifications });
      }
      return state;
    }
    /*
    case 'PUBLISH_CONTENT': {
        let notifications = state.notifications.slice();
        notifications.push({
          action: action,
          isRead: false
        });
        return Object.assign({}, state, { notifications });      
    }
    */

  	case 'I_LOGGED_IN':
  		return Object.assign({}, state, {
  			user: action.userData
  		})

    default:
      return state
  }
}
