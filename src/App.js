//import modules/css
import "./styles/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./Context/GlobalContext";

//component imports
import HomePage from "./pages/Homepage";
import RecordLibrary from "./pages/RecordLibrary";
import Theme from "./Context/ThemeContext";
import Layout from "./Layout";
import Form from "./../src/components/common/Form.jsx";

//firebase
// import { app } from "./firebase/firebase-config.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function App() {
  const [loginValues, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const navigate = useNavigate();

  const handleClickSubmitLogin = (id) => {
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
      signInWithEmailAndPassword(
        authentication,
        loginValues.email,
        loginValues.password
      )
        .then((response) => {
          navigate("/");
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

  return (
    <div className="App">
      <Theme>
        <GlobalContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/records" element={<RecordLibrary />} />
              <Route
                path="/login"
                element={
                  <Form
                    title="Login"
                    loginValues={loginValues}
                    setLogin={setLogin}
                    handleClickSubmitLogin={() =>
                      handleClickSubmitLogin("login")
                    }
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <Form
                    title="Register"
                    loginValues={loginValues}
                    setLogin={setLogin}
                    handleClickSubmitLogin={() =>
                      handleClickSubmitLogin("register")
                    }
                  />
                }
              />
            </Routes>
          </Layout>
        </GlobalContextProvider>
      </Theme>
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </div>
  );
}
