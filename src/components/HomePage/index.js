import React from "react";
import DashBoard from './DashBoard/Dashboard.js';
import InputForm from './InputForm/InputForm.js';
// import DashBoard from './TestDash/Dashboard.js';
import Graphs from '../../components/HomePage/HomeGraphs/Graphs.js';

export default function HomePage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <InputForm></InputForm>
        </div>
        <div>
          <DashBoard />
          {/* <Dash/> */}
          <Graphs />
        </div>
      </div>
    </div>
  );
}
