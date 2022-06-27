import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
} from "@mui/material";

export default function Form({ title, loginValues, setLogin, handleClickSubmitLogin }) {
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
                  handleClickSubmitLogin();
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
                  handleClickSubmitLogin();
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
      <Button type="submit" onClick={handleClickSubmitLogin}>
        {title}
      </Button>
    </div>
  );
}
