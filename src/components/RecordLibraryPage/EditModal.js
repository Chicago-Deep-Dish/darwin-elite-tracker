import React from "react";
import "../../styles/PopupModal.css";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export default function EditModal({ setShowEditModal, row, setRow, tableData, setTableData }) {
  function handleExitModal() {
    setShowEditModal(false);
    setRow({});
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    tableData.splice(row.idx, 1, row.data);
    setTableData(tableData);
    handleExitModal();
  }

  function handleFormChange(e) {
    setRow({
      idx: row.idx,
      data: {
        ...row.data,
        [e.target.id]: e.target.value
      }
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
          <FormControl autoComplete="off" sx={{ '& > :not(style)': { m: 1 } }} component="form" onChange={handleFormChange} onSubmit={handleFormSubmit}>
            <TextField id="promptName" label="Name" value={row.data.promptName}></TextField>
            <TextField id="promptLink" label="Link" value={row.data.promptLink}></TextField>
            <TextField id="difficulty" label="Difficulty" value={row.data.difficulty}></TextField>
            <TextField id="date" label="Date" value={row.data.date}></TextField>
            <TextField id="totalTime" label="Total Time" value={row.data.totalTime}></TextField>
            <TextField id="topic" label="Topic" value={row.data.topic}></TextField>
            <Button type="submit">Submit</Button>
          </FormControl>
        </div>
      </section>
    </div>
  );
}
