export default function dataDecipher(data) {
  const userObject = data._document.data.value.mapValue.fields;
  // console.log("userObject", userObject);
  const UserObjectData = {
    firstName: Object.keys(userObject.firstName)[0],
    lastName: Object.keys(userObject.lastName)[0],
    problems: userObject.problems.mapValue.fields,
    settings: userObject.settings.mapValue.fields,
  };

  const firebaseArray = Object.values(UserObjectData.problems);

  let problemArray = [];
  let problemArrayFiltered = [];
  firebaseArray.forEach((problemObject) => {
    problemArray.push(problemObject.mapValue.fields);
  });

  problemArray.forEach((problem) => {
    // console.log(problem);
    let constraintsFilteredArray = [];
    let solutionFilteredArray = [];
    problem.constraints.arrayValue.values.forEach((constraint) => {
      constraintsFilteredArray.push(constraint.stringValue);
    });


    problem.solution.arrayValue.values.forEach((constraint) => {
      solutionFilteredArray.push(constraint.stringValue);
    });

    problemArrayFiltered.push({
      codeTime: problem.codeTime.integerValue,
      difficulty: problem.difficulty.stringValue,
      id: problem.id.stringValue,
      programmingLanguage: problem.programmingLanguage.stringValue,
      promptLink: problem.promptLink.stringValue,
      promptName: problem.promptName.stringValue,
      promptText: problem.promptText.stringValue,
      pseudocodeTime: problem.pseudocodeTime.integerValue,
      readTime: problem.readTime.integerValue,
      timeComplexity: problem.timeComplexity.stringValue,
      timeStamp: problem.timeStamp.stringValue,
      totalTime: problem.totalTime.integerValue,
      whiteBoardTime: problem.whiteBoardTime.integerValue,
      constraints: constraintsFilteredArray,
      solution: solutionFilteredArray,
      timeStampinfo: {
        month: problem.timeStampinfo.mapValue.fields.month.integerValue,
        day: problem.timeStampinfo.mapValue.fields.day.integerValue,
        year: problem.timeStampinfo.mapValue.fields.day.integerValue,
      },
      topics: problem.topics.stringValue,
    });
  });

  // console.log("UserObjectData", UserObjectData);
  // console.log("problemArrayFiltered", problemArrayFiltered);
  return [UserObjectData, problemArrayFiltered];
}
