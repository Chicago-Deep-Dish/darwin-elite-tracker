import React from "react";
import DashBoard from "./DashBoard/Dashboard.js";
import InputForm from "./InputForm/InputForm.js";
import Graphs from "../../components/HomePage/HomeGraphs/Graphs.js";

export default function HomePage() {
  return (
    <div>
      <div
        className="main-layout"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <InputForm />
        <div>
          <DashBoard />
          <Graphs />
        </div>
      </div>
    </div>
  );
}
