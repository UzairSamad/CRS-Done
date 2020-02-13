import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import "../Student/stLogin.css";
import axios from "axios";
import StudentLogin from "./studentLogin";
class StudentRegister extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    name: "",
    gender: "",
    dataRecived: false
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      name: this.state.name,
      gender: this.state.gender
    };

    let data = axios
      .post("/api/v1/student/register", user)
      .then(response => {
        console.log(response.data);
        this.setState({ dataRecived: true });
      })
      .catch(error => {
        console.log(error.messsage);
      });
  };

  render() {
    let { dataRecived } = this.state;
    return (
      <div>
        {dataRecived === false && (
          <form className="form-containerregister" onSubmit={this.handleSubmit}>
            <fieldset className="register-field">
              <h2>SignUp here</h2>
              Name:
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
              UserName:
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              E-mail :
              <CustomInput
                type="email"
                required
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
              Password :
              <CustomInput
                type="password"
                required
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              Gender: Male:
              <input
                type="radio"
                value="female"
                onClick={e => {
                  this.setState({ gender: e.target.value });
                }}
              />
              Female:
              <input
                type="radio"
                value="male"
                onClick={e => {
                  this.setState({ gender: e.target.value });
                }}
              />
              <SubmitButton value="SignUp" />
            </fieldset>
          </form>
        )}
        {dataRecived === true && (
          <div>
            <h3>Registerd Succesfully login to explore </h3>
            <StudentLogin />
          </div>
        )}
      </div>
    );
  }
}

export default StudentRegister;
