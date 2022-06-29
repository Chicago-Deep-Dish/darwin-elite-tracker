import { v4 as uuidv4 } from "uuid";

// let sampleData = {
//   promptName: "Two Sum",
//   totalTime: 1500000,
//   difficulty: "easy",
//   topic: ["Array", "Hash Table"],
//   promptLink: "https://leetcode.com/problems/two-sum/",
//   PromptText:
//     "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
//   constraints: [
//     "2 <= nums.length < 10000",
//     "-1000000000 <= nums[i] <= 1000000000",
//     "-1000000000 <= target = 1000000000",
//     "only one valid answer exists",
//   ],
//   timeComplexity: "O(n2)",
//   solution: "",
//   programmingLanguage: "JavaScript",
//   readTime: 300000,
//   whiteBoardTime: 300000,
//   pseudocodeTime: 600000,
//   codeTime: 300000,
// };

export const sampleClass = {
  // userId: firebaseuserId << get's created automatically during doc addition
  settings: {},
  firstName: null,
  lastName: null,
  defaultGraph: [],
  timestamp: null,
  problems: [
    {
      id: uuidv4(),
      promptName: null,
      difficulty: null,
      topics: [],
      promptLink: null,
      time: null,
      // optional
      promptText: null,
      solution: [],
      readTime: null,
      whiteboardTime: null,
      pseudocodeTime: null,
      codeTime: null,
      contraints: null,
      timeComplexity: null,
      programmingLanguage: null,
    },
  ],
};

export default function createSampleData(rows) {
  let sampleData = [];
  for (let i = 0; i < rows; i++) {
    sampleData.push(createSampleDataRow());
  }
  return sampleData;
}

function createSampleDataRow(userID) {
  return {
    promptName: createRandomParagraph(2),
    totalTime: createRandomNumerWithRange(10000, 10000000),
    difficulty: "easy",
    topic: [
      createRandomParagraph(2),
      createRandomParagraph(2),
      createRandomParagraph(2),
    ],
    promptLink: `https://leetcode.com/problems/${createRandomWordStringWithLength(
      10
    )}`,
    PromptText: createRandomParagraph(50),
    constraints: [
      `${createRandomNumerWithRange(
        1,
        3
      )} <= nums.length < ${createRandomNumerWithRange(1000, 100000)}`,
      `${createRandomNumerWithRange(
        -10001,
        0
      )} <= nums[i] <= ${createRandomNumerWithRange(10000, 100000)}`,
      `${createRandomNumerWithRange(
        -10001,
        0
      )} <= target <= ${createRandomNumerWithRange(10000, 100000)}`,
      "only one valid answer exists",
    ],
    timeComplexity: "O(n2)",
    solution: createRandomParagraph(50),
    programmingLanguage: "JavaScript",
    readTime: createRandomNumerWithRange(10000, 300000),
    whiteBoardTime: createRandomNumerWithRange(10000, 300000),
    pseudocodeTime: createRandomNumerWithRange(10000, 300000),
    codeTime: createRandomNumerWithRange(10000, 300000),
    timeStamp: RandomTimeGeneratorForLastMonth(),
    user: users[createRandomNumerWithRange(0, 2)],
  };
}

const users = [
  "WcmIqdF33oc7KGOpcvtD82YyCv53",
  "9nj0CngezSPN6q8vj0gDjienlsT2",
  "LdiAUMtv6rOjnN33s5XnJ6VVUdb2",
];

//helper
function createRandomNumerWithRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomWordStringWithLength(length) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
function createRandomParagraph(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += createRandomWordStringWithLength(5) + " ";
  }
  return result;
}

function RandomTimeGeneratorForLastMonth() {
  return `2022-${createRandomNumerWithRange(1, 6)}-${createRandomNumerWithRange(
    1,
    28
  )}T${createRandomNumerWithRange(1, 12)}:${createRandomNumerWithRange(
    1,
    59
  )}:${createRandomNumerWithRange(1, 59)}`;
}

//NOT USED YET
function randomUserGenerator() {
  return {
    username: createRandomWordStringWithLength(5),
    password: createRandomWordStringWithLength(5),
    email: `${createRandomWordStringWithLength(
      5
    )}@${createRandomWordStringWithLength(5)}.com`,
    firstName: createRandomWordStringWithLength(5),
    lastName: createRandomWordStringWithLength(5),
    role: "user",
    timeStamp: RandomTimeGeneratorForLastMonth(),
  };
}
