import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "firebase/compat/database";


const config = {
  apiKey: "AIzaSyDO-pNRdJIQVKBTzInqDO4rXG9B6HDBPz8",
  authDomain: "polling-bfcde.firebaseapp.com",
  databaseURL: "https://polling-bfcde-default-rtdb.firebaseio.com",
  projectId: "polling-bfcde",
  storageBucket: "polling-bfcde.appspot.com",
  messagingSenderId: "532048264915",
  appId: "1:532048264915:web:28999e6041999563bd9e26",
  measurementId: "G-CJQ6YCCFG5"
}

firebase.initializeApp(config)


export default firebase;
