/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import Form from "./Form";
import "../../styles/PopupModal.css";

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
