const { colRef, getDocs, Timestamp, addDoc } = require("../db/firebase-config");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

exports.login = ({ email, password }) => {
  const authentication = getAuth();
  return signInWithEmailAndPassword(authentication, email, password);
};

exports.register = ({ email, password }) => {
  const authentication = getAuth();
  return createUserWithEmailAndPassword(authentication, email, password);
};

exports.storeUserData = (data) => {
  return addDoc(colRef, { ...data, timestamp: Timestamp.now() });
};

//for GET functionality
// get collection data
// getDocs(colRef);
