/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import firebaseErrorCodes from "../helpers/firebaseErrorCodes";
import axios from "axios";
import dataDecipher from "../helpers/dataDecipher";
import { summary } from "date-streaks";

const GlobalContext = createContext();

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [userProblemArray, setUserProblemArray] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);

  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [problemDatesArray, setProblemDatesArray] = useState([]);
  const [streakSummary, setstreakSummary] = useState([]);
  const [toastifyTheme, setToastifyTheme] = useState({
    hideProgressBar: false,
    position: "bottom-left",
  });

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
          const userData = dataDecipher(data);
          setUserProfileData(userData[0]);
          setUserProblemArray(
            userData[1].sort((prompt1, prompt2) =>
              prompt1.timeStamp.localeCompare(prompt2.timeStamp)
            )
          );

          let dataArray = [];
          userData[1].forEach((problem) => {
            dataArray.push(new Date(problem.timeStamp));
          });

          setProblemDatesArray(dataArray);
          setstreakSummary(summary(dataArray));

          setUserLoggedIn(true);
          toast.success("Recieved Data Successfully", toastifyTheme);
        })
        .catch((error) => {
          console.log(error);
          firebaseErrorCodes(error.response.data.code, toastifyTheme);
        });
    } else {
      // setUserProblemArray(dummy data)
      setUserLoggedIn(false)
      toast.error(
        "Not Logged in: Please Login to begin using all features",
        toastifyTheme
      );
    }
  }, [userLoggedIn]);

  const value = {
    toastifyTheme,
    setToastifyTheme,
    userProblemArray,
    setUserProblemArray,
    userProfileData,
    setUserProfileData,
    streakSummary,
    problemDatesArray,
    userLoggedIn,
    setUserLoggedIn,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
