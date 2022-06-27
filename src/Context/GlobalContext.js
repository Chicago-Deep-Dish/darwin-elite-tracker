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
  const toastifyTheme = {
    hideProgressBar: false,
    position: "bottom-left",
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");
    //DON"T REMOVE: this can be useful to navigate to pages with dummy data upon login IF no user is detected

    if (authToken) {
      toast.success("Logged In", toastifyTheme);
      // navigate("/");
    } else {
      toast.error(
        "Not Logged in: Please Login to use all Features",
        toastifyTheme
      );
      // navigate("/login");
    }
  }, []);
  const value = {
    exampleState,
    setExampleState,
    toastifyTheme,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
