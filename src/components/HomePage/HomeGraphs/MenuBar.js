import * as React from 'react';
import {Box, Stack} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import styled from "styled-components";
import RadioGroup from '@mui/material/RadioGroup';
import OutlinedInput from '@mui/material/OutlinedInput';


const StyledInput = styled(TextField)`
width: 100%;
& .MuiOutlinedInput-notchedOutline {
  border-color: #eab464;

}
& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: black;
  color:red
}`;

const leetTopics = ['Arrays', 'Maps', 'Linked Lists', 'Queues', 'Heaps', 'Stacks', 'Trees', 'Graphs', 'Breadth-First-Search', 'Depth-First-Search', 'Binary Search', 'Recursion', 'Backtracking', 'Dynamic Programming', 'Trie', 'Matrix', 'Sorting'];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CheckboxesGroup({graph, setGraph, subject,handleSubject, setSelection, time, range, language, handleRange, handleLanguage,handleTime, handleGraph, handleSelection}) {

  return (

      <Box sx={{ display: 'flex', justifyContent: 'center',border:'2px solid #eab464', '&:hover':{boxShadow:3 },width:'500px', m:4}}>
        <FormControl sx={{mt:3, width:'140px'}} component="fieldset" variant="standard">
          <RadioGroup
            aria-label ledby="demo-radio-buttons-group-label"
            defaultValue="speed"
            name="radio-buttons-group"
          >
            <FormControlLabel value="totalTime"  control={<Radio color='success'/>} label="speed" onChange={handleGraph} />
            <FormControlLabel value="totalQuantities"  control={<Radio color='success'/>} label="total" onChange={handleGraph} />
          </RadioGroup>
        </FormControl>

        <Stack sx={{display: 'flex', justifyContent: 'center', mb:3}}>
        <FormControl
          required
          size="small"
          sx={{mt:2, width:'140px'}}
          >
            <RadioGroup
              aria-label ledby="radio-buttons-group-label"
              defaultValue="difficulity"
              name="radio-buttons"
            >
              <FormControlLabel value="difficulty"   control={<Radio color='success'/>} label="difficulty" onChange={handleSelection} />

            <FormControlLabel value="subject"   control={<Radio color='success'/>} label="subject" onChange={handleSelection} />
            <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select-label"
            value={subject}
            multiple
            onChange={handleSubject}
            label='Subject'
            //size="small"
            input={<OutlinedInput label='Subject' />}
            MenuProps={MenuProps}
            >
              {leetTopics.map((topic) => {
                return (<MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>)
              })}
            </Select>
          </RadioGroup>
        </FormControl>
        </Stack>





        <Stack sx={{display: 'flex', justifyContent: 'center', mb:2}}>
          <FormControl
          required
          size="small"
          sx={{ m:1, mt:3, width:'140px'}}
          >
            <StyledInput
              color="success"
              labelid="demo-simple-select-label"
              id="demo-simple-select-label"
              value={time}
              label="time"
              variant="outlined"
              onChange={handleTime}
              style={{ height: 30 }}
              size="small"
              select
            >
              <MenuItem value={'read prompt'} disabled>read prompt</MenuItem>
              <MenuItem value={'whiteboard'} disabled>whiteboard</MenuItem>
              <MenuItem value={'pseudocode'} disabled>pseudocode</MenuItem>
              <MenuItem value={'write code'} disabled>write code</MenuItem>
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
              labelid="simple-select-label"
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
            <MenuItem value='JavaScript'>JavaScript</MenuItem>
            <MenuItem value='Python'>Python</MenuItem>
            <MenuItem value='Java'>Java</MenuItem>
            <MenuItem value='C++'>C++</MenuItem>
            <MenuItem value='Kotlin'>Kotlin</MenuItem>
            <MenuItem value='C'>C</MenuItem>
            <MenuItem value='Swift'>Swift</MenuItem>
            <MenuItem value='C#'>C#</MenuItem>
            <MenuItem value='PHP'>PHP</MenuItem>
          </StyledInput>
        </FormControl>
          </Stack>
      </Box>

  );
}
