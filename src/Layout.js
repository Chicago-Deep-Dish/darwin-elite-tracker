import React from "react";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";

export default function Layout({ children, setModal }) {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.blueish",
        height: "100vh",
        width: "100vw",
      }}
    >
      <NavBar setModal={setModal} />
      {children}
    </Box>
  );
}
