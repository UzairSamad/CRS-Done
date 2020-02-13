import React, { Component } from "react";
import axios from "axios";
import "../Screens/companyScreen.css";

class AdminScreen extends Component {
  state = {
    students: [],
    companies: []
  };
  componentDidMount() {
    let getData = async () => {
      //student api
      let res = await axios.get("/api/v1/student/get-students");
      let data = await res.data.allStudents;

      //company api
      let resCompany = await axios.get("/api/v1/company//get-companies");
      let companyData = await resCompany.data.allCompanies;
      console.log(companyData);
      console.log(data, "this is data");
      this.setState({ students: data, companies: companyData });
      console.log(this.state, "State here");
    };
    getData();
  }
  render() {
    return (
      <div className="main-div">
        <ul>
          <li className="student-list">
            <span className="main-li"> Active Students List</span>
          </li>
          {this.state.students.map((value, index) => {
            if (value.isActive === true) {
              console.log(value.isActive);
              return (
                <li className="admin-css" key={index}>
                  <span className="span-company">
                    StudentName : {value.name}
                  </span>
                  <span className="span-company">E-Mail: {value.email} </span>
                </li>
              );
            }
          })}
        </ul>
        <ul>
          <li className="student-list">
            <span className="main-li"> InActive Students List</span>
          </li>
          {this.state.students.map((value, index) => {
            if (value.isActive === false) {
              console.log(value.isActive);
              return (
                <li className="admin-css" key={index}>
                  <span className="span-company">
                    StudentName : {value.name}
                  </span>
                  <span className="span-company">E-Mail: {value.email} </span>
                </li>
              );
            }
          })}
        </ul>
        <ul>
          <li className="student-list">
            <span className="main-li"> List of Companies</span>
          </li>
          {this.state.companies.map((value, index) => {
            return (
              <li className="admin-css" key={index}>
                <span className="span-company">Company : {value.name}</span>
                <span className="span-company">
                  Description: {value.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AdminScreen;
