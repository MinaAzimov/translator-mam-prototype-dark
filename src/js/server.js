var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

import reducers from "./reducers"
import socketInit from './lib/socketInit'
import { createStore } from 'redux'
import session from 'express-session'
import Twig from 'twig';
import { PUBLIC_HOST, PUBLIC_PORT } from './settings';

// Port can be passed from command line
const PORT = process.argv[4] || PUBLIC_PORT;

let store = createStore(reducers);
socketInit(io, store);

app.use(session({ 
	secret: 'keyboard cat', 
	cookie: { 
		httpOnly: false,
    expires: new Date(253402300000000)
	},
	resave: true,
	saveUninitialized: true
}))

app.use('/assets', express.static('build/assets'));


app.get('/preview', function(req, res) {
  res.render('article-full.twig');
});



app.get('*', function(req, res) {
  var pageProps = {};
  var loggedInUsers = store.getState().users;
  var sessionID = req.sessionID;
  var me = loggedInUsers.find(user=> user.sessionId === sessionID);
  if (me) {
    pageProps.userData = me;
  }
  pageProps.sessionId = sessionID;
  pageProps.port = PORT;
  pageProps.hostname = PUBLIC_HOST;
  res.render('index.twig', pageProps);
});



http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
