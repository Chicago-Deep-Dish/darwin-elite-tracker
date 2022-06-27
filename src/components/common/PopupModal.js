/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import Form from "./Form";
import "../../styles/PopupModal.css";
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

//------ MODAL ------//
// By default, modal is an empty object {}
// When using setModal, the syntax is setModal({ modalName, modalData })
// modalName: Required; a string, decides which modal content to render
// modalData: Optional; an object, should contain some data you need for the modal
// Example 1 - setModal: line 14 @ './QuestionsAndAnswers/QAListEntry.jsx'
// Example 2 - redernModal: line 8 @ './helper/Modals/Modals.jsx'
export default function PopupModal({ modal, setModal }) {
  function renderModal({ modalName }) {
    if (modalName) {
      return (
        <div className="modal-container">
          <section className="modal">
            <header className="modal-header">
              <h2 className="modal-title">{modalName}</h2>
              <a href="#" onClick={handleExitModal} className="modal-close">
                Close
              </a>
            </header>
            <div className="modal-content">
              <Form
                modalName={modalName}
                setModal={setModal}
                handleExitModal={handleExitModal}
              />
            </div>
          </section>
        </div>
      );
    } else {
      return <div style={{ display: "none" }} />;
    }
  }

  function handleExitModal(e, command) {
    const modalMask = document.getElementsByClassName("modal-container");
    const modalClose = document.getElementsByClassName("modal-close");
    const modalContainer = document.getElementsByClassName("modal");
    if (
      command === "exit" ||
      e.target === modalMask[0] ||
      e.target === modalClose[0]
    ) {
      modalContainer[0].style.display = "none";
    }
  }

  return (
    <div id="modal" className="modal" onClick={handleExitModal}>
      {renderModal(modal)}
    </div>
  );
}
