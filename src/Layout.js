import React from "react";
import NavBar from "./components/NavBar";
import Box from "@mui/material/Box";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PopupModal from "./components/common/PopupModal";

export default function Layout({ children }) {
  const [modal, setModal] = useState({});
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
      <PopupModal modal={modal} setModal={setModal} />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </Box>
  );
}
