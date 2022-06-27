//Modules
// import * as React from "react";
import { useState, useEffect } from "react";
import useGlobalContext from "../../Context/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

//Styling
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

//Firebase
import { app } from "./../../firebase/firebase-config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Form({ title }) {
  let navigate = useNavigate();
  const { exampleState, setExampleState } = useGlobalContext();

  console.log(exampleState);

  useEffect(() => {
    setExampleState("setExampleState inside Form.js");
  }, []);

  //------ FIREBASE ------//


  // const { authToken, setAuthToken } = useGlobalContext();
  const authToken = 2387239482
  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickSubmit = (id) => {
    console.log("ID of form (login/signup):", id);
    console.log("email:", loginValues.email);
    console.log("Password:", loginValues.password);
    const authentication = getAuth();

    if (id === "register") {
      createUserWithEmailAndPassword(
        authentication,
        loginValues.email,
        loginValues.password
      )
        .then((response) => {
          navigate("/");
          toast.success("User Created Successfully");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          console.log(error);
          console.log(error.code);

          if (error.code === "auth/email-already-in-use") {
            toast.error("Email Already in Use");
          }
        });
    }
    if (id === "login") {
      //TODO: change this behavior to just having the userAccountIcon show up
      if (authToken) {
        toast.success("Already Logged In");
      }
      signInWithEmailAndPassword(
        authentication,
        loginValues.email,
        loginValues.password
      )
        .then((response) => {
          navigate("/");
          toast.success("User Logged In Successfully");
          sessionStorage.setItem(
            "Auth Token",
            response._tokenResponse.refreshToken
          );
        })
        .catch((error) => {
          console.log("error", error);
          console.log("error.code", error.code);

          if (error.code === "auth/wrong-password") {
            toast.error(
              "Password may have been incorrect, please check and try again"
            );
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Invalid Email, try again");
          }
          if (error.code === "auth/too-many-requests") {
            toast.error(
              "Too Many requests. Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. "
            );
          }
        });
    }
  };

  const handleChange = (prop) => (event) => {
    setLogin({ ...loginValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setLogin({
      ...loginValues,
      showPassword: !loginValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ border: "5px solid red", backgroundColor: "grey" }}>
      <div className="heading-container">
        <h3>{title} Form</h3>
      </div>

      <Box sx={{ backgroundColor: "primary.dark" }}>
        <div>
          <FormControl
            sx={{ backgroundColor: "primary.dark", m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              value={loginValues.email}
              onChange={handleChange("email")}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleClickSubmit();
                }
              }}
              label="Password"
            />
          </FormControl>
          <FormControl
            sx={{ backgroundColor: "primary.dark", m: 1, width: "25ch" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={loginValues.showPassword ? "text" : "password"}
              value={loginValues.password}
              onChange={handleChange("password")}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleClickSubmit();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {loginValues.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </Button>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
      </Box>
      <Button type="submit" onClick={handleClickSubmit}>
        {title}
      </Button>
    </div>
  );
}
