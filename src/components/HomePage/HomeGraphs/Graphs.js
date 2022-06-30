import BarGraph from './BarGraph.js';
import React from 'react';
import {Stack} from '@mui/material';
import LineGraph from './LineGraph.js'
import Pie from './PieGraph.js';
import AreaGraph from './AreaGraph.js';
import Donut from './DonutGraph.js';

export default function Graphs() {

  return (
    <Stack direction='row' sx={{flexWrap:'wrap', justifyContent:'center'}}>
      <BarGraph />
      {/* <LineGraph />
      <Pie />
      <AreaGraph />
      <Donut /> */}
    </Stack>
  )


}