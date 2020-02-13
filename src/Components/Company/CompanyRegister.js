import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import axios from "axios";
import AfterRegister from "../../Screens/afterRegister";
import CompanyLogin from "../Company/Companylogin";

class CompanyRegister extends Component {
  state = {
    name: "",
    password: "",
    location: "",
    description: "",
    number: "",
    email: "",
    category: "",
    accountCreated: false,
    token: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    let user = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      numbe: this.state.number,
      category: this.state.category,
      description: this.state.description,
      location: this.state.location
    };

    let data = axios
      .post("/api/v1/company/register", user)
      .then(response => {
        console.log(response.data);
        this.setState({ accountCreated: true, token: response.data.token });
      })
      .catch(error => {
        console.log(error.messsage);
      });
  };

  render() {
    const { accountCreated } = this.state;
    return (
      <div>
        {accountCreated === false && (
          <form className="form-containerregister" onSubmit={this.handleSubmit}>
            <fieldset className="register-field">
              <h2>SignUp here..</h2>
              CompanyName:{" "}
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
              E-mail :{" "}
              <CustomInput
                type="email"
                required
                onChange={e => {
                  this.setState({ email: e.target.value });
                }}
              />
              Location:{" "}
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ location: e.target.value });
                }}
              />
              Category:
              <CustomInput
                type="text"
                required
                onChange={e => {
                  this.setState({ category: e.target.value });
                }}
              />
              Password :{" "}
              <CustomInput
                type="password"
                required
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
              Description:{" "}
              <CustomInput
                type="textarea"
                onChange={e => {
                  this.setState({ description: e.target.value });
                }}
              />
              <SubmitButton value="SignUp" />
            </fieldset>
          </form>
        )}
        {accountCreated === true && (
          <div>
            <h3>Account has been created Login here to explore more</h3>
            <CompanyLogin />
          </div>
        )}
      </div>
    );
  }
}

export default CompanyRegister;
