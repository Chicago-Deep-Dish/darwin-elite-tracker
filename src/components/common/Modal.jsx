import React from "react";
import "./modal-styles.css";
import Form from "./Form.jsx";

export default function Modal({
  handleClickSubmit,
  modal,
  loginValues,
  setLogin,
}) {
  function renderModal({ modalName, modalData }) {
    switch (modalName) {
      case "login":
        return (
          <Form
            title="Login"
            loginValues={loginValues}
            setLogin={setLogin}
            handleClickSubmit={() => handleClickSubmit("login")}
          />
        );
      case "register":
        return (
          <Form
            title="Register"
            loginValues={loginValues}
            setLogin={setLogin}
            handleClickSubmit={() => handleClickSubmit("register")}
          />
        );
      default:
        return <div />;
    }
  }

  // function reset() {
  //   const allInputs = document.querySelectorAll(".modal-input");
  //   allInputs.forEach((i) => {
  //     i.value = "";
  //   });
  // }

  function handleClick(e) {
    const modalMask = document.getElementById("modal");
    if (e.target === modalMask) {
      modalMask.style.display = "none";
      // reset();
    }
  }

  return (
    <div id="modal" className="modal" onClick={handleClick}>
      {renderModal(modal)}
    </div>
  );
}
