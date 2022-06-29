const { initializeApp } = require("firebase/app"); //Auth init

// Cloud Firestore
const {
  getFirestore,
  Timestamp,
  collection,
  getDocs,
  addDoc,
} = require("firebase/firestore");

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// console.log("firebaseConfig", firebaseConfig);

// init firebase app
initializeApp(firebaseConfig);

// Cloud Firestore - init services
const db = getFirestore();

// Cloud Firestore - Users collection reference
const colRef = collection(db, "users");

module.exports = { colRef, getDocs, addDoc, Timestamp };

//to use Analytics, add two below to the above file:
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);
