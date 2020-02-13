import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import "../Student/stLogin.css";
import axios from "axios";
import CompanyScreen from "../../Screens/CompanyScreen";

class CompanyLogin extends Component {
  state = {
    name: "",
    password: "",
    dataRecieved: false,
    apiData: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    };

    let data = axios
      .post("/api/v1/company/login", user)
      .then(response => {
        console.log(response.data);
        this.setState({ dataRecieved: true, apiData: response.data });
        console.log(this.state);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { dataRecieved } = this.state;
    return (
      <div>
        {dataRecieved === false && (
          <form className="form-containerlogin" onSubmit={this.handleSubmit}>
            <fieldset className="form-field set">
              <h2 className="login-heading">SignIn</h2>
              CompanyName:
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ name: e.target.value });
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
            </fieldset>
          </form>
        )}
        {dataRecieved === true && (
          <div>
            <CompanyScreen user={this.state.apiData} />
          </div>
        )}
      </div>
    );
  }
}

export default CompanyLogin;
