import * as firebase from 'firebase';

import Database from './database';
import AuthManager from './Auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAY-YmmHCUUlfSo5unzW4Paa0E9QL8m1rE',
  authDomain: 'react-demo-as.firebaseapp.com',
  databaseURL: 'https://react-demo-as.firebaseio.com',
  projectId: 'react-demo-as',
  storageBucket: 'react-demo-as.appspot.com',
  messagingSenderId: '376161579745',
  appId: '1:376161579745:web:a226a8534fa71314',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const usersDB = new Database(firebase.firestore(), 'users');
export const booksDB = new Database(firebase.firestore(), 'users');
export const auth = new AuthManager(firebase.auth());

export default firebase;

// @ts-ignore
window.devtools = {
  firebase,
};
