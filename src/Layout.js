import React from 'react';
import NavBar from './components/NavBar';

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
