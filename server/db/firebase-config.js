const { initializeApp } = require("firebase/app"); //Auth init
const { getFirestore } = require("firebase/firestore"); // Cloud Firestore
require("dotenv").config();
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// init firebase app
const app = initializeApp(firebaseConfig);

// Cloud Firestore - init services
const db = getFirestore(app);

module.exports = { db };

//to use Analytics, add two below to the above file:
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);
