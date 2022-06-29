/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import useGlobalContext from "../../context/GlobalContext";
import Graphs from '../../components/HomePage/HomeGraphs/Graphs.js'
import InputForm from '../../components/HomePage/InputForm/InputForm.js'

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
    <InputForm/>
    <Graphs/>
  </div>

  )
}
