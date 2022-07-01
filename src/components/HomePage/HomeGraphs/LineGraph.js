import React, {useState} from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';
import data from  './sampleData.js';
import useGlobalContext from '../../../context/GlobalContext.js'

export default function Line() {

  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState('totalQuantities');
  const [selection, setSelection]=React.useState('dificulty');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([]);
  const [legend, setLegend]=React.useState([]);
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('year');
  const [language, setLanguage]=React.useState('Javascript');

  const getLastDate = (x)=> {
    const now = new Date();
    const result=new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
    return result.toISOString();
  }

  React.useEffect (() => {
    var easy = 0;
    var medium = 0;
    var hard = 0;
    var lastDate = getLastDate(0);
    var startDate = getLastDate(6);
    if (range === 'month') {
      startDate = getLastDate(29);
    } else if (range === 'year') {
      startDate = getLastDate(364);
    }
    const timeFiltered = userProblemArray.filter(problem => (problem.timeStamp > startDate && problem.timeStamp < lastDate));
    const timeAndLangFiltered = timeFiltered.filter(sample => sample["programmingLanguage"] === language);

//filter graph type(totalQuantities/ aveerge speed) and setting(difficulty/subject)
  if (graph === 'totalQuantities' && selection==='subject') {
    var subjectTeam={};
    timeAndLangFiltered.forEach(problem => {
      if (subject.includes(problem.topics)) {
        if (subjectTeam[problem.topics] === undefined) {
          subjectTeam[problem.topics] = [];
        }
        subjectTeam[problem.topics].push(problem);
      }
    })
    var updateFormate={};
    for (var key in subjectTeam) {
      var timeAndValue=subjectTeam[key];
      var temp={};
      for (let i=0; i<timeAndValue.length; i++) {
        var time=timeAndValue[i]['timeStamp'].slice(0,10);
        if (temp[time]!==undefined) {
          temp[time]++;
        }else {
          temp[time]=1;
        }

      }
      updateFormate[key]=temp;
    }
  }
//at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};

//convert format to fit graph
 var finalResult=[];
 for (let key in updateFormate) {
   var temp={};
   temp['name']=key;
   temp['type']='line';
   //temp['stack']='Total';
   temp['data']=[];
   for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
   }
   finalResult.push(temp);


 var container=[];
 for (let i=0; i<finalResult.length; i++) {
  container.push(finalResult[i]['name']);
 }
 setLegend(container);
 setInput(finalResult);
}


if(graph==='totalQuantities'&&selection==='difficulty') {
  var subjectTeam={};
  for(let i=0; i<timeAndLangFiltered.length;i++) {
    var sub=timeAndLangFiltered[i]['difficulty'];
    if(subjectTeam[sub]===undefined) {
      subjectTeam[sub]=[];
      subjectTeam[sub].push(timeAndLangFiltered[i]);
    }else{
      subjectTeam[sub].push(timeAndLangFiltered[i]);
    }
  }
  var updateFormate={};
  for (var key in subjectTeam) {
    var timeAndValue=subjectTeam[key];
    var temp={};
    for (let i=0; i<timeAndValue.length; i++) {
      var time=timeAndValue[i]['timeStamp'].slice(0,10);
      if (temp[time]!==undefined) {
        temp[time]++;
      }else {
        temp[time]=1;
      }

    }
    updateFormate[key]=temp;
  }
//at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};

//convert format to fit graph
var finalResult=[];
for (let key in updateFormate) {
 var temp={};
 temp['name']=key;
 temp['type']='line';
 //temp['stack']='Total';
 temp['data']=[];
 for (let value in updateFormate[key]) {
    var data=[];
    data.push(value);
    data.push(updateFormate[key][value]);
    temp['data'].push(data);
 }
 finalResult.push(temp);
}
var containerB=[];
 for (let i=0; i<finalResult.length; i++) {
  containerB.push(finalResult[i]['name']);
 }
 setLegend(containerB);
setInput(finalResult);
}


if ( graph==='totalTime'&&selection==='subject') {
  var subjectTeam={};
  for(let i=0; i<timeAndLangFiltered.length;i++) {
    var sub=timeAndLangFiltered[i]['topics'];
    if( subject.includes(sub)) {
      if(subjectTeam[sub]===undefined) {
        subjectTeam[sub]=[];
        subjectTeam[sub].push(timeAndLangFiltered[i]);
      }else{
        subjectTeam[sub].push(timeAndLangFiltered[i]);
      }
   }
  }
  //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
  var updateFormate={};
  for (var key in subjectTeam) {
    var timeAndValue=subjectTeam[key];
    var temp={};
    for (let i=0; i<timeAndValue.length; i++) {
      var time=timeAndValue[i]['timeStamp'].slice(0,10);
      if (temp[time]!==undefined) {
        temp[time]=(temp[time]+Number(timeAndValue[i]['totalTime'])/1000/60)/2;
      }else {
        temp[time]=Number(timeAndValue[i]['totalTime'])/1000/60;
      }

    }
    updateFormate[key]=temp;
  }

  var finalResult=[];
  for (let key in updateFormate) {
  var temp={};
  temp['name']=key;
  temp['type']='line';
  //temp['stack']='Total';
  temp['data']=[];
  for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
  }
  finalResult.push(temp);
  }
  console.log('total time and subject', finalResult);
  var containerC=[];
 for (let i=0; i<finalResult.length; i++) {
  containerC.push(finalResult[i]['name']);
 }
 setLegend(containerC);
  setInput(finalResult);
}


if ( graph==='totalTime'&&selection==='difficulty') {
  var subjectTeam={};
  for(let i=0; i<timeAndLangFiltered.length;i++) {
    var sub=timeAndLangFiltered[i]['difficulty'];
      if(subjectTeam[sub]===undefined) {
        subjectTeam[sub]=[];
        subjectTeam[sub].push(timeAndLangFiltered[i]);
      }else{
        subjectTeam[sub].push(timeAndLangFiltered[i]);
      }
  }
  //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
  var updateFormate={};
  for (var key in subjectTeam) {
    var timeAndValue=subjectTeam[key];
    var temp={};
    for (let i=0; i<timeAndValue.length; i++) {
      var time=timeAndValue[i]['timeStamp'].slice(0,10);
      if (temp[time]!==undefined) {
        temp[time]=(temp[time]+Number(timeAndValue[i]['totalTime'])/1000/60)/2;
      }else {
        temp[time]=Number(timeAndValue[i]['totalTime'])/1000/60;
      }

    }
    updateFormate[key]=temp;
  }

  var finalResult=[];
  for (let key in updateFormate) {
  var temp={};
  temp['name']=key;
  temp['type']='line';
  //temp['stack']='Total';
  temp['data']=[];
  for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
  }
  finalResult.push(temp);
  }
  var containerD=[];
 for (let i=0; i<finalResult.length; i++) {
  containerD.push(finalResult[i]['name']);
 }
 setLegend(containerD);
  setInput(finalResult);
}

},  [graph,selection, subject,time, language,range])


  const option = {
    title: {
      text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null,
      padding:[20,5,5,5],
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: legend
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
            return moment(value).format('MM/DD');
        })
      }
    },
    yAxis: {
      type: 'value'
    },
     series: input
    //[ //need to update according to data
    //   { // sample data firstly filter with range ; then filter with hardlevel;
    //     name: 'Hard',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-27", 33], ["2022-06-27T10:35:45",132], ["2022-06-28T17:35:45",101]]
    //   },
    //   {
    //     name: 'Medium',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-25T10:35:45", 3], ["2022-06-27T12:35:45",132], ["2022-06-28T17:35:45",101]]
    //   },
    //   {
    //     name: 'Easy',
    //     type: 'line',
    //     stack: 'Total',
    //     data: [["2022-06-25T10:35:45", 3], ["2022-06-27T19:35:45",132], ["2022-06-28T20:35:45",101]]
    //   }
    // ]
  }
  return (
    <Stack>
      <Box sx={{ '&:hover':{boxShadow:3},  width:'500px', ml:4, mr:4, mt:1,mb:2, backgroundColor:'black'}}>
        <ReactEcharts option={option} />
      </Box>
      <MenuBar
        graph={graph}
        setGraph={setGraph}
        subject= {subject}
        selection={selection}
        setSelection={setSelection}
        time={time}
        range={range}
        language={language}
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
  </Stack>
  )
};