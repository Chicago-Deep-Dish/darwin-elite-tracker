import React from "react";
import NavBar from "./components/common/NavBar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PopupModal from "./components/common/PopupModal";

export default function Layout({ children }) {
  const [modal, setModal] = useState({});
  return (
    <>
      <NavBar setModal={setModal} />
      {children}
      <PopupModal modal={modal} setModal={setModal} />
      <ToastContainer toastStyle={{ backgroundColor: "black" }} />
    </>
  );
}
