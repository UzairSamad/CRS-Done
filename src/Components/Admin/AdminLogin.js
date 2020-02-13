import React, { Component } from "react";
import CustomInput from "../CustomInput/CustomInput";
import SubmitButton from "../CustomInput/SubmitButton";
import axios from "axios";
import "../Student/stLogin.css";
import AdminScreen from "../../Screens/AdminScreen";

class AdminLogin extends Component {
  state = { dataRecieved: false, name: "", password: "" };
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    };

    let data = axios
      .post("/api/v1/company/admin-login", user)
      .then(res => {
        console.log(res.data);
        this.setState({ dataRecieved: true });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
  render() {
    let { dataRecieved } = this.state;

    return (
      <div>
        {dataRecieved === false && (
          <form className="form-containerlogin" onSubmit={this.handleSubmit}>
            <fieldset className="form-field set">
              <h2 className="login-heading">SignIn</h2>
              Name:
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
        {dataRecieved === true && <AdminScreen />}
      </div>
    );
  }
}

export default AdminLogin;
