import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import "../Student/stLogin.css";
import axios from "axios";

class CreateJob extends Component {
  state = {
    jobTitle: "",
    jobDescription: "",
    email: "",
    token: "",
    jobCreated: false
  };

  handleSubmit = e => {
    e.preventDefault();
    //setting header for post request
    const user = {
      jobTitle: this.state.jobTitle,
      jobDescription: this.state.jobDescription,
      email: this.state.email
    };

    const headers = {
      "Content-Type": "application/json",
      "company-toke": "{this.state.token}"
    };

    let data = axios
      .post("/api/v1/jobOperations/post-job", user, {
        headers: {
          "Content-Type": "application/json",
          "company-token": this.state.token
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ jobCreated: true });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    // sending token into state
    this.state.token = this.props.apitoken;
    console.log(this.state.token, "token in createjob");
    const { jobCreated } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset className="form-field jobData">
          <h3 className="jobHeading">Create a new job</h3>
          JObTitle:
          <CustomInput
            onChange={e => {
              this.setState({ jobTitle: e.target.value });
            }}
          />
          JobDescription
          <CustomInput
            onChange={e => {
              this.setState({ jobDescription: e.target.value });
            }}
          />
          Email:
          <CustomInput
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <SubmitButton value="Create a Job" />
          {jobCreated === true && <p>Job Posted SuccesFully</p>}
        </fieldset>
      </form>
    );
  }
}

export default CreateJob;
