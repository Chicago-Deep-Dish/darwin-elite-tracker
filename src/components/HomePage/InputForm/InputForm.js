import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Stopwatch from './Stopwatch/Stopwatch';
import axios from 'axios';


export default function InputForm() {

  const [times, setTimes] = useState(0);

  const [values, setValues] = useState({
    promptName: '',
    difficulty: '',
    promptLink: '',
    promptText: '',
    constraints: '',
    timeComplexity: '',
    solution: '',
    programmingLanguage: 'JavaScript',
    readTime: '',
    whiteBoardTime: '',
    pseudocodeTime: '',
    codeTime: '',
  });

  const [leets, setLeets] = useState([])

  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value})
  }

  const handleCheckChange = (e) => {
    const {
      target: { value },
    } = e;
    setLeets(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    axios.post('/', {
      ...values,
      time: times,
      timeStamp: new Date().toISOString(),
      timeStampInfo: {
        'month': new Date().getMonth() + 1,
        'day': new Date().getDate(),
        'year': new Date().getFullYear()
      }
    })
      .then(() => {
        setValues({
        promptName: '',
        difficulty: '',
        promptLink: '',
        promptText: '',
        constraints: '',
        timeComplexity: '',
        solution: '',
        programmingLanguage: '',
        readTime: '',
        whiteBoardTime: '',
        pseudocodeTime: '',
        codeTime: '',
      })
        setTimes(0)
      })
      .catch((err) => console.log('error submitting', err));
  };

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

  let leetTopics = ['Arrays', 'Maps', 'Linked Lists', 'Queues', 'Heaps', 'Stacks', 'Trees', 'Graphs', 'Breadth-First-Search', 'Depth-First-Search', 'Binary Search', 'Recursion', 'Backtracking', 'Dynamic Programming', 'Trie', 'Matrix', 'Sorting'];

  return (
    <div className='beginning-inputs'>
       <Stack
        sx={{width: 200, marginLeft: '20px'}}
        spacing={2}
        component={'form'}
        onSubmit={(e) => handleSubmit(e, values)}
        >
            <Typography
              variant='subtitle1'
            >
              Begin your journey here!
            </Typography>
            <TextField
            size='small'
            variant='outlined'
            required
            type='text'
            id="outlined-basic"
            label="Prompt Name"
            name='promptName'
            value={values.promptName}
            onChange={(e) => handleChange(e)}
            />
            <FormControl variant='outlined' size='small' >
              <InputLabel id='difficulty-label'>Difficulty</InputLabel>
              <Select
                labelid='difficulty-label'
                name="difficulty"
                value={values.difficulty}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value='easy'>Easy</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='hard'>Hard</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='outlined' size='small'>
              <InputLabel id='language-label'>Programming Language</InputLabel>
              <Select
              labelid='language-label'
                name="programmingLanguage"
                value={values.programmingLanguage}
                onChange={(e) => handleChange(e)}
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
              </Select>
            </FormControl>
            <FormControl size='small'>
              <InputLabel id='leet-checkbox-label'>Topic</InputLabel>
              <Select
              labelid='leet-checkbox-label'
              id='leet-checkbox'
              multiple
              value={leets}
              onChange={(e) => handleCheckChange(e)}
              input={<OutlinedInput label='Tag' />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
              >
                {leetTopics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    <Checkbox checked={leets.indexOf(topic) > -1} />
                    <ListItemText primary={topic} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stopwatch
              times={times}
              setTimes={setTimes}
            />
          {expand && (
            <div>
              <Typography
                variant='subtitle1'
              >
                Additional Fields
              </Typography>
              <TextField
                size='small'
                type='text'
                id="outlined-basic"
                label="Prompt Link"
                name='promptLink'
                value={values.promptLink}
                onChange={(e) => handleChange(e)}
              />
              <TextField
              size='small'
              label="Prompt Text"
              multiline
              rows={4}
              type='text'
              name='promptText'
              value={values.promptText}
              onChange={(e) => handleChange(e)}
              />
              <TextField
              size='small'
              label="Constraints"
              multiline
              rows={4}
              type='text'
              name='constraints'
              value={values.constraints}
              onChange={(e) => handleChange(e)}
              />
              <FormControl variant='outlined' size='small'>
              <InputLabel id='timecomplexity-label'>Time Complexity</InputLabel>
              <Select
              labelid='timecomplexity-label'
                name="timeComplexity"
                value={values.timeComplexity}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value='O(1)'>O(1)</MenuItem>
                <MenuItem value='O(log n)'>O(log n)</MenuItem>
                <MenuItem value='O(n)'>O(n)</MenuItem>
                <MenuItem value='O(n log n)'>O(n log n)</MenuItem>
                <MenuItem value='O(n^2)'>O(n^2)</MenuItem>
              </Select>
              </FormControl>
              <TextField
              size='small'
                label="Solution"
                multiline
                rows={4}
                type='text'
                name='solution'
                value={values.solution}
                onChange={(e) => handleChange(e)}
                />

          </div>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
           <Button
              variant='contained'
              type='button'
              size='large'
              onClick={(e) => toggleExpand(e)}
            >
              { expand ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
            </Button>
            <Button
              variant='contained'
              type='submit'
              size='large'
              onClick={(e) => handleSubmit(e, values)}
            >
              Submit
            </Button>
          </Box>

      </Stack>
    </div>
  );
}

