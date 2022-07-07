# Darwin Eleet Tracker

<br />
<div align="center">
  <a href="https://github.com/Chicago-Deep-Dish/darwin-elite-tracker">
    <img src="src/assets/Darwin_Logo_transparent.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Eleet Code Tracker</h3>

  <p align="center">
            <p><em>ELEET-TRACKER</em> is a service that has your future in mind. We know you are well on your way to become the best Software Engineer you can be, and we're here for you. We bring to you a service that allows you to track, record, and analyze your performance on the leetcode problems you attempt, so you can see how you stack up against the fiercest competition out there - yourself.</p>

  </p>
</div>

## App Preview
<br />
<div align="center"><br />
    <h3 align="center">Authentication and Toastify Notifications</h3>

  <img src="https://media.giphy.com/media/I2dca39UFSBktlNoDn/giphy.gif" alt="animated" /><br />
    <h3 align="center">Input Submission, Dashboard and Graphs</h3>

  <img src="https://media.giphy.com/media/dY8TebUTKbWDixb2tU/giphy.gif" alt="animated" /><br />
    <h3 align="center">Records Library</h3>

  <img src="https://media.giphy.com/media/lMAbvaeFIHkSC9docz/giphy.gif" alt="animated" /><br />
  </div>

## Components and Contributors

Architect Owner and Records: Gil Cohen  
Firebase Authentication and Firestore DBMS: Alex Krut, Junsu Park  
Dashboard and UI: Zebib Gebraslassie  
Input Form and UI: Jerry Tapia  
Graphs: Xiaohuan Hu, Junsu Park  

React Router: Gil Cohen, Jerry Tapia  
React Toastify and Badges: Alex Krut  
React Global Context API: Gil Cohen  

## LOCAL SETUP

In the project directory, begin by running:

#### `npm install`

to install dependencies for the project.

to run the project locally, type in 
#### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

Additionally, you will need to initiate the server file by typing: 
#### `npm run server-dev`

which will start the server that will route front-end requests to Firebase.

## FIREBASE SETUP

Create a firebase account and setup a new Project

[https://console.firebase.google.com/u/0/](https://console.firebase.google.com/u/0/)

Once created, “Build” the following 2 services on Firebase:

1. Authentication 
- Set it up with the option for Name and Password

 2. Firestore Database [not Realtime db]
- Toggle this to be 'Production' ready
- Copy the following Rule into the 'RULES' tab for 
`rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /users/{userId}/{documents=**} {
allow read, write: if true;
}
}
}`
- Settings > Project Settings > General > Your apps > click the </> icon (****Add Firebase to your web app)****

- Follow the instructions provided and install firebase locally
- Copy and rename your env.copy file into a blank '.env file'. Make sure this file is greyed out (part of .gitignore file).
  - Add apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId to the .ENV file you made earlier (located in the root of file).
    - REACT_APP_DATABASE_URL inside .env file will be the “name_of_project.firebaseio.com”

Test that everything works by registering a new user and submitting your first problem.


## Technologies Used

- Setup and Configuration \
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

- Front End Development : Javascript, React.js, React Router, React Toastify, Apache Echarts, Axios, Material UI, HTML, CSS \
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

- Back End Development: Node.js, Express.js, Firebase, Firestore \
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

- Deployment: Firebase Hosting

- Team Collaboration: \
![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

## Contact

#### ZEBIB
Github: zebibg <br />
Email: zgebres@gmail.com

#### GIL
Github: gilcohen67 <br />
Email: gil.cohen67@gmail.com

#### XIAOHUAN
Github: xiaohuan0319 <br />
Email: huxiaohuan.jlu@gmail.com

#### JUNSU
Github: junsupark94 <br />
Email: junsupark94@gmail.com

#### JERRY 
Github: jerrytapia <br />
Email: jerryxtapia@gmail.com

#### ALEX
Github: EtoKruto <br />
Email: akrut26@gmail.com

<p align="right">(<a href="#top">back to top</a>)</p>
