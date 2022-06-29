/* eslint-disable no-unused-vars */

//Modules
// import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

//Firebase
import axios from "axios";

export default function Form({ modalName, setModal, handleExitModal }) {
  const { toastifyTheme } = useGlobalContext();

  //------ FIREBASE ------//

  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
    userLoggedIn: false,
  });

  const handleClickSubmit = () => {
    // console.log(SampleData(5))

    console.log("email:", loginValues.email);
    console.log("Password:", loginValues.password);

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
        const token = data._tokenResponse.refreshToken;
        console.log("token:", token);

        setLogin({ ...loginValues, userLoggedIn: true });
        handleExitModal(null, "exit");
        setModal({ modalName: null });
        toast.success("User Logged In Successfully", toastifyTheme);
        sessionStorage.setItem("Auth Token", token);
      })
      .catch((error) => {
        console.log(error);
        const code = error.response.data.code;
        if (code === "auth/wrong-password") {
          toast.error(
            "Password may have been incorrect, please check and try again",
            toastifyTheme
            );
          } else if (code === "auth/user-not-found") {
            toast.error("Invalid Email, try again", toastifyTheme);
          } else if (code === "auth/too-many-requests") {
            toast.error(
              "Too Many requests. Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ",
              toastifyTheme
              );
            } else {
              console.log("not getting the right error code...");
            }
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
            console.log("REGISTER data:", data);
            const token = data._tokenResponse.refreshToken;
            const firebaseuserId = data.user.uid;
            toast.success("User Created Successfully", toastifyTheme);
            sessionStorage.setItem("Auth Token", token);

            axios
            .post("/users/userData", {
              userId: firebaseuserId,
              // below is optional as user may register without this data
              settings: {},
              firstName: null,
              lastName: null,
              defaultGraph: [],
              timestamp: null,
              problems: [
                {
                  // id: id || null,
                  promptName: null,
                  difficulty: null,
                  topics: [],
                  promptLink: null,
                  time: null,
                  // optional
                  promptText: null,
                  solution: [],
                  readTime: null,
                  whiteboardTime: null,
                  pseudocodeTime: null,
                  codeTime: null,
                  contraints: null,
                  timeComplexity: null,
                  programmingLanguage: null,
                },
              ],
            })
            .then(({ data }) => {
              handleExitModal(null, "exit");
              setModal({ modalName: "empty" });
            })
            .catch((error) => {
              console.log(error);
              const code = error.response.data.code;
              if (code === "auth/email-already-in-use") {
                toast.error("Email Already in Use", toastifyTheme);
              } else if (code === "auth/weak-password") {
                toast.error(
                  "Password is weak, please make it at least 6 alphanumeric charcters",
                  toastifyTheme
                  );
                } else {
                  console.log("not getting the right error code...:", error);
                }
              });
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
                sx={{ midwidth: 80, width: 200, p: 1 }}
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
