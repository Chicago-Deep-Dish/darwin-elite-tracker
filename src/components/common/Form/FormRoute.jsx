import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Form from "./Form.jsx";

export default function FormRoute({
  title,
  loginValues,
  setLogin,
  handleClickSubmitLogin,
}) {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <Form
            title="Login"
            loginValues={loginValues}
            setLogin={setLogin}
            handleClickSubmitLogin={() => handleClickSubmitLogin("login")}
          />
        }
      />
      <Route
        path="register"
        element={
          <Form
            title="Register"
            loginValues={loginValues}
            setLogin={setLogin}
            handleClickSubmitLogin={() => handleClickSubmitLogin("register")}
          />
        }
      />
    </Routes>
  );
}
