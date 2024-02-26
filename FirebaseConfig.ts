import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAEmdTOLz0ZXgkruIOqB1tWbZZEHKuj6sU",
  authDomain: "rhyder-app.firebaseapp.com",
  projectId: "rhyder-app",
  storageBucket: "rhyder-app.appspot.com",
  messagingSenderId: "476733606995",
  appId: "1:476733606995:web:063c84802f7f84ca034aa6",
  measurementId: "G-3508VZ5SD0"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const analytics = getAnalytics(FIREBASE_APP);