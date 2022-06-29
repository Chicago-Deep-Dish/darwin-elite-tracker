const { initializeApp } = require("firebase/app"); //Auth init

// Cloud Firestore
const {
  getFirestore,
  collection,
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
const app = initializeApp(firebaseConfig);

// Cloud Firestore - init services
const db = getFirestore(app);

// Cloud Firestore - Users collection reference
const colRef = collection(db, "users");

module.exports = { db, colRef };

//to use Analytics, add two below to the above file:
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);
