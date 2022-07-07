const { db } = require("../db/firebase-config");
const {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
} = require("firebase/firestore");

exports.addRecord = async (data, userId) => {
  return setDoc(
    doc(db, "users", userId),
    {
      problems: {
        [data.id]: data,
      },
    },
    { merge: true }
  );
};

exports.searchRecords = (data, userId) => {
  const demo = doc(db, "users", userId);
  return getDoc(demo);
};

exports.updateRecord = (data, userId, problem_id) => {
  const demo = doc(db, "users", userId);
  return updateDoc(demo, {
    [`problems.${problem_id}`]: data,
  });
};

exports.removeRecord = (userId, problem_id) => {
  const demo = doc(db, "users", userId);
  return updateDoc(demo, {
    [`problems.${problem_id}`]: deleteField(),
  });
};
