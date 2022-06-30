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
import useGlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { toast } from 'react-toastify';
import dataDecipher from "../../helpers/dataDecipher";

export default function EditModal({ setShowEditModal, row, setRow, tableData, setTableData }) {
  console.log(row)
  const { setUserProblemArray, toastifyTheme } = useGlobalContext();

  function handleExitModal() {
    setShowEditModal(false);
    setRow({});
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(row.id)
    if (isNaN(row.timeStampinfo.day)) {
      console.log('invalid date')
      return;
    }
    axios.put(
      `/records/${row.id}`,
      {
        ...row,
        codeTime: parseInt(row.codeTime),
        pseudocodeTime: parseInt(row.pseudocodeTime),
        readTime: parseInt(row.readTime),
        totalTime: parseInt(row.totalTime),
        whiteBoardTime: parseInt(row.whiteBoardTime),
      },
      {
        params: {
          userID: sessionStorage.getItem("UserID"),
        }
      })
      .then(() => {
        axios.get("/records", {
          params: {
            userID: sessionStorage.getItem("UserID"),
          },
        })
          .then(({ data }) => {
            const setUserData = dataDecipher(data);
            setUserProblemArray(setUserData[1]);
            toast.success("Problem Changed", toastifyTheme);
            handleExitModal();
          })
      })
      .catch(err => console.log(err))
  }

  function handleFormChange(e) {
    setRow({
      ...row,
      [e.target.id]: e.target.value
    });
  }

  function handleDateChange(newDate) {
    const timeStamp = newDate.toISOString()
    const timeStampinfo = {
      month: (newDate.getMonth() + 1).toString(),
      day: (newDate.getDate()).toString(),
      year: (newDate.getFullYear()).toString()
    }
    console.log(timeStampinfo);
    setRow({
      ...row,
      timeStamp,
      timeStampinfo
    });
  }

  function handleDifficultyChange(e) {
    setRow({
      ...row,
      difficulty: e.target.value
    });
  }

  function handleLanguageChange(e) {
    setRow({
      ...row,
      programmingLanguage: e.target.value
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
            <TextField id="promptName" label="Name" value={row.promptName}></TextField>
            <TextField id="promptLink" label="Link" value={row.promptLink}></TextField>
            <FormControl>
              <InputLabel id="difficulty-select-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-select-label"
                id="difficulty"
                value={row.difficulty}
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
                value={row.timeStamp}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField id="codeTime" type="number" label="Code Time" value={row.codeTime}></TextField>
            <TextField id="topics" label="Topics" value={row.topics}></TextField>
            <FormControl>
              <InputLabel id="language-select-label">Language</InputLabel>
              <Select
                labelId="language-select-label"
                id="programmingLanguage"
                value={row.programmingLanguage}
                label="Language"
                onChange={handleLanguageChange}
              >
                <MenuItem value='Javascript'>Javascript</MenuItem>
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='Java'>Java</MenuItem>
                <MenuItem value='C++'>C++</MenuItem>
                <MenuItem value='Kotlin'>Kotlin</MenuItem>
                <MenuItem value='C'>C</MenuItem>
                <MenuItem value='Swift'>Swift</MenuItem>
                <MenuItem value='C#'>C#</MenuItem>
                <MenuItem value='PHP'>PHP</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit">Submit</Button>
          </FormControl>
        </div>
      </section>
    </div>
  );
}
