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
          const setUserData = dataDecipher(data);
          setUserProfileData(setUserData[0]);
          setUserProblemArray(setUserData[1]);
          let dataArray = [];
          setUserData[1].forEach((problem) => {
            dataArray.push(new Date(problem.timeStamp));
          });
          // console.log("dataArray", dataArray);
          let dates = [
            new Date("06/27/2022"),
            new Date("06/28/2022"),
            new Date("06/28/2022"),
            new Date("06/29/2022"),
            new Date("06/29/2022"),
            new Date("06/29/2022"),
          ];
          setProblemDatesArray([...dataArray, ...dates]);
          setstreakSummary(summary([...dataArray, ...dates]));
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

  console.log(streakSummary);

  const value = {
    toastifyTheme,
    setToastifyTheme,
    userProblemArray,
    setUserProblemArray,
    userProfileData,
    setUserProfileData,
    streakSummary,
    problemDatesArray,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
