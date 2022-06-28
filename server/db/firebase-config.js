const { initializeApp } = require("firebase/app");
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
console.log('firebaseConfig', firebaseConfig);

exports.app = initializeApp(firebaseConfig);

//to use Analytics, add two below to the above file:
// import { getAnalytics } from "firebase/analytics";
// export const analytics = getAnalytics(app);
