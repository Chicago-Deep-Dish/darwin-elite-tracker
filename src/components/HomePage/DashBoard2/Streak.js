/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import ReactECharts from 'echarts-for-react';

export default function Streak({streakData}) {
    const gaugeData = [
        {
          value: streakData.current,
          name: 'Current\nStreak',
          title: {
            offsetCenter: ['-45%', '110%']
          },
          detail: {
            offsetCenter: ['-45%', '160%']
          }
        },
        {
          value: streakData.max,
          name: 'Max\nStreak',
          title: {
            offsetCenter: ['45%', '110%']
          },
          detail: {
            offsetCenter: ['45%', '160%']
          }
        }
      ];
    const option = {
        series: [
          {
            type: 'gauge',
            min: 0,
            max:streakData.max,
            center: ['50%', '40%'],
            anchor: {
              show: true,
              showAbove: true,
              size: 20,
              itemStyle: {
                color: '#FAC858'
              }
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true
            },
            axisLine: {
              roundCap: true
            },
            data: gaugeData,
            title: {
              fontSize: 15
            },
            detail: {
              width: 30,
              height: 30,
              fontSize: 20,
              padding: 10,
              color: '#fff',
              backgroundColor: 'auto',
              borderRadius: 5,
              formatter: '{value}'
            }
          }
        ]
      };
      console.log(streakData.max)
    return <>
        <Box sx={{height: "220px", width: "200px"}}>
        <ReactECharts option={option} style={{height: "100%" }}/>
        </Box>
    </>
}