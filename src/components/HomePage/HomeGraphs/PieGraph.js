
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import data from  './sampleData.js';
import axios from 'axios';


export default function Pie() {

  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('');
  const [subject, setSubject] = React.useState([]);
  //const { speed, frequency, total, difficulty, name, subject} = state;
  const [input, setInput]=React.useState([0,0,0])
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
  var easy = 0;
  var medium = 0;
  var hard = 0;

  React.useEffect ( ()=>{
    if (graph==='totalQuantities'&&selection==='subject') {
      //for total and subject
      axios.get('/total', { params:{'selection':subject, "range":range,'language':language}})


    }
    if (graph==='totalQuantities'&&selection==='difficulty') {
      axios.get('/total', { params:{"range":range,'language':language}})

      for ( let i=0; i<data.data.length; i++) {
        if (data.data[i].Difficulty.toLowerCase()==='easy') {
          easy++;
        } else if ( data.data[i].Difficulty.toLowerCase()==='medium') {
          medium++;
        }else {
          hard++;
        }
      }
    }


    if (graph==='totalTime'&&selection==='subject') {
      axios.get('/total', { params:{'selection':subject, "range":range,'language':language}})





    }

    if(graph==='totalTime'&&selection==='difficulty') {
      axios.get('/total', { params:{"range":range,'language':language}})

      for ( let i=0; i<data.data.length; i++) {
        if (data.data[i].Difficulty.toLowerCase()==='easy') {
          easy = easy + data.data[i]["Total Time"];
        } else if ( data.data[i].Difficulty.toLowerCase()==='medium') {
          medium = medium + data.data[i]["Total Time"];
        }else {
          hard = hard + data.data[i]["Total Time"];
        }
      }
    }


   setInput([easy, medium, hard]);
    // console.log('state', language,range,time);
    // console.log('testtt', state.speed)
  },  [graph,selection, subject,time, language,range])

  const option = {
    title:{
      text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
     top:'bottom',
     left: '80%'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Pie Chart Data',
        type: 'pie',
        radius: [20, 100],
        center: ['40%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: selection==='difficulty'?
        [ { value: input[0], name: 'easy' },
          { value: input[1], name: 'medium' },
          { value: input[2], name: 'hard' },
        ]:[
          'subject'//neeed to update it

        ]

      }
    ]
  };
return (
  <Stack>
    <Box sx={{ '&:hover':{boxShadow:3}, width:'500px',  ml:4, mr:4, mt:1,mb:2, backgroundColor:'white'}}>
      <ReactEcharts option={option} />
    </Box>
    <MenuBar graph={graph} setGraph={setGraph} subject= {subject} handleSubject={handleSubject} selection={selection} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>

  </Stack>
)
}