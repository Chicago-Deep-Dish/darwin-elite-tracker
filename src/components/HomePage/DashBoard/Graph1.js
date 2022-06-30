import React, { useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import {Box, Stack} from '@mui/material';
import data from  '../HomeGraphs/sampleData.js';

export default function Graph1() {
    const [graph, setGraph] = React.useState('speed');
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
      console.log('state', language,range,time);
      //console.log('testtt', state.speed)
    }, [graph, selection, time, range, language])
  
    const option = {
        title: {
          text:graph==='speed'?'speed (mins)':graph==='total'?'total':null,
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
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
  
  return (
    <Stack>
      <Box sx={{ '&:hover':{boxShadow:3}, width:'330px', height: '270px', m:4}}>
        <ReactEcharts option={option} />
      </Box>
    </Stack>
  )
  }