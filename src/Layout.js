import React from "react";
import NavBar from "./components/common/NavBar/NavBar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PopupModal from "./components/common/PopupModal";
import About from "./components/common/NavBar/About";
import Collapse from "@mui/material/Collapse";

export default function Layout({ children }) {
  const [modal, setModal] = useState({});
  const [aboutToggle, setAboutToggle] = useState(false);
  return (
    <>
      <NavBar setModal={setModal} aboutToggle={aboutToggle} setAboutToggle={setAboutToggle} />
      <Collapse sx={{ mt: 0 }} in={aboutToggle}>
        <About aboutToggle={aboutToggle} setAboutToggle={setAboutToggle}/>
      </Collapse>
      {children}
      <PopupModal modal={modal} setModal={setModal} />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </>
  );
}
