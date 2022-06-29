/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [userSettings, setUserSettings] = useState({
    firstGraph: 'bar',
    secondGraph: 'pie',
  });
  const [toastifyTheme, setToastifyTheme] = useState({
    hideProgressBar: false,
    position: "bottom-left",
  });

  //TODO: axios request on mount to get user settings


  useEffect(() => {
    const authToken = sessionStorage.getItem("AuthToken");
    //DON"T REMOVE: this can be useful to navigate to pages with dummy data upon login IF no user is detected

    if (authToken) {
      toast.success("Logged In", toastifyTheme);
    } else {
      toast.error(
        "Not Logged in: Please Login to begin using all features",
        toastifyTheme
      );
    }
  }, []);
  const value = {
    userSettings,
    setUserSettings,
    toastifyTheme,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
