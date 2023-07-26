import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";


const firebaseConfig = {
    //Paste Your firebase config here
   
    apiKey: "AIzaSyDPJRdOCOV0yJ6ry4kb7wtEKK-iqBp5w-A",
    authDomain: "koshtipariwar.firebaseapp.com",
    projectId: "koshtipariwar",
    storageBucket: "koshtipariwar.appspot.com",
    messagingSenderId: "999714980455",
    appId: "1:999714980455:web:55e4414ccbfae99570cac2"
    
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }



