const { colRef, db } = require("../db/firebase-config");
const { doc, setDoc, getDocs, collection } = require("firebase/firestore");
// query to DB with these params
// exports.searchRecords = ({difficulty, time, topic, search}) => {

// }
exports.searchRecords = ({ userId }) => {
  return getDocs(colRef).then((snapshot) => {
    let users = [];

    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data() });
    });

    const problems = users.filter((user, index) => {
      return user.userID === userId;
    });

    return problems;
  });
};

exports.addRecord = async (data, userID) => {
  // console.log("data to addRecord", data);
  console.log("userID to addRecord", userID);
  // const user = doc(db, `users/${userID}`);
  // const problem = doc(db, `users/${userID}`);

  // const problems = (db, `users/${userID}`).collection("problems");

  const problems = doc(db, `users/${userID}`).collection("problems")
  // const problems = doc(db, `users/${userID}`).collection('problems')

  console.log(problems);
  return setDoc(problems, data);
};
exports.updateRecord = ({ userId }) => {};
exports.removeRecord = ({ userId }) => {};
