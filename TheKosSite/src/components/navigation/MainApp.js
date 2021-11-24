import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import { UserContext } from "../UserContext";
import NavigationContainer from "../navigation/navigation-container";
import Home from "../pages/Home";
import Register from "../registration/Register";
import Axios from "axios";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignIn from "../registration/SignIn";
import Confirmation from "../registration/confirmation";
import Announcements from "../pages/Announcements";
import Admin from "../pages/Admin/AdminPanel";
import GuardedRoute from "../navigation/GuardedRoute";

import { LogoSVG } from "../logo/logoSvg";
import ForgotPassword from "../registration/Auth/forgotPassword";
import PasswordReset from "../registration/Auth/passwordReset";
import Profile from "../pages/Profile";

export default class MainApp extends Component {
  constructor() {
    super();

    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }
  static contextType = UserContext;

  getUser() {
    var token = Cookies.get("access_token");

    if (token) {
      Axios.get("http://127.0.0.1:8000/api/get-user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          this.context.setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("token Unavailable");
    }
  }

  checkLoginStatus() {
    console.log("Check Login Status");
    const loggedIn = Cookies.get("access_token") ? true : false;
    if (loggedIn) {
      this.getUser();
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    const isAuthenticated = Cookies.get("access_token") ? true : false;
    return (
      <div>
        <div className="navbar">
          <NavigationContainer isAuthenticated={isAuthenticated} />
        </div>
        <div className="component-wrapper">
          <LogoSVG />

          <Switch>
            {/* Unprotected Routes */}
            <Route exact path="/" component={Home} />
            <Route
              path="/register"
              render={(props) => (
                <Register
                  {...props}
                  handleSuccessfulLogin={this.checkLoginStatus}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <SignIn
                  {...props}
                  handleSuccessfulLogin={this.checkLoginStatus}
                />
              )}
            />

            <Route path="/forgot-password/:token" component={PasswordReset} />
            <Route path="/forgot-password" component={ForgotPassword} />

            <Route
              path="/confirmation/:id"
              render={(props) => <Confirmation {...props} />}
            />

            {/* Protected Routes */}

            <GuardedRoute
              path="/dashboard"
              component={Dashboard}
              auth={isAuthenticated}
            />

            <GuardedRoute
              path="/admin"
              component={Admin}
              auth={isAuthenticated}
            />

            <GuardedRoute
              path="/announcements"
              component={Announcements}
              auth={isAuthenticated}
            />

            <GuardedRoute
              path="/profile"
              component={Profile}
              auth={isAuthenticated}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
