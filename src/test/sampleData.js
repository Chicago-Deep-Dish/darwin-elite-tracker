import { Javascript } from "@mui/icons-material";
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
  userId: "kVZzjxSp3DOoL4c1Bcq97pmZ1uT2", //single user to populate database
  settings: { defaultGraph: ["bar", "line"] }, //object with properties
  firstName: null, //string
  lastName: null, //string
  problems: [
    {
      id: uuidv4(), //<< random
      promptName: null, //string
      difficulty: null, //string ex.('easy')
      topics: [], //array of strings (input will push comma delimited strings)
      promptLink: null,

      //---- optional bellow----//
      promptText: null, //string
      solution: [], //array of strings ex. multiple solutions  (input will push comma delimited strings)
      constraints: [], //array of strings ex. multiple constraints  (input will push comma delimited strings)
      timeComplexity: null, //string ex. ('bigO[n]' notation)
      programmingLanguage: null, //string ex. ('JavaScript')

      readTime: null, //number in milliseconds
      whiteboardTime: null, //number in milliseconds
      pseudocodeTime: null, //number in milliseconds
      codeTime: null, //number in milliseconds
      totalTime: null, //number in milliseconds based on input from stopwatch

      //---- automatically created in productio but will be randomizes for populating the database----//
      timeStamp: null, //ISO string of time submitted when submit is pressed

      //ISO string above turned into object
      timeStampinfo: {
        month: null, //number out of a range
        day: null, //number out of a range
        year: null, //number out of a range
      },
    },
  ],
};

export default function createSampleData(rows) {
  let sampleData = [];
  for (let i = 0; i < rows; i++) {
    sampleData.push(createSamplePrompt());
  }
  return sampleData;
}

export const registeredUser = {
  userId: "OWOrUCkxVIUg4UwBR4b4tOW4KQV2", //single user to populate database
  settings: { defaultGraph: ["bar", "line"] }, //object with properties
  firstName: null, //string
  lastName: null, //string
  problems: [],
};

export function createSamplePrompt(userID) {
  const randomISODate = getrandomDateIn2022();
  const randmDateArray = ISOtoDateMonthYear(randomISODate);

  return {
    id: uuidv4(),
    promptName: createRandomParagraph(2),
    difficulty: randomizeFromArray(difficultyArray),
    topics: randomizeFromArray(leetTopics),
    promptLink: `https://leetcode.com/problems/${createRandomWordStringWithLength(
      10
    )}`,
    promptText: createRandomParagraph(50),
    solution: [
      createRandomParagraph(50),
      createRandomParagraph(50),
      createRandomParagraph(50),
    ],
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
    timeComplexity: randomizeFromArray(timeComplexityArray),
    programmingLanguage: randomizeFromArray(languagesArray),

    readTime: createRandomNumerWithRange(10000, 300000),
    whiteBoardTime: createRandomNumerWithRange(10000, 300000),
    pseudocodeTime: createRandomNumerWithRange(10000, 300000),
    codeTime: createRandomNumerWithRange(10000, 300000),
    totalTime: createRandomNumerWithRange(10000, 10000000),

    timeStamp: randomISODate,
    timeStampinfo: {
      year: randmDateArray[0],
      month: randmDateArray[1],
      day: randmDateArray[2],
    },
  };
}

const difficultyArray = ["easy", "medium", "hard"];
const timeComplexityArray = [
  "O(n log(n))",
  "O(n)",
  "O(n^2)",
  "O(1)",
  "O(n+k)",
  "O(nk)",
];
const languagesArray = [
  "Javascript",
  "Java",
  "Python",
  "C++",
  "C",
  "Kotlin",
  "Swift",
  "C#",
  "PHP",
];

let leetTopics = [
  "Arrays",
  "Maps",
  "Linked Lists",
  "Queues",
  "Heaps",
  "Stacks",
  "Trees",
  "Graphs",
  "Breadth-First-Search",
  "Depth-First-Search",
  "Binary Search",
  "Recursion",
  "Backtracking",
  "Dynamic Programming",
  "Trie",
  "Matrix",
  "Sorting",
];

function randomizeFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// const users = [
//   "WcmIqdF33oc7KGOpcvtD82YyCv53",
//   "9nj0CngezSPN6q8vj0gDjienlsT2",
//   "LdiAUMtv6rOjnN33s5XnJ6VVUdb2",
// ];

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

// function RandomTimeGeneratorForLast5Months() {
//   const timeStamp = {
//     month: new Date().getMonth() + createRandomNumerWithRange(1, 5),
//     day: new Date().getDate(),
//     year: 2022,
//   };
//   return timeStamp;
// }

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

console.log(new Date(randomDate(new Date(2022, 1, 1), new Date())));

function ISOtoDateMonthYear(date) {
  // date = new Date(date);
  const year = date.getFullYear().toString();
  let month = date.getMonth() + 1;
  let dt = date.getDate().toString();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return [Number(year), Number(month), Number(dt)];
}

function getrandomDateIn2022() {
  return new Date(randomDate(new Date(2022, 5, 1), new Date()));
}

//NOT USED YET
// function randomUserGenerator() {
//   return {
//     username: createRandomWordStringWithLength(5),
//     password: createRandomWordStringWithLength(5),
//     email: `${createRandomWordStringWithLength(
//       5
//     )}@${createRandomWordStringWithLength(5)}.com`,
//     firstName: createRandomWordStringWithLength(5),
//     lastName: createRandomWordStringWithLength(5),
//     role: "user",
//     timeStamp: RandomTimeGeneratorForLastMonth(),
//   };
// }
