/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useGlobalContext from "../Context/GlobalContext";

export default function HomePage() {
  let navigate = useNavigate();

  const { exampleState, setExampleState } = useGlobalContext();

  console.log(exampleState);

  useEffect(() => {
    setExampleState("setExampleState inside Homepage.js");
  }, []);

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      toast.success("Logged IN", {
        hideProgressBar: false,
        position: "bottom-left",
      });
      navigate("/");
    }
    //DON"T REMOVE: this can be useful to navigate to pages with dummy data upon login IF no user is detected
    if (!authToken) {
      toast.error("Not Logged in: Please Login to use all Features", {
        hideProgressBar: true,
        position: "top-left",
      });
      // navigate("/login");
    }
  }, []);

  return <h1>HomePage</h1>;
}
