/* eslint-disable no-loop-func */
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';
import useGlobalContext from '../../../context/GlobalContext.js';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

export default function Line() {

  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState('totalQuantities');
  const [selection, setSelection]=React.useState('difficulty');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([]);
  const [legend, setLegend]=React.useState([]);
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('year');
  const [language, setLanguage]=React.useState('Javascript');
  const [toggleGraphMenu, setToggleGraphMenu] = React.useState(false);

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
    setInput([]);
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
      temp['data'] = [];
      for (let value in updateFormate[key]) {
        var data=[];
        data.push(value);
        data.push(updateFormate[key][value]);
        temp['data'].push(data);
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

    const finalResultD = [];
    for (let key in updateFormate) {
      const temp = {};
      temp['name'] = key;
      temp['type'] = 'line';
      //temp['stack']='Total';
      temp['data'] = [];
      for (let value in updateFormate[key]) {
        var data = [];
        data.push(value);
        data.push(updateFormate[key][value]);
        temp['data'].push(data);
      }
      finalResultD.push(temp);
    }
    const containerD = [];
    for (let i = 0; i < finalResultD.length; i++) {
      containerD.push(finalResultD[i]['name']);
    }

    setLegend(containerD);
    setInput(finalResultD);
  }

  },  [graph,selection, subject,time, language,range, userProblemArray])


  const option = {
    title: {
      text: graph === 'totalTime' ? 'Speed (mins)': graph === 'totalQuantities' ? 'Total': null,
      padding: [20,5,5,5],
      textStyle: {
        color: 'white'
      }
    },
    textStyle: {
      color: function (value, index) {
        return 'white';
      },
      fontWeight: 'bold'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend,
      textStyle: {color: 'white'}
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

  }
  return (
    <Stack style={{height: '605px'}}>
      <Box sx={{ '&:hover': {boxShadow:3},  width: '500px', ml: 4, mr: 4, mt: 1, mb: 2, backgroundColor: '#1A2027',borderTopLeftRadius: 4, borderTopRightRadius: 4, padding: 3}}>
        <ReactEcharts option = {option} />
      </Box>
      <Container sx = {{backgroundColor: '#1A2027', width: '500px', padding: 1}}>
        <div style = {{display: 'flex', justifyContent: 'center'}}>
          <IconButton  sx = {{right: '30%'}} onClick = {() => setToggleGraphMenu(!toggleGraphMenu)}>
            {toggleGraphMenu ? (<ArrowDropUp/>) : (<ArrowDropDown />)}
           </IconButton>
       <Typography style = {{marginRight: '1%'}}>Hide Graph Menu</Typography>
      </div>
      </Container>
      <Collapse in = {toggleGraphMenu}>
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
      </Collapse>

  </Stack>

  )
};