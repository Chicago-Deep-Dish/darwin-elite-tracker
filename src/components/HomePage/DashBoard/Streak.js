import React from "react";
import Box from "@mui/material/Box";
import ReactECharts from "echarts-for-react";

export default function Streak({ streakData }) {
  const gaugeData = [
    {
      value: streakData.current,
      name: "Current\nStreak",
      title: {
        offsetCenter: ["-45%", "110%"],
      },
      detail: {
        offsetCenter: ["-45%", "170%"],
      },
    },
    {
      value: streakData.max,
      name: "Max\nStreak",
      title: {
        offsetCenter: ["45%", "110%"],
      },
      detail: {
        offsetCenter: ["45%", "170%"],
      },
    },
  ];
  const option = {
    series: [
      {
        type: "gauge",
        min: 0,
        max: streakData.max,
        center: ["50%", "35%"],

        progress: {
          show: true,
          overlap: false,
          roundCap: true,
        },
        axisLine: {
          roundCap: true,
        },
        axisTick: {
          length: 1,
          lineStyle: {
            width: 0.25,
          },
        },
        minorTick: {
          max: 1,
        },
        xAxis: {
          maxInterval: 2,
        },
        splitLine: {
          length: 5,
          lineStyle: {
            color: "auto",
            width: 0.5,
          },
        },
        axisLabel: {
          color: "#fff",
          fontSize: 10,
          distance: 9,
        },
        data: gaugeData,
        title: {
          color: "#fff",
          fontSize: 15,
        },
        detail: {
          width: 40,
          height: 35,
          fontSize: 20,
          padding: 2,
          color: "#fff",
          backgroundColor: "inherit",
          borderRadius: 5,
          formatter: "{value}",
        },
      },
    ],
  };
  return (
    <>
      <Box sx={{ height: "242px", width: "180px" }}>
        <ReactECharts option={option} style={{ height: "100%" }} />
      </Box>
    </>
  );
}
