import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

var config = {
    apiKey: "AIzaSyDLMqIxfDB3svs8qcpwPl0zylnIiCZYpds",
    authDomain: "devtube-11f7c.firebaseapp.com",
    databaseURL: "https://devtube-11f7c.firebaseio.com",
    projectId: "devtube-11f7c",
    storageBucket: "devtube-11f7c.appspot.com",
    messagingSenderId: "985201789713"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase