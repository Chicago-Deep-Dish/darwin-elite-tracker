import React from 'react';
// import styled from '@emotion/styled';
import { PlayArrow, Pause, RestartAlt } from '@mui/icons-material'

export default function ControlButtons({ handleStart, handleReset, handlePauseResume, active, isPaused }) {


  const StartButton = (
    <div
      onClick={handleStart}>
        {<PlayArrow/>}
      </div>
  );

  const ActiveButtons = (
    <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
      <div
        onClick={handleReset}
        >
          {<RestartAlt />}
      </div>
      <div
        onClick={handlePauseResume}
        >
          {isPaused ? (
            <PlayArrow />) : (<Pause />)
          }
        </div>
    </div>
  );

  return (
      <div>
        {active ? ActiveButtons : StartButton}
      </div>
  );
}