// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjZ6D_4_bTQTgnln4EUZ1CtWnhEzR6A-Q",
    authDomain: "urbansite-3ee6a.firebaseapp.com",
    projectId: "urbansite-3ee6a",
    storageBucket: "urbansite-3ee6a.appspot.com",
    messagingSenderId: "1097250593637",
    appId: "1:1097250593637:web:5c8abf12fb560665d0df8c"
  };

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
const auth = firebase.auth();

export const db = getFirestore(firebaseApp);

export { auth };
