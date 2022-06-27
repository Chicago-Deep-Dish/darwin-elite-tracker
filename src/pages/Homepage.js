/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import useGlobalContext from "../Context/GlobalContext";

export default function HomePage() {
  // let navigate = useNavigate();

  const { exampleState, setExampleState } = useGlobalContext();

  console.log(exampleState);

  useEffect(() => {
    setExampleState("setExampleState inside Homepage.js");
  }, []);



  return <h1>HomePage</h1>;
}
