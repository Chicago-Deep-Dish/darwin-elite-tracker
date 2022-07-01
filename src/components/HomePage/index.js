import React from "react";
import DashBoard from "./DashBoard/Dashboard.js";
import InputForm from "./InputForm/InputForm.js";
import Graphs from "../../components/HomePage/HomeGraphs/Graphs.js";
import pageLayout from "../../styles/pageLayout.css";
import Footer from "./Footer/Footer";
import About from "./About/About";
import useGlobalContext from "../../context/GlobalContext";
import Collapse from "@mui/material/Collapse";

export default function HomePage() {
  const { aboutToggle, setAboutToggle } = useGlobalContext();

  return (
    <div>
      <Collapse sx={{ mt: 0 }} in={aboutToggle}>
        <About />
      </Collapse>
      <div
        className="main-layout"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* <div className='side-bar'> */}
        <InputForm />
        {/* </div> */}
        <div>
          <DashBoard />
          <Graphs />
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}
