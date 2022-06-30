import React, {useState} from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';
import data from  './sampleData.js';


export default function Line() {
  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('dificulty');
  const [subject, setSubject] = React.useState([]);

  //const { speed, frequency, total, difficulty, name, subject} = state;

  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('week');
  const [language, setLanguage]=React.useState('Javascript');

  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleRange= (event: SelectChangeEvent) => {
    setRange(event.target.value);
  };
  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handleGraph = (event) => {
    setGraph(event.target.value);
  };
  const handleSelection= (event) => {
    setSelection(event.target.value);
    setSubject([]);
  };

  const handleSubject= (event) => {
    setSubject(event.target.value);
  };
  const getLastDate = (x)=> {
  const now = new Date();
  const result=new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
  return result.toISOString();
  }

  var hard = [];
  var medium = [];
  var easy = [];
  const [easyValue, setEasy] = useState([]);
  const [mediumValue, setMedium] = useState([]);
  const [hardValue, setHard] = useState([]);

  React.useEffect ( ()=>{
    console.log('subbbject in line', subject);

    //series needs to change like this :

    // {
    //   name: 'Easy',
    //   type: 'line',
    //   stack: 'Total',
    //   data: easyValue ///format will be [ [timestamp,value], [timestamp, value].....]
    // },

    var series=[];



    // const date = new Date();
    // const day = date.getDate();
    // const first = getLastDate(6);
    // const last = getLastDate(0);
    // if (range === 'week') {
    //   for (let i = 0; i < data.data.length; i++) {
    //     if(data.data[i]['Time']<=last && data.data[i]['Time']>= first ) {
    //       if(data.data[i].Difficulty.toLowerCase()==='easy'){
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         easy.push(arr);
    //       }else if (data.data[i].Difficulty.toLowerCase()==='medium'){
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         medium.push(arr);
    //       }else {
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         hard.push(arr);
    //       }
    //     }

    //   }
    //   console.log('hardddd', hard, easy, medium);
    // } else if (range === 'day') {
    //   const last = getLastDate(0);
    //   for (let i = 0; i < data.data.length; i++) {
    //     if(data.data[i]['Time']<=last && data.data[i]['Time']>= first ) {
    //       if(data.data[i].Difficulty.toLowerCase()==='easy'){
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         easy.push(arr);
    //       }else if (data.data[i].Difficulty.toLowerCase()==='medium'){
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         medium.push(arr);
    //       }else {
    //         var arr=[];
    //         arr.push(data.data[i]['Time']);
    //         arr.push(data.data[i]['Total Time']);
    //         hard.push(arr);
    //       }
    //     }

    //   }
    // }
    // setEasy(easy);
    // setMedium(medium);
    // setHard(hard);
  }, [graph, selection, subject, time,language, range])


  const option = {
    title: {
      text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null,
      padding:[20,5,5,5],
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: selection==='difficulty'?['Easy', 'Medium', 'Hard']:console.log('anything',selection, subject)
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
      axisLabel: range==='year'?{
        formatter: (function(value){
            return moment(value).format('MM');
        })
      }:{
        formatter: (function(value){
            return moment(value).format('MM/DD');
        })
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [ //need to update according to data
      { // sample data firstly filter with range ; then filter with hardlevel;
        name: 'Easy',
        type: 'line',
        stack: 'Total',
        data: [["2022-06-27T12:35:45", 33], ["2022-06-27T10:35:45",132], ["2022-06-28T17:35:45",101]]
      },
      {
        name: 'Medium',
        type: 'line',
        stack: 'Total',
        data: [["2022-06-25T10:35:45", 3], ["2022-06-27T12:35:45",132], ["2022-06-28T17:35:45",101]]
      },
      {
        name: 'Hard',
        type: 'line',
        stack: 'Total',
        data: [["2022-06-25T10:35:45", 3], ["2022-06-27T19:35:45",132], ["2022-06-28T20:35:45",101]]
      }
    ]
  }
  return (
    <Stack>
      <Box sx={{ '&:hover':{boxShadow:3},  width:'500px', ml:4, mr:4, mt:1,mb:2, backgroundColor:'black'}}>
        <ReactEcharts option={option} />
      </Box>
      <MenuBar graph={graph} setGraph={setGraph} subject= {subject} handleSubject={handleSubject} selection={selection} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>

  </Stack>
  )
};