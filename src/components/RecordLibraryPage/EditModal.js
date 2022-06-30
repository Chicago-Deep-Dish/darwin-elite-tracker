import React from "react";
import "../../styles/PopupModal.css";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { InputLabel, MenuItem, Select } from "@mui/material";

export default function EditModal({ setShowEditModal, row, setRow, tableData, setTableData }) {
  function handleExitModal() {
    setShowEditModal(false);
    setRow({});
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (isNaN(row.data.timeStamp.day)) {
      return;
    }
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

  function handleDateChange(newDate) {
    const timeStamp = {
      date: newDate,
      month: new Date(newDate).getMonth() + 1,
      day: new Date(newDate).getDate(),
      year: new Date(newDate).getFullYear()
    }
    setRow({
      idx: row.idx,
      data: {
        ...row.data,
        timeStamp
      }
    });
  }

  function handleDifficultyChange(e) {
    setRow({
      idx: row.idx,
      data: {
        ...row.data,
        difficulty: e.target.value
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
            {/* <TextField id="difficulty" label="Difficulty" value={row.data.difficulty}></TextField> */}
            <FormControl>
              <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-select-label"
                id="difficulty"
                value={row.data.difficulty}
                label="Difficulty"
                onChange={handleDifficultyChange}
              >
                <MenuItem id="difficulty" value="easy">easy</MenuItem>
                <MenuItem id="difficulty" value="medium">medium</MenuItem>
                <MenuItem value="hard">hard</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date&Time picker"
                value={row.data.timeStamp.date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField id="totalTime" label="Total Time" value={row.data.totalTime}></TextField>
            <TextField id="topic" label="Topic" value={row.data.topic}></TextField>
            <Button type="submit">Submit</Button>
          </FormControl>
        </div>
      </section>
    </div>
  );
}
