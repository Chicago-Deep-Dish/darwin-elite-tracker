import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import "../../styles/PopupModal.css";
import { Button, FormControl, IconButton, TextField } from "@mui/material";

export default function EditModal({ setShowEditModal, row, setRow }) {
  function handleExitModal(e) {
    setShowEditModal(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('hello');
    //axios put?? then axios get
    setRow({});
    setShowEditModal(false);
  }

  function handleFormChange(e) {
    console.log(e.target.id);
    setRow({
      ...row,
      [e.target.id]: e.target.value
    });
  }

  return (
    <div className="modal-container" onClick={handleExitModal}>
      <section className="records-modal" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <h2 className="modal-title">Edit Prompt Submission</h2>
          <IconButton onClick={handleExitModal}>
            <CloseIcon />
          </IconButton>
        </header>
        <div className="modal-content">
          <FormControl autoComplete="off" sx={{'& > :not(style)': {m: 1}}} component="form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
            <TextField id="Prompt Name" label="Name" value={row['Prompt Name']}></TextField>
            <TextField id="Prompt Link" label="Link" value={row['Prompt Link']}></TextField>
            <TextField id="Difficulty" label="Difficulty" value={row['Difficulty']}></TextField>
            <TextField id="Time" label="Date" value={row['Time']}></TextField>
            <TextField id="Total Time" label="Total Time" value={row['Total Time']}></TextField>
            <TextField id="Topic" label="Topic" value={row['Topic']}></TextField>
            <Button type="submit">Submit</Button>
          </FormControl>
        </div>
      </section>
    </div>
  );
}
