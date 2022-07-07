const { db } = require("../db/firebase-config");
const { doc, setDoc } = require("firebase/firestore");
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
  const user = doc(db, `users/${data.userId}`);
  return setDoc(user, data);
};
