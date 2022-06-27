import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import "../../styles/PopupModal.css";
import { Button, FormControl, IconButton, TextField } from "@mui/material";

export default function EditModal({ setShowEditModal, row }) {
  function handleExitModal(e) {
    setShowEditModal(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('hello');
    //axios put?? then axios get
  }

  return (
    <div className="modal-container" onClick={handleExitModal}>
      <section className="records-modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-title">Edit Row</h2>
          <IconButton onClick={handleExitModal}>
            <CloseIcon />
          </IconButton>
        </header>
        <div className="modal-content">
          <FormControl sx={{'& > :not(style)': {m: 1}}} component="form" onSubmit={handleFormSubmit}>
            <TextField label="Name" value="hello"></TextField>
            <TextField label="Link"></TextField>
            <TextField label="Difficulty"></TextField>
            <TextField label="Time"></TextField>
            <Button type="submit">Submit</Button>
          </FormControl>
        </div>
      </section>
    </div>
  );
}
