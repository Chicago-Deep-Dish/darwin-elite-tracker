const { db } = require("../db/firebase-config");
const { doc, getDoc, setDoc, updateDoc, deleteField } = require("firebase/firestore");

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

exports.searchRecords = (data) => {
  // Junsu: uncomment for demonstration
  const demo = doc(db, 'users', '8It7dKjfVVzy0AvTLbEP');
  return getDoc(demo);
  //Junsu TODO: Replace all inserts
  // const problems = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  // return getDoc(problems);
};

exports.updateRecord = (data) => {
  // Junsu: uncomment for demonstration, have Firestore open to see realtime change
  // const demo = doc(db, 'users', '8It7dKjfVVzy0AvTLbEP');
  // return updateDoc(demo, {
  //   "problems.abcd1234": {
  //     promptName: "Two Sum"
  //   }
  // });
  //Junsu TODO: replace all INSERTS
  const problemRef = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  return updateDoc(problemRef, {
    "problems.INSERT_PROBLEM_ID_HERE": {
      "FIELD_NAME_TO_UPDATE": "UPDATE VALUE"
    }
  });
};

exports.removeRecord = (data) => {
  // Junsu: uncomment for demonstration, have Firestore open to see realtime change
  // const demo = doc(db, 'users', '8It7dKjfVVzy0AvTLbEP');
  // return updateDoc(demo, {
  //   "problems.abcd1234": deleteField()
  // });
  //Junsu TODO: replace all INSERTS
  const problemRef = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  return updateDoc(problemRef, {
    "problems.INSERT_PROBLEM_ID_HERE": deleteField()
  });
};