/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import useGlobalContext from "../../context/GlobalContext";
import DashBoard from './DashBoard/Dashboard.js';
import InputForm from './InputForm/InputForm.js';
// import DashBoard from './TestDash/Dashboard.js';
import Graphs from '../../components/HomePage/HomeGraphs/Graphs.js';


export default function HomePage() {
  // let navigate = useNavigate();

  const { exampleState, setExampleState } = useGlobalContext();

  // console.log(exampleState);

  useEffect(() => {
    setExampleState("setExampleState inside Homepage.js");
  }, []);



  return (
  <div>
    <h1>HomePage</h1>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
    <div>
        <InputForm></InputForm>
    </div>
    <div>
      <DashBoard/>
      {/* <Dash/> */}
      <Graphs/>
    </div>
    </div>
  </div>

  )
}
