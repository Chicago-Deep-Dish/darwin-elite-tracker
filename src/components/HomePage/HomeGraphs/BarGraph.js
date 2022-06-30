import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import {data} from  './sampleData.js';


export default function Bar() {

  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('');
  const [subject, setSubject] = React.useState([]);

  const [input, setInput]=React.useState([0,0,0])
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('week');
  const [language, setLanguage]=React.useState('Javascript');


  React.useEffect(() => {
    var easy = 0;
    var medium = 0;
    var hard = 0;
    //send request during 'range' time with 'language' for  as data
    // console.log('subject',subject);
    if (graph==='totalQuantities') {
      for (let problem in data) {
        const difficulty = data[problem].mapValue.fields.difficulty.stringValue.toLowerCase();
        if (difficulty === 'easy') easy++;
        else if (difficulty === 'medium') medium++;
        else hard++;
      }
    }
    if (graph==='totalTime') {
      for (let problem in data) {
        const difficulty = data[problem].mapValue.fields.difficulty.stringValue.toLowerCase();
        const totalTime = data[problem].mapValue.fields.totalTime.integerValue;
        if (difficulty === 'easy') {
          easy += totalTime;
        } else if (difficulty === 'medium') {
          medium += totalTime;
        } else {
          hard += totalTime;
        }
      }
    }
    setInput([easy, medium, hard]);
    // console.log('state', [easy, medium, hard]);
    // console.log('testtt', state.speed)
  }, [graph,selection, subject])

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
      <MenuBar
        graph={graph}
        subject={subject}
        selection={selection}
        time={time}
        range={range}
        language={language}
        setSelection={setSelection}
        setGraph={setGraph}
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
      <Box sx={{ '&:hover':{boxShadow:3},   width:'500px', m:4, backgroundColor:'white'}}>
        <ReactEcharts option={option} />
      </Box>
    </Stack>
  )
}