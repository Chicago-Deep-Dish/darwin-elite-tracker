import BarGraph from './BarGraph.js';
import React from 'react';
import {Stack, Box, Button} from '@mui/material';
import LineGraph from './LineGraph.js'
import Pie from './PieGraph.js';
import AreaGraph from './AreaGraph.js';
import Donut from './DonutGraph.js';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const StyledInput = styled(TextField)`
width: 100%;
& .MuiOutlinedInput-notchedOutline {
  border-color: #eab464;

}
& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: white;
  color:red
}`;

export default function Graphs() {

  const [first, setFirst]=React.useState('bar');
  const [second, setSecond]=React.useState('line');

  const handleFirst= (event) => {
     setFirst(event.target.value)
  };
  const handleSecond= (event) => {
    setSecond(event.target.value)
 };

  return (
    <Stack direction='row' sx={{flexWrap:'wrap', justifyContent:'center'}}>
    <Box >
      <FormControl
        required
        size="small"
        sx={{ m:1, mt:3, width:'140px'}}
      >
          <StyledInput
            color="success"
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            value={first}
            label="graph"
            variant="outlined"
            onChange={handleFirst}
            style={{ height: 30 }}
            size="small"
            select
          >
            <MenuItem value={'bar'} >Bar</MenuItem>
            <MenuItem value={'pie'} >Pie</MenuItem>
            <MenuItem value={'donut'} >Donut</MenuItem>
          </StyledInput>
      </FormControl>
      {first==='bar'? <BarGraph />:first==='pie'?<Pie/>:first==='donut'?<Donut/>:null}
    </Box>

    <Box >
      <FormControl
        required
        size="small"
        sx={{ m:1, mt:3, width:'140px'}}
      >
          <StyledInput
            color="success"
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            value={second}
            label="graph"
            variant="outlined"
            onChange={handleSecond}
            style={{ height: 30 }}
            size="small"
            select
          >
            <MenuItem value={'line'} >Line</MenuItem>
            <MenuItem value={'area'} >area</MenuItem>
          </StyledInput>
      </FormControl>
      {second==='line'? <LineGraph />:second==='area'?<AreaGraph/>:null}
    </Box>
      </Stack>
  )


}