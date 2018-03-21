const initialState = {
	id: 0,
	isChanged: false,
  lockedBy: null
}

export default function contentItem(state = initialState, action) {
  switch (action.type) {

    case "PUBLISH_CONTENT": {
      return Object.assign({}, state, {
        isChanged: false
      });      
    }

    case "UNLOCK_CONTENT": {
      return Object.assign({}, state, {
        lockedBy: null
      });
    }
    case "LOCK_CONTENT": {
      return Object.assign({}, state, {
        lockedBy: action.userId
      });
    }
    case "REVERT_CONTENT": {
      return Object.assign({}, state, {
        isChanged: false
      });
    }
    case "UPDATE_FIELD":
    case "UPDATE_RTEDITOR_BLOCK": {
      let newObj = Object.assign({}, state, {
      	isChanged: true
      })
      return newObj;
    }
    default:
    	return state;
  }
}