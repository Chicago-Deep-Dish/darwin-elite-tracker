const { app, db } = require("../db/firebase-config");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

// login
exports.login = ({ email, password }) => {
  console.log("email pass", email, password);
  const authentication = getAuth();
  return signInWithEmailAndPassword(authentication, email, password);
};

//register
exports.register = ({ email, password }) => {
  const authentication = getAuth();
  return createUserWithEmailAndPassword(authentication, email, password);
};

exports.storeUserData = (data) => {

  // const data = {
  //   // below is optional as user may register without this data
  //   userId: userId,
  //   settings: settings,
  //   firstName: firstName,
  //   lastName: lastName,
  //   defaultGraph: defaultGraph,
  //   timestamp: timestamp,
  // };
  console.log('data', data)
  // Add a new document in collection "cities" with ID 'LA'
  db.collection("users")
    .doc(data.userId)
    .set(data)
    .then((res) => {
      console.log("res inside server model ", res);
    });
};
