import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM5WKFMZDvvnvXxVI2F5Ng-6WHbJ3ZpUc",
  authDomain: "chatgpt-batihan.firebaseapp.com",
  projectId: "chatgpt-batihan",
  storageBucket: "chatgpt-batihan.appspot.com",
  messagingSenderId: "505528116145",
  appId: "1:505528116145:web:ee81f51e9288f7c585d390",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
