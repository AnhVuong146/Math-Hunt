// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWNWJ1VQFA1GJ1Ddmm9V-OwWdhAteEyzQ",
  authDomain: "math-hunt-cfac2.firebaseapp.com",
  projectId: "math-hunt-cfac2",
  storageBucket: "math-hunt-cfac2.appspot.com",
  messagingSenderId: "215223626914",
  appId: "1:215223626914:web:19a1611d2c8c734012fbfb",
  measurementId: "G-MC2DT262MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);