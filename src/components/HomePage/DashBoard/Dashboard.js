/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { summary } from "date-streaks";
import useGlobalContext from "./../../../context/GlobalContext";

import TotalProblems from "./TotalProblems";
import Streak from "./Streak";
import Graph1 from "./Graph1";
import Graph2 from "./Graph2";
import HeatMap from "./HeatMap";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  textAlign: "center",
}));

export default function DashBoard() {
  const [problemData, setProblemData] = useState([]);
  const { streakSummary, userProblemArray } = useGlobalContext();
  const [streakData, setStreakData] = useState([]);

  const problemTotal = userProblemArray.length;

  useEffect(() => {
    //futute API request for problemData
    let difficulties = { easy: 0, medium: 0, hard: 0 };
    for (const item of userProblemArray) {
      if (item.difficulty === "easy") {
        difficulties.easy++;
      } else if (item.difficulty === "medium") {
        difficulties.medium++;
      } else {
        difficulties.hard++;
      }
    }
    setProblemData([
      { value: difficulties.easy, name: "Easy" },
      { value: difficulties.medium, name: "Medium" },
      { value: difficulties.hard, name: "Hard" },
    ]);
    setStreakData({
      max: streakSummary.longestStreak || 0,
      current: streakSummary.currentStreak || 0,
    });
  }, [streakSummary, userProblemArray]);

  return (
    <>
      <Stack
        backgroundColor="#1A2027"
        direction="row"
        sx={{ justifyContent: "center" }}
        spacing={2}
        padding="30px"
        marginLeft="30px"
        marginTop="10px"
        borderRadius='10px'
      >
        <Stack spacing={2}>
          <h3> Dashboard </h3>
          <Item>
            <Streak streakData={streakData}></Streak>
          </Item>
        </Stack>
        <Stack spacing={2}>
          <Item>
            <TotalProblems problemData={problemData}></TotalProblems>
          </Item>
          <Item style={{ padding: "10px" }}>
            <h4> Total Problems </h4>
            <h2> {problemTotal} </h2>
          </Item>
        </Stack>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Item>
              <Graph1></Graph1>
            </Item>
            <Item>
              <Graph2></Graph2>
            </Item>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
