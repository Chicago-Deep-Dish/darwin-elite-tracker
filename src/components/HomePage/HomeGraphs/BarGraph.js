
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import data from  './sampleData.js';
import axios from 'axios';

export default function Bar() {

  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([])
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

  var easy = 0;
  var medium = 0;
  var hard = 0;
  var lastDate=getLastDate(0);
  var startDate=getLastDate(6);

  React.useEffect ( ()=>{
    var samples=[];

    //send request during 'range' time with 'language' for  as data
   // console.log('subject',subject);

   //filter range
    if ( range==='week') {
      for (let i=0; i< data.data.length; i++) {
        if( data.data[i]['Time']>startDate&&data.data[i]["Time"]<lastDate) {
          samples.push(data.data[i]);
        }
      }
    }else if ( range==='month') {
      startDate=getLastDate(29);
      for (let i=0; i< data.data.length; i++) {
        if( data.data[i]['Time']>startDate&&data.data[i]["Time"]<lastDate) {
          samples.push(data.data[i]);
        }
      }
    }else if ( range === 'year') {
      startDate=getLastDate(364);
      for (let i=0; i< data.data.length; i++) {
        if( data.data[i]['Time']>startDate&&data.data[i]["Time"]<lastDate) {
          samples.push(data.data[i]);
        }
      }
    }
  //console.log( 'rangggge' , range, samples);

  //filter the language
  var sampleUpdate=[];
  for ( let i=0; i<samples.length; i++) {
    if ( samples[i]['language']!==undefined) {
      if(samples[i]['language'].toLowerCase()===language.toLowerCase()) {
      sampleUpdate.push(samples[i]);
    }
  }
}
  //console.log('updated', sampleUpdate)

    if (graph==='totalQuantities'&&selection==='subject') {
      for (let i=0; i<sampleUpdate.length; i++) {
        var result=Array(subject.length).fill(0);
        var sub=sampleUpdate[i]['Topic'];
        console.log('subbb', sub, result);
        var index=subject.indexOf(sub);
        if(index>=0) {
        result[index]++;
        }
      }
        console.log( 'filter subject and total', result);
        setInput(result);
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
    // console.log('state', [easy, medium, hard]);
    // console.log('testtt', state.speed)
  }, [graph,selection, subject, time, language,range])

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
      {
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
    <MenuBar  graph={graph} setGraph={setGraph} subject= {subject} handleSubject={handleSubject} selection={selection} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>

  </Stack>
)
}
