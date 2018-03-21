import { dump, iLoggedIn } from "../actions"
import { browserHistory } from 'react-router'


export default function socketEvents(socket, store) {

	// We dump all the data on socket connected, must be changed
	// wehn going into production
	socket.on('CONNECTED', function(data) {
		store.dispatch(dump(data));
	});

	socket.on('LOGIN_SUCCESS', function(userData) {
	  store.dispatch(iLoggedIn(userData));
	  // Go to edit page
	  browserHistory.push('/mam');
	});

	// We should probably use the redux store to check logged in/logged out
	// state of the client in real time, then we can get rid of these events
	socket.on('LOGOUT_SUCCESS', function(userData) {
	  browserHistory.push('/login');
	});

	socket.on('ACTION', function(action) {
	  store.dispatch(action);
	});

}
