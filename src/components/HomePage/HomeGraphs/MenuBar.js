import * as React from 'react';
import {Box, Stack} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import styled from "styled-components";


  const StyledInput = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-notchedOutline {
    border-color: #eab464;

  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
    color:red
  }`;

export default function CheckboxesGroup({state, time, range, language, handleRange, handleLanguage,handleTime, handleChange}) {

  return (

      <Box sx={{ display: 'flex', justifyContent: 'center', border:'2px solid #eab464', '&:hover':{boxShadow:3, },width:'500px', m:4}}>
        <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox  sx={{color: '#eab464'}} color='success' checked={state.frequency} onChange={handleChange} name="frequency" />
              }
              label="frequency"
            />
            <FormControlLabel
              control={
                <Checkbox  sx={{color: '#eab464'}} color='success' checked={state.speed} onChange={handleChange} name="speed" />
              }
              label="speed"
            />
            <FormControlLabel
              control={
                <Checkbox sx={{color: '#eab464'}} color='success' checked={state.total} onChange={handleChange} name="total" />
              }
              label="total"
            />
          </FormGroup>
        </FormControl >
        <FormControl
          required
          component="fieldset"
          sx={{ m: 2 }}
          variant="standard"
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox sx={{color: '#eab464'}} color='success'  checked={state.difficulty} onChange={handleChange} name="difficulty" />
              }
              label="difficulity"
            />
            <FormControlLabel
              control={
                <Checkbox sx={{color: '#eab464'}}  color='success' checked={state.name} onChange={handleChange} name="name" />
              }
              label="name"
            />
            <FormControlLabel
              control={
                <Checkbox sx={{color: '#eab464'}} color='success' checked={state.subject} onChange={handleChange} name="subject" />
              }
              label="subject"
            />
          </FormGroup>
        </FormControl>
        <Stack sx={{display: 'flex', justifyContent: 'center', mb:2}}>
          <FormControl
          required
          size="small"
          sx={{ m:1, mt:3, width:'140px'}}
          >
            <StyledInput
              color="success"
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              value={time}
              label="time"
              variant="outlined"
              onChange={handleTime}
              style={{ height: 30 }}
              size="small"
              select
            >
              <MenuItem value={'read prompt'} >read prompt</MenuItem>
              <MenuItem value={'whiteboard'} >whiteboard</MenuItem>
              <MenuItem value={'pseudocode'} >pseudocode</MenuItem>
              <MenuItem value={'write code'} >write code</MenuItem>
              <MenuItem value={'whole process'} >whole process</MenuItem>
            </StyledInput>
          </FormControl>
          <FormControl
          required
          size="small"
          sx={{ m:1,mt:1, width:'140px', color:'black'}}
          fullWidth>
            <StyledInput
              color="success"
              labelId="simple-select-label"
              id="simple-select"
              variant="outlined"
              value={range}
              label="range"
              onChange={handleRange}
              style={{ height: 30 }}
              size="small"
              select
            >
              <MenuItem value={'week'} >week</MenuItem>
              <MenuItem value={'month'} >month</MenuItem>
              <MenuItem value={'year'} >year</MenuItem>
            </StyledInput>
          </FormControl>

          <FormControl
          required
          size="small"
          sx={{ m:1, mt:1,mb:1, width:'140px', color:'red'}}
          style={{ height: 30 }}
          >
          <StyledInput
          color="success"
          value={language}
          onChange={handleLanguage}
          variant="outlined"
          label="language"
          size="small"
          select
        >
            <MenuItem value={'Javascript'} >Javascript</MenuItem>
            <MenuItem value={'Python'} >Python</MenuItem>
            <MenuItem value={'Java'} >Java</MenuItem>
            <MenuItem value={'C++'} >C++</MenuItem>
          </StyledInput>
          </FormControl>
          </Stack>
      </Box>

  );
}
