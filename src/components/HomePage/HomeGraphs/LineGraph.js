import React, {useState} from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';

export default function Line() {
  const [state, setState] = React.useState({
    speed: false,
    frequency: false,
    total: true,
    difficulty: true,
    name: false,
    subject:false
  });

console.log('testtt', state.speed)
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const getLastDate = (x)=> {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
  }

  var hard = 0;
  var medium = 0;
  var easy = 0;
  const [xValue, setxValue]=useState([]);

  React.useEffect ( ()=>{
    const date = new Date();
    const day = date.getDate();


     var week = [["2018-08-15T10:04:01.339Z",1], [ "2018-08-15T10:14:13.914Z",3], ["2018-08-15T10:40:03.147Z",9], ["2018-08-15T12:04:05.655Z",5], ["2018-08-15T11:50:14.335Z",6],["2018-08-15T15:00:19.441Z"
    , 10]];
     setxValue(week);







  }, [state, time, range, language])


  const option = {
    title: {
      text: 'Stacked Line',
      padding:[20,5,5,5],
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Easy', 'Medium', 'Hard']
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
            return moment(value).format('HH:mm');
        })
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Easy',
        type: 'line',
        stack: 'Total',
        data: xValue
      },
      {
        name: 'Medium',
        type: 'line',
        stack: 'Total',
        data: xValue
      },
      {
        name: 'Hard',
        type: 'line',
        stack: 'Total',
        data: xValue
      }
    ]
  }
  return (
    <Stack>
      <MenuBar state={state} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleChange={handleChange}/>
      <Box sx={{ '&:hover':{boxShadow:3},  width:'500px', m:4, backgroundColor:'white'}}>
        <ReactEcharts option={option} />
      </Box>
  </Stack>
  )
};