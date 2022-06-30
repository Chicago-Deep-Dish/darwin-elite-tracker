const { db } = require("../db/firebase-config");
const {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} = require("firebase/firestore");

// Junsu: it's up to you how you want to provide userID, problemID, and problem data - cookies, req.query, req.params, req.body

exports.addRecord = async (data, userId) => {
  // Junsu: uncomment for demonstration, have Firestore oepn to see real time change
  return setDoc(doc(db, 'users', userId), {
    problems: {
      [data.id]: data
    }
  }, { merge: true });

  // Junsu TODO: replace all INSERTS
  // return setDoc(doc(db, 'users', 'INSERT_USER_ID_HERE'), {
  //   problems: {
  //     "INSERT_PROBLEM_ID_HERE": data
  //   }
  // }, { merge: true });
};

exports.searchRecords = (data, userId) => {
  // Junsu: uncomment for demonstration
  const demo = doc(db, 'users', userId);
  return getDoc(demo);
  //Junsu TODO: Replace all INSERTS
  // const problems = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  // return getDoc(problems);
};

exports.updateRecord = (data, userId) => {
  // Junsu: uncomment for demonstration, have Firestore open to see realtime change
  const demo = doc(db, 'users', userId);
  return updateDoc(demo, {
    [data.id]: data
  });
  //Junsu TODO: replace all INSERTS
  // const problemRef = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  // return updateDoc(problemRef, {
  //   "problems.INSERT_PROBLEM_ID_HERE": data
  //   }
  // });
};

exports.removeRecord = (data, userId) => {
  // Junsu: uncomment for demonstration, have Firestore open to see realtime change
  const demo = doc(db, 'users', userId);
  return updateDoc(demo, {
    [data.id]: deleteField(),
  });
  //Junsu TODO: replace all INSERTS
  // const problemRef = doc(db, 'users', `${INSERT_USER_ID_HERE}`);
  // return updateDoc(problemRef, {
  //   [`problems.${INSERT_PROBLEM_ID}`]: deleteField()
  // });
};
