// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMH5DSZcFpeaSh2BVZEa5-_iyUf3J5z2Y",
  authDomain: "inventory-management-app-b42c2.firebaseapp.com",
  projectId: "inventory-management-app-b42c2",
  storageBucket: "inventory-management-app-b42c2.appspot.com",
  messagingSenderId: "101913157755",
  appId: "1:101913157755:web:5a4133b6f7fe019436c2de",
  measurementId: "G-3Y5BYRH811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);
export { app, auth, firestore };