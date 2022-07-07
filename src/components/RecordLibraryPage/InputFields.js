import React from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";

export default function InputFields({
  search,
  setSearch,
  filters,
  setFilters,
}) {
  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: 1,
        width: "80%",
        mt: 5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        "& > :not(style)": { mx: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="search-field"
        label="Search"
        variant="standard"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 250 }}
      />
      <FormControl variant="standard">
        <InputLabel id="difficulty-select">Difficulty</InputLabel>
        <Select
          labelid="difficulty-select"
          id="difficulty-select-standard"
          value={filters.difficulty}
          onChange={(e) =>
            setFilters({ ...filters, difficulty: e.target.value })
          }
          label="Difficulty"
          sx={{ width: 85 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="standard">
        <InputLabel id="time-frame-select">Time Frame</InputLabel>
        <Select
          labelid="time-frame-select"
          id="time-frame-select-standard"
          value={filters.timeFrame}
          onChange={(e) =>
            setFilters({ ...filters, timeFrame: e.target.value })
          }
          label="Time Frame"
          sx={{ width: 120 }}
        >
          <MenuItem value="all">All Time</MenuItem>
          <MenuItem value="daily">Past Day</MenuItem>
          <MenuItem value="monthly">Past Month</MenuItem>
          <MenuItem value="yearly">Past Year</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}
