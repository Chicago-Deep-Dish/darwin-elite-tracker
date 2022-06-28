const { app } = require("../db/firebase-config");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

// login
module.exports.login = ({ email, password }) => {
  console.log('email pass', email, password);
  const authentication = getAuth();
  return signInWithEmailAndPassword(
    authentication,
    email,
    password
  )
}

//register
module.exports.register = ({ email, password }) => {
  const authentication = getAuth();
  return createUserWithEmailAndPassword(
    authentication,
    email,
    password
  )
}