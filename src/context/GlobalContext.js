/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import firebaseErrorCodes from "./../helpers/firebaseErrorCodes";
import axios from "axios";
import dataDecipher from "./../helpers/dataDecipher";

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
  const [userProblemArray, setUserProblemArray] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);

  //TODO: axios request on mount to get user settings
  useEffect(() => {
    if (sessionStorage.getItem("AuthToken")) {
      toast.success("Logged In", toastifyTheme);
      sessionStorage.getItem("UserID");
      axios
        .get("/records", {
          params: {
            userID: sessionStorage.getItem("UserID"),
          },
        })
        .then(({ data }) => {
          const setUserData = dataDecipher(data);

          setUserProfileData(setUserData[0]);
          setUserProblemArray(setUserData[1]);

          toast.success("Recieved Data Successfully", toastifyTheme);
        })
        .catch((error) => {
          console.log(error);
          firebaseErrorCodes(error.response.data.code, toastifyTheme);
        });
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
    setToastifyTheme,
    userProblemArray,
    userProfileData
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
