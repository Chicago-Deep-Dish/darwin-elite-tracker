import React from 'react';
// import styled from '@emotion/styled';
import { PlayArrow, Pause, RestartAlt, Edit, AddTask } from '@mui/icons-material'

export default function ControlButtons({ handleStart, handleReset, handlePauseResume, active, isPaused, custom, handleCustom, handleConfirm }) {


  const StartButtons = (
    <div style={{display: 'flex', alignItems: 'center', justifyContent:'space-evenly'}}>
     <div
      onClick={handleCustom}>
        {<Edit />}
    </div>
    <div
      onClick={handleStart}
      >
        {<PlayArrow />}
    </div>
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

  const ConfirmClickButton = (
    <div
      onClick={handleConfirm}
    >
      {<AddTask />}
    </div>
  )

  return (
      <div>
        {/* {active ? ActiveButtons : StartButton} */}
        {(() => {
            if (active && !custom ) {
              return ActiveButtons;
            } else if (!active && !custom) {
              return StartButtons;
            } else if (custom && !active){
              return ConfirmClickButton;
            }
        })()}
      </div>
  );
}