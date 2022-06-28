const { app } = require("../db/firebase-config");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

// login
exports.login = ({ email, password }) => {
  console.log('email pass', email, password);
  const authentication = getAuth();
  return signInWithEmailAndPassword(
    authentication,
    email,
    password
  )
}

//register
exports.register = ({ email, password }) => {
  const authentication = getAuth();
  return createUserWithEmailAndPassword(
    authentication,
    email,
    password
  )
}


exports.storeUserData = ({ email, password }) => {
  const authentication = getAuth();
  return createUserWithEmailAndPassword(
    authentication,
    email,
    password
  )
}