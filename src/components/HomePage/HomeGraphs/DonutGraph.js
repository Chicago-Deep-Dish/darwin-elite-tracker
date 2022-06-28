
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import {data} from  './sampleData.js';

export default function Donut() {

  const [graph, setGraph] = React.useState('speed');
  const [selection, setSelection]=React.useState('difficulity');

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
  };

  var easy = 0;
  var medium = 0;
  var hard = 0;

  React.useEffect ( ()=>{

    if (graph==='total') {
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
    if (graph==='speed') {
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
  }, [graph, selection, time, range, language])

  const option = {
    title:{
      text: graph==='speed'?'speed (mins)':graph==='total'?'total':null
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
     top:'bottom',
     left: '80%'
    },
    series: [
      {
        name: 'Donut',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: input[0], name: 'Easy' },
          { value: input[1], name: 'Medium'},
          { value: input[2], name: 'Hard' }
        ]
      }
    ]
  };
return (
  <Stack>
    <MenuBar graph={graph} setGraph={setGraph} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>
    <Box sx={{ '&:hover':{boxShadow:3}, width:'500px', m:4, backgroundColor:'white'}}>
      <ReactEcharts option={option} />
    </Box>
  </Stack>
)
}