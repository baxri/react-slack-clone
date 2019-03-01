import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyC95CRdQi-npepo1-lOjlQDJsDZFnkKVms",
    authDomain: "react-slack-clone-f705d.firebaseapp.com",
    databaseURL: "https://react-slack-clone-f705d.firebaseio.com",
    projectId: "react-slack-clone-f705d",
    storageBucket: "react-slack-clone-f705d.appspot.com",
    messagingSenderId: "26034872737"
};
firebase.initializeApp(config);

export default firebase;