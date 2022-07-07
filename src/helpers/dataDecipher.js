import FireStoreParser from "firestore-parser";
import { createSamplePrompt } from "../data/randomData";

export default function dataDecipher(data) {
  const UserObjectData =
    FireStoreParser(data._document.data.value.mapValue.fields) ||
    createSamplePrompt("Sample Data");

  const problemArrayFiltered = objToArray(UserObjectData.problems) || [];

  return [UserObjectData, problemArrayFiltered];
}

function objToArray(obj) {
  let arr = [];
  for (let prop in obj) {
    arr.push(obj[prop]);
  }
  return arr;
}
