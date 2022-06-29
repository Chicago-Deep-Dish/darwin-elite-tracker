const { colRef, getDocs, Timestamp, addDoc } = require("../db/firebase-config");
const {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");

// query to DB with these params
// exports.searchRecords = ({difficulty, time, topic, search}) => {

// }
exports.searchRecords = async ({ userId }) => {
  return getDocs(colRef).then((snapshot) => {
    let users = [];
    let problems = [];

    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data() });
    });
    users.forEach((user) => {
      problems.push(user.problems);
    });

    return users;
  });
};
