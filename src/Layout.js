import React from 'react';
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
