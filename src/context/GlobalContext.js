/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import firebaseErrorCodes from "./../helpers/firebaseErrorCodes";
import axios from "axios";

const GlobalContext = createContext();

export default function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalContextProvider({ children }) {
  const [exampleState, setExampleState] = useState(
    "Set state inside GlobalContext.js"
  );
  const [userProblemArray, setUserProblemArray] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);

  //TODO: change theme to a state so it doesn't rerender every time
  const toastifyTheme = {
    hideProgressBar: false,
    position: "bottom-left",
  };

  useEffect(() => {
    if (sessionStorage.getItem("AuthToken")) {
      toast.success("Logged In", toastifyTheme);
      sessionStorage.getItem("UserID");
      axios
        .get("/records", {
          params: {
            userId: sessionStorage.getItem("UserID"),
          },
        })
        .then(({ data }) => {

          const userObject = data._document.data.value.mapValue.fields;
          const UserObjectData = {
            firstName: Object.keys(userObject.firstName)[0],
            lastName: Object.keys(userObject.lastName)[0],
            problems: userObject.problems.mapValue.fields,
            settings: userObject.settings.mapValue.fields,
          };

          const firebaseArray = Object.values(UserObjectData.problems);

          let problemArray = [];
          firebaseArray.forEach((problem) => {
            problemArray.push(problem.mapValue.fields);
          });
          console.log("problemArray", problemArray);
          console.log("userObject", UserObjectData);
          setUserProblemArray(problemArray);
          setUserProfileData(UserObjectData);

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
    exampleState,
    setExampleState,
    toastifyTheme,
  };
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
