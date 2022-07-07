import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Stopwatch from "./Stopwatch/Stopwatch";
import axios from "axios";
import { toast } from "react-toastify";
import firebaseErrorCodes from "../../../helpers/firebaseErrorCodes";
import useGlobalContext from "../../../context/GlobalContext";
import Collapse from "@mui/material/Collapse";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const StyledInput = styled(TextField)`
  width: 100%;
  & .MuiOutlinedInput-notchedOutline {
    border-color: #f3ab40;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
    color: red;
  }
`;

export default function InputForm() {
  const { toastifyTheme } = useGlobalContext();

  const [times, setTimes] = useState(0);

  const [values, setValues] = useState({
    id: "",
    promptName: "",
    difficulty: "",
    promptLink: "",
    promptText: "",
    constraints: "",
    timeComplexity: "",
    solution: "",
    programmingLanguage: "Javascript",
    readTime: 0,
    whiteBoardTime: 0,
    pseudocodeTime: 0,
    codeTime: 0,
    topic: "",
  });

  const [expand, setExpand] = useState(false);

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e, values) => {
    e.preventDefault();
    axios
      .post(
        "/records",
        {
          ...values,
          id: uuidv4(), //<< random
          constraints: values.constraints.split(", "),
          solution: values.solution.split(", "),
          time: times,
          timeStamp: new Date().toISOString(),
          timeStampinfo: {
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            year: new Date().getFullYear(),
          },
        },
        {
          params: {
            userID: sessionStorage.getItem("UserID"),
          },
        }
      )
      .then(() => {
        setValues({
          promptName: "",
          difficulty: "",
          promptLink: "",
          promptText: "",
          constraints: "",
          timeComplexity: "",
          solution: "",
          programmingLanguage: "",
          readTime: 0,
          whiteBoardTime: 0,
          pseudocodeTime: 0,
          codeTime: 0,
          topic: "",
        });
        setTimes(0);
        toast.success("Data submitted successfully", toastifyTheme);
      })
      .catch((err) => {
        firebaseErrorCodes(err.response.data.code, toastifyTheme);
      });
  };

  let leetTopics = [
    "Arrays",
    "Maps",
    "Linked Lists",
    "Queues",
    "Heaps",
    "Stacks",
    "Trees",
    "Graphs",
    "Breadth-First-Search",
    "Depth-First-Search",
    "Binary Search",
    "Recursion",
    "Backtracking",
    "Dynamic Programming",
    "Trie",
    "Matrix",
    "Sorting",
  ];

  return (
    <Stack
      className="beginning-inputs"
      sx={{ width: 200, mt: "10px", mx: "10px", minWidth: 18 }}
    >
      <Stack
        sx={{
          width: 200,
          mt: 0,
          mx: "10px",
          padding: "25px",
          borderRadius: "10px",
          backgroundColor: "#1A2027",
          minWidth: 17,
        }}
        spacing={2}
        component={"form"}
        onSubmit={(e) => handleSubmit(e, values)}
      >
        <Typography variant="subtitle1">Begin your journey here!</Typography>
        <StyledInput
          size="small"
          variant="outlined"
          color="success"
          required
          type="text"
          label="Prompt Name"
          name="promptName"
          value={values.promptName}
          onChange={(e) => handleChange(e)}
        />

        <FormControl variant="outlined" size="small" required>
          <StyledInput
            select
            color="success"
            labelid="difficulty-label"
            label="Difficulty*"
            name="difficulty"
            value={values.difficulty}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </StyledInput>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <StyledInput
            select
            color="success"
            labelid="language-label"
            label="Programmming Language*"
            name="programmingLanguage"
            value={values.programmingLanguage}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            <MenuItem value="Javascript">Javascript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="Kotlin">Kotlin</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="Swift">Swift</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="PHP">PHP</MenuItem>
          </StyledInput>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <StyledInput
            select
            color="success"
            labelid="topic-label"
            label="Topic*"
            name="topic"
            value={values.topic}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            size="small"
          >
            {leetTopics.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </StyledInput>
        </FormControl>
        <Stopwatch times={times} setTimes={setTimes} />

        <Collapse in={expand}>
          <Stack spacing={1} sx={{ maxHeight: "25vh", overflowY: "auto" }}>
            <Typography variant="subtitle1">Additional Fields</Typography>

            <StyledInput
              size="small"
              variant="outlined"
              color="success"
              type="text"
              label="Prompt Link"
              name="promptLink"
              value={values.promptLink}
              onChange={(e) => handleChange(e)}
            />

            <StyledInput
              size="small"
              variant="outlined"
              color="success"
              type="text"
              multiline
              rows={4}
              label="Prompt Text"
              name="promptText"
              value={values.promptText}
              onChange={(e) => handleChange(e)}
            />

            <StyledInput
              size="small"
              variant="outlined"
              color="success"
              type="text"
              multiline
              rows={4}
              label="Constraints"
              name="constraints"
              value={values.constraints}
              onChange={(e) => handleChange(e)}
            />
            <FormControl variant="outlined">
              <StyledInput
                select
                color="success"
                labelid="language-label"
                label="Time Complexity"
                name="timeComplexity"
                value={values.timeComplexity}
                variant="outlined"
                onChange={(e) => handleChange(e)}
                size="small"
              >
                <MenuItem value="O(1)">O(1)</MenuItem>
                <MenuItem value="O(log n)">O(log n)</MenuItem>
                <MenuItem value="O(n)">O(n)</MenuItem>
                <MenuItem value="O(n log n)">O(n log n)</MenuItem>
                <MenuItem value="O(n^2)">O(n^2)</MenuItem>
              </StyledInput>
            </FormControl>

            <StyledInput
              size="small"
              variant="outlined"
              color="success"
              type="text"
              multiline
              rows={4}
              label="Solution"
              name="solution"
              value={values.solution}
              onChange={(e) => handleChange(e)}
            />
          </Stack>
        </Collapse>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{ backgroundColor: "#f3ab40", marginRight: "1px" }}
            variant="contained"
            type="button"
            size="medium"
            onClick={(e) => toggleExpand(e)}
          >
            {expand ? <ArrowDropUp /> : <ArrowDropDown />}
          </Button>
          <Button
            sx={{ backgroundColor: "#f3ab40", marginLeft: "1px" }}
            variant="outlined"
            type="submit"
            size="medium"
            onClick={(e) => handleSubmit(e, values)}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
