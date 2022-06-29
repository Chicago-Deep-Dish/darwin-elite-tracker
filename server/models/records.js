const { colRef } = require("../db/firebase-config");
const { getDocs } = require("firebase/firestore");

// query to DB with these params
// exports.searchRecords = ({difficulty, time, topic, search}) => {

// }
exports.searchRecords = async ({ userId }) => {
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
