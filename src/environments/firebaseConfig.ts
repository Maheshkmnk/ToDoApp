// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqVdZG7mfUQeqKEzTmbkwDmiJl_7vTO4w",
  authDomain: "to-do-app-33a90.firebaseapp.com",
  projectId: "to-do-app-33a90",
  storageBucket: "to-do-app-33a90.appspot.com",
  messagingSenderId: "294895820881",
  appId: "1:294895820881:web:a6c09e09d3c054952a9870",
  measurementId: "G-9EG9LXPN0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);                                