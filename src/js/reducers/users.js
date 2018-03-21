import usersData from '../../../mock/users.json';
const initialState = [];

export default function users(state = initialState, action) {
  switch (action.type) {

    case "USER_DISCONNECT": {

      var users = state.slice();
      var user = users.find((user) => user.id === action.userId);
      user.socketId  = null;
      return users;
    }

    case "USER_LOGIN":
      var users = state.slice();
      var existing = users.find((user) => user.id === action.userId);
      if (existing) {
        existing.sessionId = action.sessionId;
        existing.socketId = action.socketId;
      }
      else {
        var newUser = usersData.users.find((user) => user.id === action.userId);
        newUser.sessionId = action.sessionId;
        newUser.socketId = action.socketId;
        users.push(newUser);        
      }
      return users;

    case "USER_LOGOUT":
      var index = state.findIndex((user) => user.id === action.userId);
      var users = state.slice();
      users.splice(index, 1);
      return users;
    default:
      return state
  }
}
