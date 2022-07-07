import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import MenuBar from "./MenuBar.js";
import useGlobalContext from "../../../context/GlobalContext.js";
import Container from "@mui/material/Container";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function Donut() {
  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState("totalQuantities");
  const [selection, setSelection] = React.useState("difficulty");
  const [subject, setSubject] = React.useState([]);
  const [input, setInput] = React.useState([]);
  const [time, setTime] = React.useState("whole process");
  const [range, setRange] = React.useState("year");
  const [language, setLanguage] = React.useState("Javascript");
  const [toggleGraphMenu, setToggleGraphMenu] = React.useState(false);

  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };
  const handleRange = (event: SelectChangeEvent) => {
    setRange(event.target.value);
  };
  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };
  const handleGraph = (event) => {
    setGraph(event.target.value);
  };
  const handleSelection = (event) => {
    setSelection(event.target.value);
    setSubject([]);
  };
  const handleSubject = (event) => {
    setSubject(event.target.value);
  };

  const getLastDate = (x) => {
    const now = new Date();
    const result = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - x
    );
    return result.toISOString();
  };

  React.useEffect(() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;
    let lastDate = getLastDate(0);
    let startDate = getLastDate(6);

    //filter time range
    if (range === "month") {
      startDate = getLastDate(29);
    } else if (range === "year") {
      startDate = getLastDate(364);
    }
    const samples = userProblemArray.filter(
      (problem) => problem.timeStamp > startDate && problem.timeStamp < lastDate
    );

    //filter the language
    const sampleUpdate = samples.filter(
      (sample) => sample["programmingLanguage"] === language
    );

    //filter total&subject
    if (graph === "totalQuantities" && selection === "subject") {
      let result = Array(subject.length).fill(0);
      sampleUpdate.forEach((problem) => {
        let index = subject.indexOf(problem.topics);
        if (index !== -1) {
          result[index]++;
        }
      });
      //convert to [{},{}...]format for table
      let finalResult = [];
      for (let i = 0; i < subject.length; i++) {
        let temp = {};
        temp["value"] = result[i];
        temp["name"] = subject[i];
        finalResult.push(temp);
      }
      setInput(finalResult);
    } //working

    if (graph === "totalQuantities" && selection === "difficulty") {
      for (let i = 0; i < sampleUpdate.length; i++) {
        if (sampleUpdate[i].difficulty.toLowerCase() === "easy") {
          easy++;
        } else if (sampleUpdate[i].difficulty.toLowerCase() === "medium") {
          medium++;
        } else {
          hard++;
        }
      }
      setInput([
        { value: easy, name: "easy" },
        { value: medium, name: "medium" },
        { value: hard, name: "hard" },
      ]);
    }

    if (graph === "totalTime" && selection === "subject") {
      const totalTime = Array(subject.length).fill(0);
      const count = Array(subject.length).fill(0);
      for (let i = 0; i < sampleUpdate.length; i++) {
        const sub = sampleUpdate[i]["topics"];
        const index = subject.indexOf(sub);
        if (index >= 0) {
          totalTime[index] =
            totalTime[index] + Number(sampleUpdate[i]["totalTime"]);
          count[index]++;
        }
      }

      if (totalTime) {
        for (let i = 0; i < totalTime.length; i++) {
          if (totalTime[i] !== 0) {
            totalTime[i] = totalTime[i] / count[i];
            totalTime[i] = totalTime[i] / 1000 / 60;
          }
        }
      }
      //conver totaltime and subject to [{},{},{}....]
      const final = [];
      for (let i = 0; i < subject.length; i++) {
        const temp = {};
        temp["value"] = totalTime[i];
        temp["name"] = subject[i];
        final.push(temp);
      }
      setInput(final);
    }

    if (graph === "totalTime" && selection === "difficulty") {
      let countE = 0;
      let countM = 0;
      let countH = 0;

      for (let i = 0; i < sampleUpdate.length; i++) {
        if (sampleUpdate[i].difficulty.toLowerCase() === "easy") {
          easy = easy + Number(sampleUpdate[i]["totalTime"]);
          countE++;
        } else if (sampleUpdate[i].difficulty.toLowerCase() === "medium") {
          medium = medium + Number(sampleUpdate[i]["totalTime"]);
          countM++;
        } else {
          hard = hard + Number(sampleUpdate[i]["totalTime"]);
          countH++;
        }
      }
      //get average and change to minus
      if (countE !== 0) {
        easy = easy / countE;
        easy = easy / 1000 / 60;
      }
      if (countM !== 0) {
        medium = medium / countM;
        medium = medium / 1000 / 60;
      }
      if (countH !== 0) {
        hard = hard / countH;
        hard = hard / 1000 / 60;
      }
      //transfer to this format  [ { value: input[0], name: 'easy' },
      setInput([
        { value: easy, name: " easy" },
        { value: medium, name: "medium" },
        { value: hard, name: "hard" },
      ]);
    }
  }, [graph, selection, subject, time, language, range, userProblemArray]);

  const option = {
    title: {
      text:
        graph === "totalTime"
          ? "Speed (mins)"
          : graph === "totalQuantities"
          ? "Total"
          : null,
      padding: [20, 5, 5, 5],
      textStyle: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
      left: "80%",
      textStyle: { color: "white" },
    },
    series: [
      {
        name: "Donut",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
          color: "white",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: input,
      },
    ],
  };
  return (
    <Stack style={{ height: "605px" }}>
      <Box
        sx={{
          "&:hover": { boxShadow: 3 },
          width: "500px",
          ml: 4,
          mr: 4,
          mt: 1,
          mb: 2,
          backgroundColor: "#1A2027",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          padding: 3,
        }}
      >
        <ReactEcharts option={option} />
      </Box>
      <Container
        sx={{ backgroundColor: "#1A2027", width: "500px", padding: 1 }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <IconButton
            sx={{ right: "30%" }}
            onClick={() => setToggleGraphMenu(!toggleGraphMenu)}
          >
            {toggleGraphMenu ? <ArrowDropUp /> : <ArrowDropDown />}
          </IconButton>
        </div>
      </Container>
      <Collapse in={toggleGraphMenu}>
        <MenuBar
          graph={graph}
          setGraph={setGraph}
          subject={subject}
          handleSubject={handleSubject}
          selection={selection}
          setSelection={setSelection}
          time={time}
          range={range}
          language={language}
          handleRange={handleRange}
          handleLanguage={handleLanguage}
          handleTime={handleTime}
          handleGraph={handleGraph}
          handleSelection={handleSelection}
        />
      </Collapse>
    </Stack>
  );
}
