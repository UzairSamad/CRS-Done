import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Header/header.css";

class Header extends Component {
  render() {
    return (
      <nav className="header-container">
        <Link className="header-link" to={"/student-login"}>
          student Login
        </Link>
        <Link className="header-link" to={"/student-register"}>
          Student SignUP
        </Link>
        <Link className="header-link" to={"/company-login"}>
          {" "}
          Company Login
        </Link>
        <Link className="header-link" to={"/company-register"}>
          Company SignUp
        </Link>
        <Link className="header-link" to={"/admin-pannel"}>
          Admin Pannel
        </Link>
      </nav>
    );
  }
}

export default Header;
