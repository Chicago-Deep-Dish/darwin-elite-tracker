import React, { useEffect } from 'react';
import useGlobalContext from '../Context/GlobalContext';

export default function HomePage() {
  const { exampleState, setExampleState } = useGlobalContext();
  console.log(exampleState)
  useEffect(() => {
    setExampleState('world');
  }, [])
  return (
    <h1>HomePage</h1>
  );
}
