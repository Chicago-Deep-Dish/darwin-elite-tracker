import React from "react";
import useGlobalContext from "../../../context/GlobalContext";
import Button from "@mui/material/Button";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import Box from "@mui/material/Box";

export default function About() {
  const { aboutToggle, setAboutToggle } = useGlobalContext();
  return (
    <Box className="about">
      <h1 style={{ marginTop: 0, paddingTop: "5%" }}>About</h1>
      <div style={{ marginRight: "10%", marginLeft: "10%" }}>
        <p>
          <em>ELEET-TRACKER</em> is a service that has your future in mind. We
          know you are well on your way to become the best Software Engineer you
          can be, and we're here for you. We bring to you a service that allows
          you to track, record, and analyze your performance on the leetcode
          problems you attempt, so you can see how you stack up against the
          fiercest competition out there - yourself.
        </p>
        <br />
        <br />
        <br />
        <p>
          Darwin&trade;'s history can be dated back to the late 19th Century, to
          our CEO Leon Must&trade;'s great-great-great-great grandfather,
          Charles Darwin. Since then, the tradition of greatness has been
          inculcated with each generation - and this is where you come in. Leon
          Must&trade; believes in the potential of each and every one of you.
          Darwin&trade; is in the business of pushing humanity together to reach
          an intellectual higher ground, together.
        </p>
      </div>
      <Button
        sx={{ backgroundColor: "#272727", position: "relative", top: "10%" }}
        variant="contained"
        type="button"
        size="large"
        onClick={() => setAboutToggle(!aboutToggle)}
      >
        {aboutToggle ? <ArrowDropUp /> : <ArrowDropDown />}
      </Button>
    </Box>
  );
}
