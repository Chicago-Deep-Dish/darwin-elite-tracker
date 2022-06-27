import * as React from 'react';
import {Box, Stack} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(
  {select: {
    "&:before": {
      borderColor: "red"
    },
    "&:after": {
      borderColor: 'yellow'
    }

  }});


export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    speed: true,
    frequency: false,
    total: false,
    difficulty: false,
    name: false,
    subject:false
  });

  const [time, setTime]=React.useState('write code');
  const [range, setRange]=React.useState('week');
  const [language, setLanguage]=React.useState('Javascript');

  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleRange= (event: SelectChangeEvent) => {
    setRange(event.target.value);
  };
  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


  React.useEffect ( ()=>{
    console.log('state', language,range,time);
  }, [state, time, range, language])

  const { speed, frequency, total, difficulty, name, subject} = state;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', border:'2px solid black', '&:hover':{boxShadow:3},      width:'500px', m:4}}>
      <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox sx= {{color:"black"}} checked={frequency} onChange={handleChange} name="frequency" border="3px solid black"/>
            }
            label="frequency"
          />
          <FormControlLabel
            control={
              <Checkbox sx= {{color:"black"}} checked={speed} onChange={handleChange} name="speed" />
            }
            label="speed"
          />
          <FormControlLabel
            control={
              <Checkbox sx= {{color:"black"}} checked={total} onChange={handleChange} name="total" />
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
              <Checkbox  sx= {{color:"black"}} checked={difficulty} onChange={handleChange} name="difficulty" />
            }
            label="difficulity"
          />
          <FormControlLabel
            control={
              <Checkbox  sx= {{color:"black"}} checked={name} onChange={handleChange} name="name" />
            }
            label="name"
          />
          <FormControlLabel
            control={
              <Checkbox sx= {{color:"black"}} checked={subject} onChange={handleChange} name="subject" />
            }
            label="subject"
          />
        </FormGroup>
      </FormControl>
      <Stack>
        <FormControl
       fullWidth

        >
          <InputLabel id="demo-simple-select-label">time</InputLabel>
          <Select
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            value={time}
            label="time"
            onChange={handleTime}
            style={{zIndex:1250}}
          >
            <MenuItem value={'read prompt'} >read prompt</MenuItem>
            <MenuItem value={'whiteboard'} >whiteboard</MenuItem>
            <MenuItem value={'pseudocode'} >pseudocode</MenuItem>
            <MenuItem value={'write code'} >write code</MenuItem>
            <MenuItem value={'whole process'} >whole process</MenuItem>
          </Select>
        </FormControl>
        <FormControl
        required
        size="small"
        sx={{ m:1,mt:3, width:'120px', color:'black'}}
        fullWidth>
          <InputLabel id="simple-select-label">range</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={range}
            label="range"
            onChange={handleRange}
          >
            <MenuItem value={'week'} >week</MenuItem>
            <MenuItem value={'month'} >month</MenuItem>
            <MenuItem value={'year'} >year</MenuItem>
          </Select>
        </FormControl>
        <FormControl
        required
        size="small"
        sx={{ m:1, mt:3, width:'120px'}}
        >
          <InputLabel id="demo">language</InputLabel>
          <Select
            labelId="demo"
            id="demo"
            value={language}
            label="language"
            onChange={handleLanguage}
          >
            <MenuItem value={'Javascript'} >Javascript</MenuItem>
            <MenuItem value={'Python'} >Python</MenuItem>
            <MenuItem value={'Java'} >Java</MenuItem>
            <MenuItem value={'C++'} >C++</MenuItem>
          </Select>
        </FormControl>
        </Stack>
    </Box>
  );
}
