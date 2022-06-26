import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

console.log('process.env', process.env);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
};
console.log(firebaseConfig);

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// apiKey: "AIzaSyBtRIMLkSVfptH4ASinlEfnKhP-mBwUV24",
// authDomain: "react-register-12564.firebaseapp.com",
// projectId: "react-register-12564",
// storageBucket: "react-register-12564.appspot.com",
// messagingSenderId: "1074586181097",
// appId: "1:1074586181097:web:47236fd450006cd1fabf78",
// measurementId: "G-JSN76LC2EC"
