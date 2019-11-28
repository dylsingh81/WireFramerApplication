import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB21I_zpusQKZ2jzp1L_hTcny-qKq4XdkQ",
    authDomain: "wireframer-228fc.firebaseapp.com",
    databaseURL: "https://wireframer-228fc.firebaseio.com",
    projectId: "wireframer-228fc",
    storageBucket: "wireframer-228fc.appspot.com",
    messagingSenderId: "215079314583",
    appId: "1:215079314583:web:99341291cedd147720f5d2",
    measurementId: "G-4MYE7BC8JQ"
  };
firebase.initializeApp(firebaseConfig);


// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;