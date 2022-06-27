import React from "react";
import "./modal-styles.css";
import Form from "./Form.jsx";

//------ MODAL ------//
// By default, modal is an empty object {}
// When using setModal, the syntax is setModal({ modalName, modalData })
// modalName: Required; a string, decides which modal content to render
// modalData: Optional; an object, should contain some data you need for the modal
// Example 1 - setModal: line 14 @ './QuestionsAndAnswers/QAListEntry.jsx'
// Example 2 - redernModal: line 8 @ './helper/Modals/Modals.jsx'
export default function Modal({ modal, setModal }) {
  function renderModal({ modalName, modalData }) {
    switch (modalName) {
      case "login":
        return (
          <Form
            title="Login"
            modalData={modalData}
            setModal={setModal}
            handleExitModal={handleExitModal}
          />
        );
      case "register":
        return (
          <Form
            title="Register"
            z
            modalData={modalData}
            setModal={setModal}
            handleExitModal={handleExitModal}
          />
        );
      default:
        return <div style={{ display: "none" }} />;
    }
  }

  function handleExitModal(e, command) {
    console.log("command:", command);
    console.log("e:", e);

    const modalMask = document.getElementById("modal");
    if (command === "exit" || e.target === modalMask) {
      console.log("it worked");
      modalMask.style.display = "none";
    }
  }

  return (
    <div id="modal" className="modal" onClick={handleExitModal}>
      {renderModal(modal)}
    </div>
  );
}
