import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


import Login from './Login';
import Dashboard from "./Dashboard";
import EditContent from "./EditContent";
import RegisterContent from "./RegisterContent";
import ContentIndex from "./ContentIndex";

import { isLoggedIn } from '../client/auth';

function requireAuth(nextState, replace) {
	if (!isLoggedIn()){
		replace('/login');
	}
}

function redirectIndex(nextState, replace) {
	if (isLoggedIn()){
		replace('/mam');
	}
	else {
		replace('/login');
	}
}

class Container extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let { client } = this.props;
		return (
			<div className="app">
				<Router history={browserHistory}>
	        <Route path="/">
	        	<IndexRoute key={0} onEnter={redirectIndex}  />
						<Route path="/edit" component={EditContent} key={1} onEnter={requireAuth}  />
						<Route path="/dashboard" component={Dashboard} key={1} onEnter={requireAuth}  />
						<Route path="/content" component={ContentIndex} key={1} onEnter={requireAuth}  />
						<Route path="/mam" component={RegisterContent} key={4} onEnter={requireAuth}  />
						<Route path="/login" component={Login} key={3} />
	        </Route>
			  </Router>
			</div>
		)
	}
}



export default Container;