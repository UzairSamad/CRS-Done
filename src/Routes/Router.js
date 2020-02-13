import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StudentRegister from "../Components/Student/studentRegister";
import StudentLogin from "../Components/Student/studentLogin";
import CompanyLogin from "../Components/Company/Companylogin";
import CompanyRegister from "../Components/Company/CompanyRegister";
import Header from "../Components/Header/header";
import AdminLogin from "../Components/Admin/AdminLogin";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/student-login" component={StudentLogin} />
          <Route exact path="/student-register" component={StudentRegister} />
          <Route exact path="/company-login" component={CompanyLogin} />
          <Route exact path="/company-register" component={CompanyRegister} />
          <Route exact path="/admin-pannel" component={AdminLogin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
