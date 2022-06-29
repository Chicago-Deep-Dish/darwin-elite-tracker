/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import ReactECharts from 'echarts-for-react';



export default function TotalProblems({problemData}) {
    
    const option = {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Problem',
            type: 'pie',
            radius: ['20%', '30%'],
            data: problemData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
    };
    console.log(problemData)

    return <>
    <h4> Problems </h4>
    <div style={{height: "175px"}}>
    <ReactECharts option={option} style={{ height: "100%"}}/>
    </div>
    </>
    // 
}

