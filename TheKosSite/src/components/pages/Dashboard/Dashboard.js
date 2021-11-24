import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";

import CheckIn from "./CheckIn";
import Challenges from "./Challenges";
import { UserContext } from "../../UserContext";
import User from "../Admin/User";
import ChallengeSubmissionList from "./ChallengeSubmissionList";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }
  static contextType = UserContext;

  render() {
    const { user, setUser } = this.context;
    if (user) {
      if (user.profile.email_confirmed) {
        if (user.profile.registration) {
          return (
            <div className="dashboard">
              <CheckIn />
              <div className="body">
                <Challenges />
                <ChallengeSubmissionList />
              </div>
            </div>
          );
        } else {
          return (
            <div className="dashboard">
              <div className="message-container">
                <div className="registration-message">
                  Your registration has expired. Please click <Link to="profile">here</Link> to register
                  for the new KOS season. You can also register from the profile
                  page.
                </div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div>
            <h1>Dashboard</h1>
            <h3>
              {user.first_name} {user.last_name} your payment has been
              processed. You are now registered for the challenge.
            </h3>
            <h3>Please check email for account verification</h3>
          </div>
        );
      }
    } else {
      return <div>Dashboard</div>;
    }
  }
}
