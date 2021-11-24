import React, { Component } from "react";
import AdminBlog from "./AdminBlog/AdminBlog";
import AdminCalendar from "./AdminCalendar";
import AdminDirectory from "./AdminDirectory/AdminDirectory";
import AdminExchange from "./AdminExchange";
import AdminPetitions from "./AdminPetitions";
import AdminRegistrations from "./AdminRegistrations";
import AdminUsers from "./AdminUsers";

class Admin extends Component {
  constructor() {
    super();

    this.state = {
      show: "users",
    };
  }
  render() {
    const { show } = this.state;
    return (
      <div className="admin">
        <div className="adminHeader">
          <div className="adminHeader-title">
            <div className="title">Admin</div>
          </div>
          <div className="adminHeader-nav">
            <button
              className={show === "users" ? "nav-button active" : "nav-button"}
              onClick={() => this.setState({ show: "users" })}
            >
              Users
            </button>
            <button
              className={
                show === "registration" ? "nav-button active" : "nav-button"
              }
              onClick={() => this.setState({ show: "registration" })}
            >
              YOI
            </button>
            <button
              className={
                show === "petitions" ? "nav-button active" : "nav-button"
              }
              onClick={() => this.setState({ show: "petitions" })}
            >
              Petitions
            </button>
            <button
              className={show === "blog" ? "nav-button active" : "nav-button"}
              onClick={() => this.setState({ show: "blog" })}
            >
              Blog
            </button>
            <button
              className={
                show === "exchange" ? "nav-button active" : "nav-button"
              }
              onClick={() => this.setState({ show: "exchange" })}
            >
              Exchange
            </button>
            <button
              className={
                show === "directory" ? "nav-button active" : "nav-button"
              }
              onClick={() => this.setState({ show: "directory" })}
            >
              Directory
            </button>
            <button
              className={
                show === "calendar" ? "nav-button active" : "nav-button"
              }
              onClick={() => this.setState({ show: "calendar" })}
            >
              Calendar
            </button>
          </div>
        </div>
        <div className="adminBody">
          <AdminUsers
            className={show === "users" ? "adminElement" : "adminElement hide"}
          />

          <AdminRegistrations
            className={
              show === "registration" ? "adminElement" : "adminElement hide"
            }
          />

          <AdminPetitions
            className={
              show === "petitions" ? "adminElement" : "adminElement hide"
            }
          />

          <AdminBlog
            className={show === "blog" ? "adminElement" : "adminElement hide"}
          />

          <AdminExchange
            className={
              show === "exchange" ? "adminElement" : "adminElement hide"
            }
          />

          
          <AdminDirectory
            className={
              show === "directory" ? "adminElement" : "adminElement hide"
            }
            
          />

          <AdminCalendar
            className={
              show === "calendar" ? "adminElement" : "adminElement hide"
            }
          />
        </div>
      </div>
    );
  }
}

export default Admin;
