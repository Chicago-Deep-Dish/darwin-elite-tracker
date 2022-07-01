/* eslint-disable no-loop-func */
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';
import useGlobalContext from '../../../context/GlobalContext.js'

export default function Line() {

  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState('totalQuantities');
  const [selection, setSelection]=React.useState('dificulty');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([]);
  const [legend, setLegend]=React.useState([]);
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('year');
  const [language, setLanguage]=React.useState('Javascript');

  const getLastDate = (x)=> {
    const now = new Date();
    const result=new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
    return result.toISOString();
  }

  React.useEffect (() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;
    const lastDate = getLastDate(0);
    let startDate = getLastDate(6);
    if (range === 'month') {
      startDate = getLastDate(29);
    } else if (range === 'year') {
      startDate = getLastDate(364);
    }
    const timeFiltered = userProblemArray.filter(problem => (problem.timeStamp > startDate && problem.timeStamp < lastDate));
    const timeAndLangFiltered = timeFiltered.filter(sample => sample["programmingLanguage"] === language);

//filter graph type(totalQuantities/ aveerge speed) and setting(difficulty/subject)
  if (graph === 'totalQuantities' && selection === 'subject') {
    const subjectTeam = {};
    timeAndLangFiltered.forEach(problem => {
      if (subject.includes(problem.topics)) {
        if (subjectTeam[problem.topics] === undefined) {
          subjectTeam[problem.topics] = [];
        }
        subjectTeam[problem.topics].push(problem);
      }
    })
    const updateFormate = {};
    for (let subject in subjectTeam) {
      const temp = {};
      subjectTeam[subject].forEach(problem => {
        const time = problem.timeStamp.slice(0,10);
        if (temp[time] !== undefined) {
          temp[time]++;
        } else {
          temp[time] = 1;
        }
      })
      updateFormate[subject] = temp;
    }

    //convert format to fit graph
    const finalResult = [];
    for (let key in updateFormate) {
      const temp = {};
      temp['name'] = key;
      temp['type'] = 'line';
      //temp['stack']='Total';
      temp['data'] = [];
      for (let value in updateFormate[key]) {
          temp.data.push([value, updateFormate[key][value]]);
      }
      finalResult.push(temp);
    }

    const container = [];
    for (let i = 0; i < finalResult.length; i++) {
      container.push(finalResult[i]['name']);
    }
    setLegend(container);
    setInput(finalResult);
  }
//at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};




  if (graph === 'totalQuantities' && selection === 'difficulty') {
    const subjectTeam = {};
    timeAndLangFiltered.forEach(problem => {
      subjectTeam[problem.difficulty] = subjectTeam[problem.difficulty] === undefined ? [] : subjectTeam[problem.difficulty];
      subjectTeam[problem.difficulty].push(problem);
    })

    const updateFormate = {};
    for (let subject in subjectTeam) {
      const temp = {};
      subjectTeam[subject].forEach(problem => {
        const time = problem.timeStamp.slice(0, 10);
        if (temp[time] !== undefined) {
          temp[time]++;
        } else {
          temp[time] = 1;
        }
      })
      updateFormate[subject]=temp;
    }
  //at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};

    //convert format to fit graph
    const finalResult = [];
    for (let difficulty in updateFormate) {
      const temp = {};
      temp['name'] = difficulty;
      temp['type'] = 'line';
      //temp['stack']='Total';
      temp['data'] = [];
      for (let date in updateFormate[difficulty]) {
          temp['data'].push([date, updateFormate[difficulty][date]]);
      }
      finalResult.push(temp);
    }

    const containerB = finalResult.map(set => set.name);
    setLegend(containerB);
    setInput(finalResult);
  }


if (graph === 'totalTime' && selection === 'subject') {
  const subjectTeam = {};
  timeAndLangFiltered.forEach(problem => {
    const sub = problem.topics;
    if (subject.includes(sub)) {
      subjectTeam[sub] = subjectTeam[sub] === undefined ? [] : subjectTeam[sub];
      subjectTeam[sub].push(problem);
    }
  })

  //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
  const updateFormate = {};
  for (let topic in subjectTeam) {
    const temp={};
    subjectTeam[topic].forEach(problem => {
      const time = problem.timeStamp.slice(0, 10);
      if (temp[time]!==undefined) {
        temp[time] = (temp[time]+ Number(problem['totalTime'])/1000/60)/2;
      } else {
        temp[time] = Number(problem['totalTime'])/1000/60;
      }
    })
    updateFormate[topic]=temp;
  }
  const finalResult=[];
  for (let key in updateFormate) {
    const temp = {};
    temp['name'] = key;
    temp['type'] = 'line';
    //temp['stack']='Total';
    temp['data'] = [];
    for (let value in updateFormate[key]) {
        temp['data'].push([value, updateFormate[key][value]]);
    }
    finalResult.push(temp);
  }
  const containerC = [];
  finalResult.forEach(set => containerC.push(set.name));
  setLegend(containerC);
  setInput(finalResult);
}

if (graph === 'totalTime' && selection === 'difficulty') {
  const subjectTeam = {};
  timeAndLangFiltered.forEach(problem => {
    const difficulty = problem.difficulty;
    if (subjectTeam[difficulty] === undefined) {
      subjectTeam[difficulty] = [];
    }
    subjectTeam[difficulty].push(problem);
  })
  //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
  const updateFormate={};
  for (const key in subjectTeam) {
    const timeAndValue=subjectTeam[key];
    const temp={};
    for (let i=0; i<timeAndValue.length; i++) {
      const time=timeAndValue[i]['timeStamp'].slice(0,10);
      if (temp[time] !== undefined) {
        temp[time] = (temp[time] + Number(timeAndValue[i]['totalTime'])/1000/60)/2;
      } else {
        temp[time]=Number(timeAndValue[i]['totalTime'])/1000/60;
      }
    }
    updateFormate[key]=temp;
  }

  const finalResult = [];
  for (let key in updateFormate) {
    const temp = {};
    temp['name'] = key;
    temp['type'] = 'line';
    //temp['stack']='Total';
    temp['data'] = [];
    for (let value in updateFormate[key]) {
        temp['data'].push(value, updateFormate[key][value]);
    }
    finalResult.push(temp);
  }
  const containerD = [];
  for (let i=0; i<finalResult.length; i++) {
    containerD.push(finalResult[i]['name']);
  }
  setLegend(containerD);
  setInput(finalResult);
}

},  [graph,selection, subject,time, language,range])


  const option = {
    title: {
      text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null,
      padding:[20,5,5,5],
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '20%',
      bottom: '1%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        formatter: (function(value){
            return moment(value).format('MM/DD');
        })
      }
    },
    yAxis: {
      type: 'value'
    },
     series: input
    //[ //need to update according to data
    //   { // sample data firstly filter with range ; then filter with hardlevel;
    //     name: 'Hard',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-27", 33], ["2022-06-27T10:35:45",132], ["2022-06-28T17:35:45",101]]
    //   },
    //   {
    //     name: 'Medium',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-25T10:35:45", 3], ["2022-06-27T12:35:45",132], ["2022-06-28T17:35:45",101]]
    //   },
    //   {
    //     name: 'Easy',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-25T10:35:45", 3], ["2022-06-27T19:35:45",132], ["2022-06-28T20:35:45",101]]
    //   }
    // ]
  }
  return (
    <Stack>
      <Box sx={{ '&:hover':{boxShadow:3},  width:'500px', ml:4, mr:4, mt:1,mb:2, backgroundColor:'black'}}>
        <ReactEcharts option={option} />
      </Box>
      <MenuBar
        graph={graph}
        setGraph={setGraph}
        subject= {subject}
        selection={selection}
        setSelection={setSelection}
        time={time}
        range={range}
        language={language}
        handleSubject={(e) => setSubject(e.target.value)}
        handleRange={(e) => setRange(e.target.value)}
        handleLanguage={(e) => setLanguage(e.target.value)}
        handleTime={(e) => setTime(e.target.value)}
        handleGraph={(e) => setGraph(e.target.value)}
        handleSelection={(e) => {
          setSelection(e.target.value);
          setSubject([]);
        }}
      />
  </Stack>
  )
};