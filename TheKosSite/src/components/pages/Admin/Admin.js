import React, { Component } from "react";
import UserTable from "./UserTable";
import CheckInTable from "./CheckInTable";
import ChallengesAdmin from "./ChallengesAdmin";
import ChallengeSubmissions from "./ChallengeSubmissions";

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      activeTable: "user-table",
      selected: "users",
    };

    this.handleSidebar = this.handleSidebar.bind(this);
  }

  handleSidebar(name) {
    this.setState({
      selected: name,
    });
  }

  render() {
    return (
      <div className="admin">
        <div className="sidebar">
          <div className="sidebar-body">
            <div
              className={
                this.state.selected === "users"
                  ? "sidebar-link selected"
                  : "sidebar-link"
              }
              onClick={() => this.handleSidebar("users")}
            >
              Users
            </div>
            <div
              className={
                this.state.selected === "checkin"
                  ? "sidebar-link selected"
                  : "sidebar-link"
              }
              onClick={() => this.handleSidebar("checkin")}
            >
              CheckIn
            </div>
            <div
              className={
                this.state.selected === "challenges"
                  ? "sidebar-link selected"
                  : "sidebar-link"
              }
              onClick={() => this.handleSidebar("challenges")}
            >
              Challenges
            </div>
            <div
              className={
                this.state.selected === "challenge-submissions"
                  ? "sidebar-link selected"
                  : "sidebar-link"
              }
              onClick={() => this.handleSidebar("challenge-submissions")}
            >
              Challenge Submissions
            </div>
          </div>
        </div>
        <div className="admin-wrapper">
          {this.state.selected === "users" ? (
            <div className="admin-table">
              <UserTable />
            </div>
          ) : null}
          {this.state.selected === "checkin" ? (
            <div className="admin-table">
              <CheckInTable />
            </div>
          ) : null}
          {this.state.selected === "challenges" ? (
              <ChallengesAdmin />
          ) : null}
          {this.state.selected === "challenge-submissions" ? (
            <div className="admin-table">
              <ChallengeSubmissions />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
