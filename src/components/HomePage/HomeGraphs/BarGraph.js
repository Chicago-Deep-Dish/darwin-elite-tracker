
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import data from  './sampleData.js';
import axios from 'axios';
import useGlobalContext from '../../../context/GlobalContext.js'

export default function Bar() {
  const { userProblemArray } = useGlobalContext();
 console.log( 'dattaaaaaa',userProblemArray);
  const [graph, setGraph] = React.useState('totalQuantities');
  const [selection, setSelection]=React.useState('difficulty');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([])
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('year');
  const [language, setLanguage]=React.useState('Javascript');

  const getLastDate = (x)=> {
    const now = new Date();
    const result=new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
    return result.toISOString();
  }

  React.useEffect(() => {
    var easy = 0;
    var medium = 0;
    var hard = 0;
    var lastDate=getLastDate(0);
    var startDate=getLastDate(6);
    if (range === 'month') {
      startDate = getLastDate(29);
    } else if (range === 'year') {
      startDate = getLastDate(364);
    }
    const timeFiltered = userProblemArray.filter(problem => (problem.timeStamp > startDate && problem.timeStamp < lastDate));
    const timeAndLangFiltered = timeFiltered.filter(sample => sample["programmingLanguage"] === language);

    //filter total&subject
    if (graph === 'totalQuantities' && selection === 'subject') {
      var result = Array(subject.length).fill(0);
      timeAndLangFiltered.forEach(problem => {
        var index = subject.indexOf(problem.topics);
        if (index !== -1) {
          result[index]++;
        }
      })
      setInput(result);
    } //working

    if (graph === 'totalQuantities' && selection === 'difficulty') {
      timeAndLangFiltered.forEach(problem => {
        if(problem.difficulty === 'easy') easy++;
        else if (problem.difficulty === 'medium') medium++;
        else hard++;
      })
      setInput([easy, medium, hard]);
    }//working

    if (graph === 'totalTime' && selection === 'subject') {
      var totalTime = Array(subject.length).fill(0);
      var count=Array(subject.length).fill(0);
      timeAndLangFiltered.forEach(problem => {
        const index = subject.indexOf(problem.topics);
        if (index !== -1) {
          totalTime[index] = parseInt(problem.totalTime);
          count[index]++;
        }
      });
      totalTime = totalTime.map((time, i) => {
        if(time !== 0) {
          time /= count[i]; // Junsu: average
          time /= 1000; // Junsu: 1000 milliseconds
          time /= 60; // Junsu: 60 seconds
        }
        return time;
      })
      setInput(totalTime);
    }

    if(graph === 'totalTime' && selection === 'difficulty') {
      var countE = 0, countM = 0, countH = 0;
      timeAndLangFiltered.forEach(problem => {
        if (problem.difficiulty === 'easy') {
          easy += parseInt(problem.totalTime);
          countE++;
        } else if (problem.difficulty === 'medium') {
          medium += parseInt(problem.totalTime);
          countM++;
        } else {
          hard += parseInt(problem.totalTime);
          countH++;
        }
      });
    //get average and change to minus
      if(countE!==0){
        easy /= countE;
        easy /= 1000;
        easy /= 60;
      }
      if(countM!==0){
        medium /= countM;
        medium /= 1000;
        medium /= 60;
      }
      if(countH!==0){
        hard /= countH;
        hard /= 1000;
        hard /= 60;
      }
      setInput([easy, medium, hard]);
    }//Junsu: working now
  }, [graph, selection, subject, time, language, range])

  const option = {
    title:{
      text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: selection==='difficulty'?['easy', 'medium', 'hard']:subject
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { title:{color:'red'},
        data: input,
        type: 'bar',
        emphasis: {
          itemStyle: {
            color: '#fac858'
          }
        }
      }
    ]
  }
  return (
    <Stack >
      <Box sx={{ '&:hover':{boxShadow:5},   width:'500px', ml:4, mr:4, mt:1,mb:2, backgroundColor: 'black'}}>
        <ReactEcharts option={option} />
      </Box>
      <MenuBar
        graph={graph}
        subject= {subject}
        selection={selection}
        time={time}
        range={range}
        language={language}
        setGraph={setGraph}
        setSelection={setSelection}
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
}