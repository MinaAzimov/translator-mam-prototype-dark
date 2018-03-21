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
import Preview from '../components/Preview';
import { authInit } from './auth';

window.__CLIENT__ = true;

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
socketEvents(socket, store);
authInit(store);

// Check if we should log the user in
if (window.USER_DATA !== undefined) {
	store.dispatch(iLoggedIn(window.USER_DATA));
}

render(
	<Provider store={store}>
  	<Container />
  </Provider>,
  document.getElementById('root')
)

window.mountCnbcPocPreview = function() {

	render(
		<Provider store={store}>
	  	<Preview fieldId={0}/>
	  </Provider>,
	  document.getElementById('cnbc-poc-preview-title')
	)


	render(
		<Provider store={store}>
	  	<Preview fieldId={14} />
	  </Provider>,
	  document.getElementById('cnbc-poc-preview-body')
	)


}