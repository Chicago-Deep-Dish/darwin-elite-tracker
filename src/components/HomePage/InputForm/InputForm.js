import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Stopwatch from './Stopwatch/Stopwatch';
import axios from 'axios';
import { toast } from 'react-toastify';
import firebaseErrorCodes from '../../../helpers/firebaseErrorCodes';
import useGlobalContext from '../../../context/GlobalContext';
import Collapse from '@mui/material/Collapse';
import styled from 'styled-components';


const StyledInput = styled(TextField)`
width: 100%;
& .MuiOutlinedInput-notchedOutline {
  border-color: #eab464;

}
& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
  border-color: white;
  color:red
}`;


export default function InputForm() {
  const { toastifyTheme } =  useGlobalContext();

  const [times, setTimes] = useState(0);

  const [values, setValues] = useState({
    promptName: '',
    difficulty: '',
    promptLink: '',
    promptText: '',
    constraints: '',
    timeComplexity: '',
    solution: '',
    programmingLanguage: 'Javascript',
    readTime: 0,
    whiteBoardTime: 0,
    pseudocodeTime: 0,
    codeTime: 0,
    topic: '',
  });


  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value})
  }


  const handleSubmit = (e, values) => {
    e.preventDefault();
    axios.post('/records', {
      ...values,
      'constraints': values.constraints.split(', '),
      'solution': values.solution.split(', '),
      time: times,
      timeStamp: new Date().toISOString(),
      timeStampinfo: {
        'month': new Date().getMonth() + 1,
        'day': new Date().getDate(),
        'year': new Date().getFullYear()
      }
    }, {
      params: {
        userID: sessionStorage.getItem('UserID')
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
        readTime: 0,
        whiteBoardTime: 0,
        pseudocodeTime: 0,
        codeTime: 0,
        topic: '',
      })
        setTimes(0);
        toast.success('Data submitted successfully', toastifyTheme);
      })
      .catch((err) => {
        firebaseErrorCodes(err.response.data.code, toastifyTheme
      )});
  };


  let leetTopics = ['Arrays', 'Maps', 'Linked Lists', 'Queues', 'Heaps', 'Stacks', 'Trees', 'Graphs', 'Breadth-First-Search', 'Depth-First-Search', 'Binary Search', 'Recursion', 'Backtracking', 'Dynamic Programming', 'Trie', 'Matrix', 'Sorting'];

  return (
    <Stack
     className='beginning-inputs'
     sx={{width: 175, mt: 5, mx: '10px'}}
     >
       <Stack
        sx={{width: 175}}
        spacing={2}
        component={'form'}
        onSubmit={(e) => handleSubmit(e, values)}
        >
            <Typography
              variant='subtitle1'
            >
              Begin your journey here!
            </Typography>
            <StyledInput
              size='small'
              variant='outlined'
              color='success'
              required
              type='text'
              label='Prompt Name'
              id='outlined-basic'
              name="promptName"
              value={values.promptName}
              onChange={(e) => handleChange(e)}
            />
            {/* <TextField
            size='small'
            variant='outlined'
            required
            type='text'
            id="outlined-basic"
            label="Prompt Name"
            name='promptName'
            value={values.promptName}
            onChange={(e) => handleChange(e)}
            /> */}
            <FormControl
              variant='outlined'
              size='small'
              required
              >
              {/* <InputLabel id='difficulty-label'>Difficulty*</InputLabel> */}
              {/* <Select
                labelid='difficulty-label'
                name="difficulty"
                value={values.difficulty}
                onChange={(e) => handleChange(e)}
              > */}
              <StyledInput
                select
                color='success'
                labelId='difficulty-label'
                label='Difficulty*'
                name='difficulty'
                value={values.difficulty}
                variant='outlined'
                onChange={(e) => handleChange(e)}
                size='small'
              >
                <MenuItem value='easy'>Easy</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='hard'>Hard</MenuItem>
              {/* </Select> */}
              </StyledInput>
            </FormControl>
            <FormControl variant='outlined' size='small'>
              {/* <InputLabel id='language-label'>Programming Language</InputLabel> */}
              {/* <Select
              labelid='language-label'
                name="programmingLanguage"
                value={values.programmingLanguage}
                onChange={(e) => handleChange(e)}
              > */}
              <StyledInput
                select
                color='success'
                labelId='language-label'
                label='Programmming Language*'
                name='programmingLanguage'
                value={values.programmingLanguage}
                variant='outlined'
                onChange={(e) => handleChange(e)}
                size='small'
              >
                <MenuItem value='Javascript'>Javascript</MenuItem>
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='Java'>Java</MenuItem>
                <MenuItem value='C++'>C++</MenuItem>
                <MenuItem value='Kotlin'>Kotlin</MenuItem>
                <MenuItem value='C'>C</MenuItem>
                <MenuItem value='Swift'>Swift</MenuItem>
                <MenuItem value='C#'>C#</MenuItem>
                <MenuItem value='PHP'>PHP</MenuItem>
              {/* </Select> */}
              </StyledInput>
            </FormControl>
            <FormControl variant='outlined' size='small'>
              {/* <InputLabel id='demo-simple-select-label'>Topic</InputLabel> */}
              {/* <Select
              labelid='demo-simple-select-label'
              id='demo-simple-select'
              name='topic'
              value={values.topic}
              onChange={(e) => handleChange(e)}
              > */}
              <StyledInput
                select
                color='success'
                labelId='topic-label'
                label='Topic*'
                name='topic'
                value={values.topic}
                variant='outlined'
                onChange={(e) => handleChange(e)}
                size='small'
              >
                {leetTopics.map((topic) => (
                  <MenuItem key={topic} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              {/* </Select> */}
              </StyledInput>
            </FormControl>
            <Stopwatch
              times={times}
              setTimes={setTimes}
            />
          {/* {expand && ( */}
          <Collapse
            in={expand}
            >
            <Stack spacing={1} sx={{maxHeight: '25vh', overflowY: 'auto'}}>
              <Typography
                variant='subtitle1'
              >
                Additional Fields
              </Typography>
              {/* <TextField
                size='small'
                type='text'
                id="outlined-basic"
                label="Prompt Link"
                name='promptLink'
                value={values.promptLink}
                onChange={(e) => handleChange(e)}
              /> */}
              <StyledInput
              size='small'
              variant='outlined'
              color='success'
              type='text'
              label='Prompt Link'
              id='outlined-basic'
              name="promptLink"
              value={values.promptLink}
              onChange={(e) => handleChange(e)}
            />
              {/* <TextField
              size='small'
              label="Prompt Text"
              multiline
              rows={4}
              type='text'
              name='promptText'
              value={values.promptText}
              onChange={(e) => handleChange(e)}
              /> */}
              <StyledInput
              size='small'
              variant='outlined'
              color='success'
              type='text'
              multiline
              rows={4}
              label='Prompt Text'
              id='outlined-basic'
              name="promptText"
              value={values.promptText}
              onChange={(e) => handleChange(e)}
            />
              {/* <TextField
              size='small'
              label="Constraints"
              multiline
              rows={4}
              type='text'
              name='constraints'
              value={values.constraints}
              onChange={(e) => handleChange(e)}
              /> */}
              <StyledInput
              size='small'
              variant='outlined'
              color='success'
              type='text'
              multiline
              rows={4}
              label='Constraints'
              id='outlined-basic'
              name="constraints"
              value={values.constraints}
              onChange={(e) => handleChange(e)}
            />
              <FormControl variant='outlined'>
                {/* <InputLabel id='timecomplexity-label'>Time Complexity</InputLabel> */}
                {/* <Select
                  labelid='timecomplexity-label'
                  name="timeComplexity"
                  value={values.timeComplexity}
                  onChange={(e) => handleChange(e)}
                > */}
                <StyledInput
                  select
                  color='success'
                  labelId='language-label'
                  label='Time Complexity'
                  name='timeComplexity'
                  value={values.timeComplexity}
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  size='small'
              >
                  <MenuItem value='O(1)'>O(1)</MenuItem>
                  <MenuItem value='O(log n)'>O(log n)</MenuItem>
                  <MenuItem value='O(n)'>O(n)</MenuItem>
                  <MenuItem value='O(n log n)'>O(n log n)</MenuItem>
                  <MenuItem value='O(n^2)'>O(n^2)</MenuItem>
                {/* </Select> */}
                </StyledInput>
              </FormControl>
              {/* <TextField
              size='small'
                label="Solution"
                multiline
                rows={4}
                type='text'
                name='solution'
                value={values.solution}
                onChange={(e) => handleChange(e)}
                /> */}
              <StyledInput
                size='small'
                variant='outlined'
                color='success'
                type='text'
                multiline
                rows={4}
                label='Solution'
                id='outlined-basic'
                name="solution"
                value={values.solution}
                onChange={(e) => handleChange(e)}
            />

          </Stack>
          {/* )} */}
          </Collapse>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
           <Button
            sx={{backgroundColor: '#272727' }}
              variant='contained'
              type='button'
              size='large'
              onClick={(e) => toggleExpand(e)}
            >
              { expand ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
            </Button>
            <Button
              sx={{backgroundColor: '#272727' }}
              variant='contained'
              type='submit'
              size='large'
              onClick={(e) => handleSubmit(e, values)}
            >
              Submit
            </Button>
          </Box>
      </Stack>
    </Stack>
  );
}

