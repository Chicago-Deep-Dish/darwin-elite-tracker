
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import {data} from  './sampleData.js';


export default function Bar() {

  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('difficulity');

  const [input, setInput]=React.useState([0,0,0])
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('week');
  const [language, setLanguage]=React.useState('Javascript');

  const handleTime = (event) => {
    setTime(event.target.value);
  };
  const handleRange= (event) => {
    setRange(event.target.value);
  };
  const handleLanguage = (event) => {
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
    //send request during 'range' time with 'language' for  as data
    console.log('graphhh', graph);
    if (graph==='totalQuantities') {
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
    if (graph==='totalTime') {
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
    // console.log('state', [easy, medium, hard]);
    // console.log('testtt', state.speed)
  }, [graph,selection])

  const option = {
    title:{
      text: graph==='speed'?'speed (mins)':graph==='total'?'total':null
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['easy', 'medium', 'hard']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: input,
        type: 'bar',
        emphasis: {
          itemStyle: {
            color: '#DC9E41'
          }
        }
      }
    ]
  }
return (
  <Stack >
    <MenuBar  graph={graph} setGraph={setGraph} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>
    <Box sx={{ '&:hover':{boxShadow:3},   width:'500px', m:4, backgroundColor:'white'}}>
      <ReactEcharts option={option} />
    </Box>
  </Stack>
)
}
