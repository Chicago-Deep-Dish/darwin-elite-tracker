import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "rgb(39, 39, 39)",
        bottom: 0,
        padding: "1.3vh",
        position: "fixed",
      }}
    >
      <p style={{ margin: 0, padding: 3 }}>
        <a
          style={{ textDecoration: "none", padding: 10 }}
          target="_blank"
          href="https://www.techinterviewhandbook.org/coding-interview-study-plan/"
          rel="noreferrer"
        >
          Coding Interview Study Plan
        </a>
      </p>
      <p style={{ margin: 0, padding: 3 }}>
        &#169; Darwin Enterprises&trade; 2022
      </p>
    </footer>
  );
}
