const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const logger = require("morgan");
const bodyparser = require("body-parser");

// connecting mongo here
connectDB();

//setting up enviroment variables
Port = process.env.Port || 5000;

//importing  apis
const student = require("./Routes/student");
const company = require("./Routes/company");
const studentInfo = require("./Routes/studentInfo");
const jobOperations = require("./Routes/jobOperations");
// const Admin = require("./Routes/admin");

// Init middleware
app.use(express.json({ extended: false }));
//Init loger
app.use(logger("dev"));

//cross origin
// ;app.use(cors())

//body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//init register routes
app.use("/api/v1/student", student);
app.use("/api/v1/company", company);

//init detail routes for student and company info
app.use("/api/v1/studentInfo", studentInfo);

// init job operation route
app.use("/api/v1/jobOperations", jobOperations);

// //admin route
// app.use("/api/v1/admin", Admin);

app.listen(Port, () => {
  console.log(`app is running on port ${Port}`);
});
