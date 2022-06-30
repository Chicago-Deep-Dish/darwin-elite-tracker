
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
  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([])
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('week');
  const [language, setLanguage]=React.useState('Javascript');

  const handleTime = (event) => {
    console.log('hit1', event.target.value);
    setTime(event.target.value);
  };
  const handleRange= (event) => {
    console.log('hit2',event.target.value);
    setRange(event.target.value);
  };
  const handleLanguage = (event) => {
    console.log('hit3',event.target.value);
    setLanguage(event.target.value);
  };

  const handleGraph = (event) => {
    console.log('hit4',event.target.value);
    setGraph(event.target.value);
  };
  const handleSelection= (event) => {
    console.log('hit5',event.target.value);
    setSelection(event.target.value);
    setSubject([]);
  };
  const handleSubject= (event) => {
    console.log('hit6',event.target.value);
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
    console.log('easy,hard,medium', easy, medium, hard);
    //send request during 'range' time with 'language' for  as data
   // console.log('subject',subject);

   //filter range
    if ( range==='week') {
      for (let i=0; i< userProblemArray.length; i++) {
        if( userProblemArray[i]['timeStamp']>startDate&&userProblemArray[i]["timeStamp"]<lastDate) {
          samples.push(userProblemArray[i]);
        }
      }
    }else if ( range==='month') {
      startDate=getLastDate(29);
      for (let i=0; i< userProblemArray.length; i++) {
        if( userProblemArray[i]['timeStamp']>startDate&&userProblemArray[i]["timeStamp"]<lastDate) {
          samples.push(userProblemArray[i]);
        }
      }
    }else if ( range === 'year') {
      startDate=getLastDate(364);
      for (let i=0; i< userProblemArray.length; i++) {
        if( userProblemArray[i]['timeStamp']>startDate&&userProblemArray[i]["timeStamp"]<lastDate) {
          samples.push(userProblemArray[i]);
        }
      }
    }
  //console.log( 'rangggge' , range, samples);
  console.log('SAAAAAAMples', samples)
  //filter the language
  var sampleUpdate=[];
  for ( let i=0; i<samples.length; i++) {
    if ( samples[i]['programmingLanguage']!==undefined) {
      if(samples[i]['programmingLanguage'].toLowerCase()===language.toLowerCase()) {
      sampleUpdate.push(samples[i]);
    }
  }
}
  console.log('updated', sampleUpdate)

  //filter total&subject
if (graph==='totalQuantities'&&selection==='subject') {
  for (let i=0; i<sampleUpdate.length; i++) {
    var result=Array(subject.length).fill(0);
    var sub=sampleUpdate[i]['topics'];
    console.log('subbb', sub, result);
    var index=subject.indexOf(sub);
    if(index>=0) {
    result[index]++;
    }
  }
    console.log( 'filter subject and total', result);
    setInput(result);
} //working

if (graph==='totalQuantities'&&selection==='difficulty') {
  //axios.get('/total', { params:{"range":range,'language':language}})

  for ( let i=0; i<sampleUpdate.length; i++) {
    if (sampleUpdate[i].difficulty.toLowerCase()==='easy') {
      easy++;
    } else if ( sampleUpdate[i].difficulty.toLowerCase()==='medium') {
      medium++;
    }else {
      hard++;
    }
  }
  console.log('difficulty & total', [easy, medium, hard])
  setInput([easy, medium, hard]);

}//working

if (graph==='totalTime'&&selection==='subject') {
 // axios.get('/total', { params:{'selection':subject, "range":range,'language':language}})
 var totalTime;
 for (let i=0; i<sampleUpdate.length; i++) {
  totalTime=Array(subject.length).fill(0);
  var count=Array(subject.length).fill(0);
  var sub=sampleUpdate[i]['topics'];
  //console.log('subbb', sub, totalTime);
  var index=subject.indexOf(sub);
  if(index>=0) {
  totalTime[index]=totalTime[index]+sampleUpdate[i]['totalTime'];
  count[index]++;
  }
}
console.log('hit7', sampleUpdate);
console.log('hit6', totalTime)
if (totalTime) {
for (let i=0; i<totalTime.length; i++) {
  if (totalTime[i]!==0) {
    totalTime[i]=totalTime[i]/count[index];
    totalTime[i]=totalTime[i]/1000/60;
  }
}
}
  console.log( 'filter subject and total', totalTime);
  setInput(totalTime);

}

if(graph==='totalTime'&&selection==='difficulty') {
  var countE=0;
  var countM=0;
  var countH=0;
  //axios.get('/total', { params:{"range":range,'language':language}})
  for ( let i=0; i<sampleUpdate.length; i++) {
    if (sampleUpdate[i].difficulty.toLowerCase()==='easy') {
      easy = easy + sampleUpdate[i]["totalTime"];
      countE++;
    } else if ( sampleUpdate[i].difficulty.toLowerCase()==='medium') {
      medium = medium + sampleUpdate[i]["totalTime"];
      countM++;
    }else {
      hard = hard + sampleUpdate[i]["totalTime"];
      countH++
    }
  }
//get average and change to minus
  if(countE!==0){
    easy=easy/countE;
    easy=easy/1000/60;
  }
  if(countM!==0){
    medium=medium/countM;
    medium=medium/1000/60;
  }
  if(countH!==0){
    hard=hard/countH;
    hard=hard/1000/60;
  }

  setInput([easy, medium, hard]);

}//done but not checked

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
