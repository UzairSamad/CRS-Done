import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import axios from "axios";
import "./stLogin.css";
import "../../Screens/StudentScreen";
import StudentScreen from "../../Screens/StudentScreen";

class StudentLogin extends Component {
  state = {
    username: "",
    password: "",
    studentData: "",
    studenttoken: "",
    recivedData: false,
    error: false
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };

    let data = axios
      .post("/api/v1/student/login", user)
      .then(response => {
        console.log(response.data);
        this.setState({
          studentData: response.data,
          studenttoken: response.data.token,
          recivedData: true
        });
        console.log(this.state);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error.message);
      });
  };

  render() {
    const { recivedData } = this.state;
    const { error } = this.state;
    return (
      <div>
        {recivedData === false && (
          <form className="form-containerlogin" onSubmit={this.handleSubmit}>
            <fieldset className="form-field set">
              <h2 className="login-heading">SignIn</h2>
              UserName:
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              Password:
              <CustomInput
                type="password"
                required
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              <SubmitButton value="SignIn" />
              {error === true && (
                <p className="error-para-student"> Invalid Username or I.D</p>
              )}
            </fieldset>
          </form>
        )}

        {recivedData === true && (
          <StudentScreen studentInfo={this.state.studentData} />
        )}
      </div>
    );
  }
}

export default StudentLogin;
