import React, { useState, useContext, createContext } from 'react';

const GlobalContext = createContext();

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({children}) {
  const [exampleState, setExampleState] = useState('Set state inside GlobalContext.js');

  const value = {
    exampleState,
    setExampleState
  }
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}
