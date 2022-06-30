/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { summary } from 'date-streaks';

import TotalProblems from './TotalProblems'
import Streak from './Streak'
import Graph1 from './Graph1'
import Graph2 from './Graph2'
import HeatMap from './HeatMap'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const dates = [
    new Date('01/01/2018'),
    new Date('01/02/2018'),
    new Date('01/03/2018'),
    new Date('01/04/2018'),
    new Date('01/06/2018'),
    new Date('06/29/2022'),
  ];

  console.log('summary', summary({ dates }))

export default function DashBoard() {
    const [problemData, setProblemData] = React.useState([]);
    const [streakData, setStreakData] = React.useState([]);


    React.useEffect (()=>{
        //futute API request for problemData
        setProblemData([
            { value: 100, name: 'Easy' },
            { value: 35, name: 'Medium' },
            { value: 5, name: 'Hard' },
        ])
        //futute API request for dates
        const streakSummary = summary({ dates });
        console.log(streakSummary.currentStreak, streakSummary.longestStreak)
        setStreakData(
            { max: streakSummary.longestStreak, current: streakSummary.currentStreak }
        )
    }, [])

    return <>
        <Grid sx={{flexWrap:'wrap', justifyContent:'center'}} spacing={2}>
        <Stack direction='row' sx={{flexWrap:'wrap', justifyContent:'center'}} spacing={2}>
            <Stack spacing={2} >
                <h3> Dashboard </h3>
                <Item >
                    <TotalProblems problemData={problemData}></TotalProblems>
                </Item>
                <Item>
                    <Streak streakData={streakData}></Streak>
                </Item>
            </Stack>
            <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                <Item>
                    <Graph2></Graph2>
                </Item>
                <Item>
                    <Graph1></Graph1>
                </Item>
                </Stack>
                <Item>
                    <HeatMap></HeatMap>
                </Item>
            </Stack>
        </Stack>
        </Grid>





    </>
}


