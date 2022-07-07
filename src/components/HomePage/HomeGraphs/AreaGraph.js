import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box, Stack } from "@mui/material";
import MenuBar from "./MenuBar.js";
import moment from "moment";
import useGlobalContext from "../../../context/GlobalContext.js";
import Container from "@mui/material/Container";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";

export default function Area() {
  const { userProblemArray } = useGlobalContext();
  const [graph, setGraph] = React.useState("totalQuantities");
  const [selection, setSelection] = React.useState("difficulty");
  const [subject, setSubject] = React.useState([]);
  const [input, setInput] = React.useState([]);
  const [time, setTime] = React.useState("whole process");
  const [range, setRange] = React.useState("year");
  const [language, setLanguage] = React.useState("Javascript");
  const [legend, setLegend] = React.useState([]);

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
    let lastDate = getLastDate(0);
    let startDate = getLastDate(6);

    //filter range
    if (range === "month") {
      startDate = getLastDate(29);
    } else if (range === "year") {
      startDate = getLastDate(364);
    }
    const timeFiltered = userProblemArray.filter(
      (problem) => problem.timeStamp > startDate && problem.timeStamp < lastDate
    );
    const sampleUpdate = timeFiltered.filter(
      (sample) => sample["programmingLanguage"] === language
    );

    //filter graph type(totalQuantities/ aveerge speed) and setting(difficulty/subject)
    if (graph === "totalQuantities" && selection === "subject") {
      const subjectTeam = {};
      sampleUpdate.forEach((problem) => {
        if (subject.includes(problem.topics)) {
          if (subjectTeam[problem.topics] === undefined) {
            subjectTeam[problem.topics] = [];
          }
          subjectTeam[problem.topics].push(problem);
        }
      });

      const updateFormate = {};
      for (let subject in subjectTeam) {
        //let timeAndValue=subjectTeam[subject];
        const temp = {};
        subjectTeam[subject].forEach((problem) => {
          const time = problem.timeStamp.slice(0, 10);
          if (temp[time] !== undefined) {
            temp[time]++;
          } else {
            temp[time] = 1;
          }
        });
        updateFormate[subject] = temp;
      }
      //at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};
      //convert format to fit graph
      let finalResult = [];
      for (let key in updateFormate) {
        let temp = {};
        temp["name"] = key;
        temp["type"] = "line";
        temp["areaStyle"] = {};
        temp["stack"] = "Total";
        temp["emphasis"] = { focus: "series" };
        temp["data"] = [];
        for (let value in updateFormate[key]) {
          let data = [];
          data.push(value);
          data.push(updateFormate[key][value]);
          temp["data"].push(data);
        }
        finalResult.push(temp);
      }
      const container = [];
      for (let i = 0; i < finalResult.length; i++) {
        container.push(finalResult[i]["name"]);
      }
      setLegend(container);
      setInput(finalResult);
    }

    if (graph === "totalQuantities" && selection === "difficulty") {
      let subjectTeam = {};
      sampleUpdate.forEach((problem) => {
        subjectTeam[problem.difficulty] =
          subjectTeam[problem.difficulty] === undefined
            ? []
            : subjectTeam[problem.difficulty];
        subjectTeam[problem.difficulty].push(problem);
      });

      const updateFormate = {};
      for (let subject in subjectTeam) {
        const temp = {};
        subjectTeam[subject].forEach((problem) => {
          const time = problem.timeStamp.slice(0, 10);
          if (temp[time] !== undefined) {
            temp[time]++;
          } else {
            temp[time] = 1;
          }
        });
        updateFormate[subject] = temp;
      }
      //at this point the format is {topic:{timestamp:quantities, timestamps:quantities,...}, topic2:{....}};

      //convert format to fit graph
      const finalResultA = [];
      for (let key in updateFormate) {
        const temp = {};
        temp["name"] = key;
        temp["type"] = "line";
        temp["areaStyle"] = {};
        temp["stack"] = "Total";
        temp["emphasis"] = { focus: "series" };
        temp["data"] = [];
        for (let value in updateFormate[key]) {
          const data = [];
          data.push(value);
          data.push(updateFormate[key][value]);
          temp["data"].push(data);
        }
        finalResultA.push(temp);
      }

      let containerA = [];
      for (let i = 0; i < finalResultA.length; i++) {
        containerA.push(finalResultA[i]["name"]);
      }
      setLegend(containerA);
      setInput(finalResultA);
    }

    if (graph === "totalTime" && selection === "subject") {
      const subjectTeam = {};
      for (let i = 0; i < sampleUpdate.length; i++) {
        const sub = sampleUpdate[i]["topics"];
        if (subject.includes(sub)) {
          if (subjectTeam[sub] === undefined) {
            subjectTeam[sub] = [];
            subjectTeam[sub].push(sampleUpdate[i]);
          } else {
            subjectTeam[sub].push(sampleUpdate[i]);
          }
        }
      }
      //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
      const updateFormate = {};
      for (const topic in subjectTeam) {
        const temp = {};
        subjectTeam[topic].forEach((problem) => {
          const time = problem["timeStamp"].slice(0, 10);
          if (temp[time] !== undefined) {
            temp[time] =
              (temp[time] + Number(problem["totalTime"]) / 1000 / 60) / 2;
          } else {
            temp[time] = Number(problem["totalTime"]) / 1000 / 60;
          }
        });
        updateFormate[topic] = temp;
      }

      let finalResultB = [];
      for (let key in updateFormate) {
        let temp = {};
        temp["name"] = key;
        temp["type"] = "line";
        temp["areaStyle"] = {};
        temp["stack"] = "Total";
        temp["emphasis"] = { focus: "series" };
        temp["data"] = [];
        for (let value in updateFormate[key]) {
          let data = [];
          data.push(value);
          data.push(updateFormate[key][value]);
          temp["data"].push(data);
        }
        finalResultB.push(temp);
      }
      let containerB = [];
      for (let i = 0; i < finalResultB.length; i++) {
        containerB.push(finalResultB[i]["name"]);
      }
      setLegend(containerB);
      setInput(finalResultB);
    }

    if (graph === "totalTime" && selection === "difficulty") {
      const subjectTeam = {};
      sampleUpdate.forEach((problem) => {
        const difficulty = problem.difficulty;
        if (subjectTeam[difficulty] === undefined) {
          subjectTeam[difficulty] = [];
        }
        subjectTeam[difficulty].push(problem);
      });
      //format now {'tree':[date1, data2...], 'hash':[dateI,daataII.....]...}
      const updateFormate = {};
      for (const key in subjectTeam) {
        const timeAndValue = subjectTeam[key];
        const temp = {};
        for (let i = 0; i < timeAndValue.length; i++) {
          const time = timeAndValue[i]["timeStamp"].slice(0, 10);
          if (temp[time] !== undefined) {
            temp[time] =
              (temp[time] + Number(timeAndValue[i]["totalTime"]) / 1000 / 60) /
              2;
          } else {
            temp[time] = Number(timeAndValue[i]["totalTime"]) / 1000 / 60;
          }
        }
        updateFormate[key] = temp;
      }

      let finalResultC = [];
      for (let key in updateFormate) {
        let temp = {};
        temp["name"] = key;
        temp["type"] = "line";
        temp["areaStyle"] = {};
        temp["stack"] = " Total";
        temp["emphasis"] = { focus: "series" };
        temp["data"] = [];
        for (let value in updateFormate[key]) {
          let data = [];
          data.push(value);
          data.push(updateFormate[key][value]);
          temp["data"].push(data);
        }
        finalResultC.push(temp);
      }
      let containerC = [];
      for (let i = 0; i < finalResultC.length; i++) {
        containerC.push(finalResultC[i]["name"]);
      }
      setLegend(containerC);
      setInput(finalResultC);
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
      padding: [20, 10, 10, 10],
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
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: legend,
      textStyle: { color: "white" },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      top: "18%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        formatter: function (value) {
          return moment(value).format("MM/DD");
        },
      },
    },
    yAxis: [
      {
        type: "value",
      },
    ],
    series: input,
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
