import React, { Component } from "react";
import CreateJob from "../Components/Company/CreateJob";
import axios from "axios";
import "../Screens/companyScreen.css";

class CompanyScreen extends Component {
  state = { name: "", description: "", token: "", students: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let res = await axios.get("/api/v1/student/get-students");
    let data = await res.data.allStudents;
    console.log(data, "this is data");
    this.setState({ students: data });
    console.log(this.state, "State here");
  };

  render() {
    // setting up data in state
    const data = this.props.user;
    let { name, description, token } = this.state;
    this.state.name = data.name;
    this.state.description = data.description;
    this.state.token = data.token;

    return (
      <div>
        <nav>
          <h2 className="company-title">
            {this.state.name.toLocaleUpperCase()}
          </h2>
          <h3 className="company-des">{this.state.description}</h3>
        </nav>
        <div className="main-div">
          <ul>
            <li className="student-list">
              <span className="main-li">Students List</span>
            </li>
            {this.state.students.map((value, index) => {
              if (value.isActive === true) {
                console.log(value.isActive);
                return (
                  <li className="student-list" key={index}>
                    <span className="span-company">
                      StudentName : {value.name}
                    </span>
                    <span className="span-company">E-Mail: {value.email} </span>
                  </li>
                );
              }
            })}
          </ul>
          <CreateJob apitoken={this.state.token} />
        </div>
      </div>
    );
  }
}

export default CompanyScreen;
