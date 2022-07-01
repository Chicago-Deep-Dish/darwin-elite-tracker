import React from 'react';
import pageLayout from '../../../styles/pageLayout.css';
import  useGlobalContext from '../../../context/GlobalContext';
import Button from '@mui/material/Button';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import ArrowDropUp from '@mui/icons-material/ArrowDropUp';
import Box from '@mui/material/Box';

export default function About () {
  const { aboutToggle, setAboutToggle } = useGlobalContext();
  return(
    <div className='about'>
      <h1>About</h1>
      <div style={{marginRight: '5%', marginLeft: '5%'}}>
        <p>
          Darwin&trade;'s history can be dated back to the late 19th Century, to our CEO Leon Must&trade;'s great-great-great-great grandfather, Charles Darwin. Since then, the tradition of greatness has been incultated with each generation - and this is where you come in. Leon Must&trade; believes in the potential of each and every one of you. Darwin&trade; is in the business of pushing humanity together to reach an intellectual higher ground, together.
        </p>
        </div>
      <Button
        sx={{backgroundColor: '#272727'}}
          variant='contained'
          type='button'
          size='large'
          onClick={() => setAboutToggle(!aboutToggle)}
        >
          { aboutToggle ? (<ArrowDropUp/>) : (<ArrowDropDown/>) }
      </Button>
    </div>
  );
}