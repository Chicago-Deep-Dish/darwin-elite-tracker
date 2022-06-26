import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/");
    }
    //this can be useful to navigate to page with dummy data upon login
    if (!authToken) {
      navigate("/login");
    }
  }, []);

  return <h1>HomePage</h1>;
}
