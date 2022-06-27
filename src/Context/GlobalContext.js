/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [exampleState, setExampleState] = useState(
    "Set state inside GlobalContext.js"
  );
  const [authToken, setAuthToken] = useState("not available");

  // useEffect(() => {
  //   setAuthToken(sessionStorage.getItem("Auth Token"));
  //   if (authToken) {
  //     toast.success("Logged In", {
  //       hideProgressBar: false,
  //       position: "bottom-left",
  //     });
  //     // navigate("/");
  //   }
  //   //DON"T REMOVE: this can be useful to navigate to pages with dummy data upon login IF no user is detected
  //   if (!authToken) {
  //     toast.error("Not Logged in: Please Login to use all Features", {
  //       hideProgressBar: true,
  //       position: "bottom-left",
  //     });
  //     // navigate("/login");
  //   }
  // }, []);
  const value = {
    exampleState,
    setExampleState,
    authToken,
    setAuthToken,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
