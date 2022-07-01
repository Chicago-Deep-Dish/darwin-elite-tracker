import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import Settings from './SettingsPopOver';
import MenuBar from './MenuBar.js';
import moment from 'moment';
import useGlobalContext from '../../../context/GlobalContext.js'

export default function Area() {

  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState('totalQuantities');
  const [selection, setSelection]=React.useState('difficulty');
  const [subject, setSubject] = React.useState([]);
  const [input, setInput]=React.useState([])
  const [time, setTime]=React.useState('whole process');
  const [range, setRange]=React.useState('year');
  const [language, setLanguage]=React.useState('Javascript');
  const [legend, setLegend]=React.useState([]);
  const [settingsView, setSettingsView]=React.useState(false);
  const [settingsVisible, setSettingsVisible]=React.useState(false);
  

  
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

  const getLastDate = (x)=> {
    const now = new Date();
    const result=new Date(now.getFullYear(), now.getMonth(), now.getDate() - x);
    return result.toISOString();
    }

  var lastDate=getLastDate(0);
  var startDate=getLastDate(6);

  React.useEffect ( ()=>{
    var samples=[];

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
  //filter the language
  var sampleUpdate=[];
  for ( let i=0; i<samples.length; i++) {
    if ( samples[i]['programmingLanguage']!==undefined) {
      if(samples[i]['programmingLanguage'].toLowerCase()===language.toLowerCase()) {
      sampleUpdate.push(samples[i]);
    }
  }
  }
  console.log('updated', sampleUpdate);

//filter graph type(totalQuantities/ aveerge speed) and setting(difficulty/subject)
  if (graph==='totalQuantities'&&selection==='subject') {
    //setInput([]);

    var subjectTeam={};
    for(let i=0; i<sampleUpdate.length;i++) {
      var sub=sampleUpdate[i]['topics'];
      if(subject.includes(sub)) {
        if(subjectTeam[sub]===undefined) {
          subjectTeam[sub]=[];
          subjectTeam[sub].push(sampleUpdate[i]);
        }else{
          subjectTeam[sub].push(sampleUpdate[i]);
        }
     }else {
      continue;
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
   temp['areaStyle']={};
   temp['stack']='Total';
   temp['emphasis']={'focus':'series'};
   temp['data']=[];
   for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
   }
   finalResult.push(temp);

 }
 var container=[];
 for (let i=0; i<finalResult.length; i++) {
  container.push(finalResult[i]['name']);
 }
 setLegend(container);
 setInput(finalResult);
}


if(graph==='totalQuantities'&&selection==='difficulty') {
  //setInput([]);

  var subjectTeam={};
  for(let i=0; i<sampleUpdate.length;i++) {
    var sub=sampleUpdate[i]['difficulty'];
    if(subjectTeam[sub]===undefined) {
      subjectTeam[sub]=[];
      subjectTeam[sub].push(sampleUpdate[i]);
    }else{
      subjectTeam[sub].push(sampleUpdate[i]);
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
var finalResultA=[];
for (let key in updateFormate) {
 var temp={};
 temp['name']=key;
 temp['type']='line';
 temp['areaStyle']={};
 temp['stack']='Total';
 temp['emphasis']={'focus':'series'};
 temp['data']=[];
 for (let value in updateFormate[key]) {
    var data=[];
    data.push(value);
    data.push(updateFormate[key][value]);
    temp['data'].push(data);
 }
 finalResultA.push(temp);
}
for (let i=0; i<finalResultA.length; i++) {

}
var containerA=[];
 for (let i=0; i<finalResultA.length; i++) {
  containerA.push(finalResultA[i]['name']);
  console.log('container', containerA);
 }
 setLegend(containerA);
 setInput(finalResultA);
}


if ( graph==='totalTime'&&selection==='subject') {
  //setInput([]);

  var subjectTeam={};
  for(let i=0; i<sampleUpdate.length;i++) {
    var sub=sampleUpdate[i]['topics'];
    if( subject.includes(sub)) {
      if(subjectTeam[sub]===undefined) {
        subjectTeam[sub]=[];
        subjectTeam[sub].push(sampleUpdate[i]);
      }else{
        subjectTeam[sub].push(sampleUpdate[i]);
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

  var finalResultB=[];
  for (let key in updateFormate) {
  var temp={};
  temp['name']=key;
  temp['type']='line';
  temp['areaStyle']={};
  temp['stack']='Total';
  temp['emphasis']={'focus':'series'};
  temp['data']=[];
  for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
  }
  finalResultB.push(temp);
  }
  var containerB=[];
 for (let i=0; i<finalResultB.length; i++) {
  containerB.push(finalResultB[i]['name']);
  console.log('legend', containerB);
 }
  setLegend(containerB);
  setInput(finalResultB);
}


if ( graph==='totalTime'&&selection==='difficulty') {
  //setInput([]);

  var subjectTeam={};
  for(let i=0; i<sampleUpdate.length;i++) {
    var sub=sampleUpdate[i]['difficulty'];
      if(subjectTeam[sub]===undefined) {
        subjectTeam[sub]=[];
        subjectTeam[sub].push(sampleUpdate[i]);
      }else{
        subjectTeam[sub].push(sampleUpdate[i]);
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

  var finalResultC=[];
  for (let key in updateFormate) {
  var temp={};
  temp['name']=key;
  temp['type']='line';
  temp['areaStyle']={};
  temp['stack']='Total';
  temp['emphasis']={'focus':'series'};
  temp['data']=[];
  for (let value in updateFormate[key]) {
      var data=[];
      data.push(value);
      data.push(updateFormate[key][value]);
      temp['data'].push(data);
  }
  finalResultC.push(temp);
  }
  console.log('areaaaa',finalResultC);
  var containerC=[];
 for (let i=0; i<finalResultC.length; i++) {
  containerC.push(finalResultC[i]['name']);
  console.log('container', containerC);
 }
  console.log('total, subject', finalResultC);
  setLegend(containerC);
  setInput(finalResultC);
}

  },  [graph, selection, subject, time, language, range])


  const option = {
      title: {
        text: graph==='totalTime'?'Speed (mins)':graph==='totalQuantities'?'Total':null,
        padding:[20,10,10,10],
        textStyle:{
          color:'white'
        }
      },
      textStyle: {
        color:function(value, index) {
          return 'white';
        },
        fontWeight:'bold'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        top:'18%',
        bottom: '3%',
        containLabel: true
      },
      xAxis:
        {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            formatter: (function(value){
                return moment(value).format('MM/DD');
            })
          }
        }
      ,
      yAxis: [
        {
          show: false
        }
      ],
       series: input
    }
return (
  <Stack sx={{ alignItems: "start" }} direction="row" onMouseLeave={()=>{setSettingsVisible(false)}} onMouseEnter={()=>{setSettingsVisible(true)}}>
    {!settingsView?
      <Box sx={{ '&:hover':{boxShadow:3},   width:'270px', ml:4, mr:4, mt:1,mb:2}}   onMouseEnter={()=>{setSettingsVisible(true)}}>
        <ReactEcharts sx={{ '&:hover':{boxShadow:3},   width:'270px', height:'200px', ml:4, mr:4, mt:1,mb:2}} option={option} />
      </Box>
      :
      <MenuBar graph={graph} setGraph={setGraph} subject= {subject} handleSubject={handleSubject} selection={selection} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>
    }
    {settingsVisible?
      <Settings setSettingsView={setSettingsView} settingsView={settingsView} ></Settings>:
      null
    }
  </Stack>
)
}



