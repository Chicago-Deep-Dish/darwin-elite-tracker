import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import ControlButtons from './ControlButtons';


export default function Stopwatch({ times, setTimes }) {

  const [isActive, setIsActive] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        setTimes((times) => times + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, setTimes]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
    }
  }

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
    setTimes(0);
  };

  return (
    <div className='stop-watch'>
      <Timer
      time={time}
      />
      <ControlButtons
        active={isActive}
        isPaused={isPaused}
        handleStart={handleStart}
        handlePauseResume={handlePauseResume}
        handleReset={handleReset}
      />
    </div>
  );
}