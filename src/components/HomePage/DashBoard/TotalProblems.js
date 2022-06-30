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
          orient: 'horizontal',
          left: 'left',
          textStyle: {
              color: '#fff'
          }
        
        },
        series: [
          {
            name: 'Problem',
            type: 'pie',
            radius: ['40%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: problemData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              }
            }
          }
        ]
    };
    // console.log(problemData)

    return <>
    <h4> Problems </h4>
    <div style={{height: "140px"}}>
    <ReactECharts option={option} style={{ height: "100%"}}/>
    </div>
    </>
    // 
}

