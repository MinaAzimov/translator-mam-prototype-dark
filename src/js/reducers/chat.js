


const initialState = null;


export default function chat(state = initialState, action) {
  switch (action.type) {
  	case "ADD_CHAT":
  		let newState;
      let newMsg = {
        msg: action.msg,
        userId: action.userId,
        timestamp: action.timestamp
      }
  		if (state === null) {
  			newState = [newMsg];
  		}
  		else {
  			newState = state.slice();
  			newState.push(newMsg);
  		} 
  		return newState;
    default:
      return state
  }
}
