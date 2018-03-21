import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../reducers'
import Container from "../components/Container";
import socket from "./socketClient";
import socketEvents from "./socketEvents";
import { iLoggedIn } from "../actions";
import { browserHistory } from 'react-router';

window.__CLIENT__ = true;

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
socketEvents(socket, store);

// Check if the user is logged in
if (window.USER_DATA !== undefined) {
	store.dispatch(iLoggedIn(window.USER_DATA));
	browserHistory.push('/dashboard');
}

render(
	<Provider store={store}>
  	<Container />
  </Provider>,
  document.getElementById('root')
)
