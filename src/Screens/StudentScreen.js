import React, { Component } from "react";
import axios from "axios";
import "./studentscreen.css";

class StudentScreen extends Component {
  state = { jobs: [], studentInfo: "" };

  componentDidMount() {
    let getData = async () => {
      let res = await axios.get("/api/v1/jobOperations/get-jobs");
      let data = await res.data.allJobs;
      console.log(data, "this is data");
      this.setState({ jobs: data });
      console.log(this.state, "State here");
    };
    getData();
  }

  apllyNow = async value => {
    let jobID = value._id;
    let studentID = this.state.studentInfo.id;
    let user = {
      jobID: jobID,
      studentID: studentID
    };
    let res = await axios.post("/api/v1/jobOperations/apply-now", user);
    let data = await res.data;
    console.log(jobID);
    console.log(studentID);
    console.log(data);
  };

  render() {
    const { studentInfo } = this.props;
    this.state.studentInfo = this.props.studentInfo;
    console.log(this.state.studentInfo, "this is prop of screen");
    return (
      <div>
        <h2>{this.state.studentInfo.name.toUpperCase()}</h2>
        <ul>
          {this.state.jobs.map((value, index) => {
            return (
              <li className="job-list" key={index}>
                <span>JobTitile:{value.jobTitle}</span>
                <span>JobDescription:{value.jobDescription}</span>
                <span>CompanyName:{value.companyName} </span>
                <span>
                  <input
                    type="submit"
                    value="Apply Now"
                    className="apply-btn"
                    onClick={() => {
                      this.apllyNow(value);
                    }}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default StudentScreen;
