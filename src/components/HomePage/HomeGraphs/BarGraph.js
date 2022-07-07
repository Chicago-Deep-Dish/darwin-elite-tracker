import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import MenuBar from "./MenuBar.js";
import useGlobalContext from "../../../context/GlobalContext.js";
import Container from "@mui/material/Container";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function Bar() {
  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState("totalQuantities");
  const [selection, setSelection] = React.useState("difficulty");
  const [subject, setSubject] = React.useState([]);
  const [input, setInput] = React.useState([12, 33, 54]);
  const [time, setTime] = React.useState("whole process");
  const [range, setRange] = React.useState("year");
  const [language, setLanguage] = React.useState("Javascript");
  const [toggleGraphMenu, setToggleGraphMenu] = React.useState(false);

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
    if (range === "month") {
      startDate = getLastDate(29);
    } else if (range === "year") {
      startDate = getLastDate(364);
    }
    const timeFiltered = userProblemArray.filter(
      (problem) => problem.timeStamp > startDate && problem.timeStamp < lastDate
    );
    const timeAndLangFiltered = timeFiltered.filter(
      (sample) => sample["programmingLanguage"] === language
    );

    //filter total&subject
    if (graph === "totalQuantities" && selection === "subject") {
      let result = Array(subject.length).fill(0);
      timeAndLangFiltered.forEach((problem) => {
        let index = subject.indexOf(problem.topics);
        if (index !== -1) {
          result[index]++;
        }
      });
      setInput(result);
    } //working

    if (graph === "totalQuantities" && selection === "difficulty") {
      timeAndLangFiltered.forEach((problem) => {
        if (problem.difficulty === "easy") easy++;
        else if (problem.difficulty === "medium") medium++;
        else hard++;
      });
      setInput([easy, medium, hard]);
    } //working

    if (graph === "totalTime" && selection === "subject") {
      let totalTime = Array(subject.length).fill(0);
      let count = Array(subject.length).fill(0);
      timeAndLangFiltered.forEach((problem) => {
        const index = subject.indexOf(problem.topics);
        if (index !== -1) {
          totalTime[index] = totalTime[index] + Number(problem.totalTime);
          count[index]++;
        }
      });
      totalTime = totalTime.map((time, i) => {
        if (time !== 0) {
          time /= count[i];
          time /= 1000;
          time /= 60;
        }
        return time;
      });
      setInput(totalTime);
    }

    if (graph === "totalTime" && selection === "difficulty") {
      let countE = 0,
        countM = 0,
        countH = 0;
      timeAndLangFiltered.forEach((problem) => {
        if (problem.difficiulty === "easy") {
          easy += Number(problem.totalTime);
          countE++;
        } else if (problem.difficulty === "medium") {
          medium += Number(problem.totalTime);
          countM++;
        } else {
          hard += Number(problem.totalTime);
          countH++;
        }
      });
      //get average and change to minus
      if (countE !== 0) {
        easy /= countE;
        easy /= 1000;
        easy /= 60;
      }
      if (countM !== 0) {
        medium /= countM;
        medium /= 1000;
        medium /= 60;
      }
      if (countH !== 0) {
        hard /= countH;
        hard /= 1000;
        hard /= 60;
      }
      setInput([easy, medium, hard]);
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
      textStyle: {
        color: "white",
      },
    },
    textStyle: {
      color: function (value, index) {
        return "white";
      },
      fontWeight: "bold",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: selection === "difficulty" ? ["easy", "medium", "hard"] : subject,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: input,
        type: "bar",
        emphasis: {
          itemStyle: {
            color: "#fac858",
          },
        },
      },
    ],
  };
  return (
    <Stack style={{ height: "605px" }}>
      <Box
        sx={{
          "&:hover": { boxShadow: 5 },
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
          subject={subject}
          selection={selection}
          time={time}
          range={range}
          language={language}
          setGraph={setGraph}
          setSelection={setSelection}
          handleSubject={(e) => setSubject(e.target.value)}
          handleRange={(e) => setRange(e.target.value)}
          handleLanguage={(e) => setLanguage(e.target.value)}
          handleTime={(e) => setTime(e.target.value)}
          handleGraph={(e) => setGraph(e.target.value)}
          handleSelection={(e) => {
            setSelection(e.target.value);
            setSubject([]);
          }}
        />
      </Collapse>
    </Stack>
  );
}
