
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import {data} from  './sampleData.js';

export default function Donut() {

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
    <MenuBar state={state} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleChange={handleChange}/>
    <Box sx={{ '&:hover':{boxShadow:3}, width:'500px', m:4, backgroundColor:'white'}}>
      <ReactEcharts option={option} />
    </Box>
  </Stack>
)
}