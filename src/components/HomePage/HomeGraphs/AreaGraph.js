
import React from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import MenuBar from './MenuBar.js';
import moment from 'moment';

export default function Area() {

  const [graph, setGraph] = React.useState('totalTime');
  const [selection, setSelection]=React.useState('');
  const [subject, setSubject] = React.useState([]);

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


  React.useEffect ( ()=>{
    // console.log('state', language,range,time);
    //console.log('testtt', state.speed)
  },  [graph,selection, subject,time, language,range])


  const option = {
      title: {
        text: graph==='totalTime'?'speed (mins)':graph==='totalQuantities'?'total':null,
        padding:[20,10,10,10]
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
      legend: {
        data: selection==='difficulty'?['Easy', 'Medium', 'Hard']:subject
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
          axisLabel: range==='year'?{
            formatter: (function(value){
                return moment(value).format('MM');
            })
          }:{
            formatter: (function(value){
                return moment(value).format('MM/DD');
            })
          }
        }
      ,
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Hard',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [["2022-06-25T14:35:45", 3], ["2022-06-27T14:35:45",132], ["2022-06-28T14:35:45",101]]
        },
        {
          name: 'Medium',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [["2022-06-25T14:34:45", 3], ["2022-06-27T14:30:45",132], ["2022-06-28T14:32:45",101]]
        },
        {
          name: 'Easy',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [["2022-06-25T12:35:45", 3], ["2022-06-27T10:35:45",132], ["2022-06-28T17:35:45",101]]
        }

      ]
    }

return (
  <Stack>
     <Box sx={{ '&:hover':{boxShadow:3},   width:'500px', ml:4, mr:4, mt:1,mb:2, backgroundColor:'black'}}>
      <ReactEcharts option={option} />
    </Box>
    <MenuBar graph={graph} setGraph={setGraph} subject= {subject} handleSubject={handleSubject} selection={selection} setSelection={setSelection} time={time} range={range} language={language} handleRange={handleRange} handleLanguage={handleLanguage} handleTime={handleTime} handleGraph={handleGraph} handleSelection={handleSelection}/>

  </Stack>
)
}
