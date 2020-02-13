import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import StudentLogin from "../src/Components/Student/studentLogin";
import Router from "./Routes/Router";

const App = () => {
  let handleSubmit = async () => {
    let thisisdata = await axios.get("/api/v1/student/get-students");
    // let newdata = await data.json();
    console.log("it works", thisisdata.data.allStudents);
  };

  return <Router />;
};
export default App;
