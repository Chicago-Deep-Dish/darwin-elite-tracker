
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import {data} from  './sampleData.js';

export default function Pie() {

  const [state, setState] = React.useState({
    speed: false,
    frequency: false,
    total: true,
    difficulty: true,
    name: false,
    subject:false
  });

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  var easy = 0;
  var medium = 0;
  var hard = 0;

  React.useEffect ( ()=>{

    if (state.total===true) {
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
    if (state.speed===true) {
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
  }, [state, time, range, language])

  const option = {
    title:{
      text: state.speed?'speed (mins/question)':state.total?'total quantities':state.frequency?'frequency':null
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
        data: [
          { value: input[0], name: 'easy' },
          { value: input[1], name: 'medium' },
          { value: input[2], name: 'hard' },
        ]

      }
    ]
  };
return (
  <Stack>
    <MenuBar state={state} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleChange={handleChange}/>
    <Box sx={{ '&:hover':{boxShadow:3}, width:'500px', m:4, backgroundColor:'white'}}>
      <ReactEcharts option={option} />
    </Box>
  </Stack>
)
}