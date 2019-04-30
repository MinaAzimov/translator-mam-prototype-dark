import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyCbDHjGC02c9lneraO00KbTAW7eYFb7RTA",
    authDomain: "translator-dark.firebaseapp.com",
    databaseURL: "https://translator-dark.firebaseio.com",
    projectId: "translator-dark",
    storageBucket: "translator-dark.appspot.com",
    messagingSenderId: "379413629564"
  };
 firebase.initializeApp(config);

export default firebase;
