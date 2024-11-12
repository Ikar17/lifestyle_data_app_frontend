// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX4dnWmLmEP7DRv7u13ERVb1R8kqrZHco",
  authDomain: "lifestyle-data-c3a13.firebaseapp.com",
  projectId: "lifestyle-data-c3a13",
  storageBucket: "lifestyle-data-c3a13.appspot.com",
  messagingSenderId: "631491684632",
  appId: "1:631491684632:web:d7b032a78249afb8ef166d",
  measurementId: "G-R6KPL5XGKY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);