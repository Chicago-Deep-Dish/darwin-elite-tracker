/* eslint-disable no-unused-vars */

//Modules
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebaseErrorCodes from "./../../helpers/firebaseErrorCodes";

import { sampleClass } from "../../test/sampleData";
//Styling
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import useGlobalContext from "../../context/GlobalContext";

export default function Form({ modalName, setModal, handleExitModal }) {
  const { toastifyTheme } = useGlobalContext();

  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
    userLoggedIn: false,
  });

  const handleClickSubmit = () => {
    if (modalName === "LOGIN") {
      //TODO: add userAccountIcon show up on successful login
      axios
        .get("/users/login", {
          params: {
            email: loginValues.email,
            password: loginValues.password,
          },
        })
        .then(({ data }) => {
          setLogin({ ...loginValues, userLoggedIn: true });
          handleExitModal(null, "exit");
          setModal({ modalName: null });
          // console.log("data", data);
          sessionStorage.setItem("AuthToken", data._tokenResponse.refreshToken);
          sessionStorage.setItem("UserID", data.user.uid);
          toast.success("User Logged In Successfully", toastifyTheme);
        })
        .catch((error) => {
          firebaseErrorCodes(error.response.data.code, toastifyTheme);
        });
    }
    if (modalName === "REGISTER") {
      axios
        .get("/users/register", {
          params: {
            email: loginValues.email,
            password: loginValues.password,
          },
        })
        .then(({ data }) => {
          sessionStorage.setItem("AuthToken", data._tokenResponse.refreshToken);
          sessionStorage.setItem("UserID", data.user.uid);
          toast.success("User Created Successfully", toastifyTheme);
          const userData = { ...sampleClass, userId: data.user.uid };
          axios.post("/users/userData", userData).then((data) => {
            // console.log(data);
            toast.success(`Created Successfully`, toastifyTheme);

            handleExitModal(null, "exit");
            setModal({ modalName: "empty" });
          });
        })
        .catch((error) => {
          firebaseErrorCodes(error.response.data.code, toastifyTheme);
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
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FormControl sx={{ "& > :not(style)": { m: 1 } }} component="form">
        <TextField
          sx={{ midwidth: 100, width: 300 }}
          id="outlined-adornment-email"
          value={loginValues.email}
          onChange={handleChange("email")}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleExitModal(null, "exit");
            }
          }}
          label="Email"
        />
      </FormControl>
      <FormControl sx={{ "& > :not(style)": { m: 1 } }} component="form">
        <TextField
          sx={{ midwidth: 100, width: 300 }}
          id="outlined-adornment-password"
          type={loginValues.showPassword ? "text" : "password"}
          value={loginValues.password}
          onChange={handleChange("password")}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleClickSubmit();
            }
          }}
          InputProps={{
            endAdornment: (
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
            ),
          }}
          label="Password"
        />
      </FormControl>
      <Button
        sx={{ midwidth: 80, width: 200, p: 1, disabled: true }}
        variant="contained"
        type="submit"
        onClick={handleClickSubmit}
      >
        {" "}
        {modalName}
      </Button>
    </div>
  );
}
