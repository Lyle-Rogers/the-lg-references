import React, { useContext } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";

const NavigationContainer = (props) => {
  const { user } = useContext(UserContext)

  const loggedOutLinks = () => {
    return (
      <div className="left logged-out">
        <div className="navlink-wrapper">
          <NavLink className="link" exact to="/">
            Home
          </NavLink>
        </div>

        <div className="navlink-wrapper">
          <NavLink className="link" to="/register">
            Register
          </NavLink>
        </div>
        <div className="navlink-wrapper">
          <NavLink className="link" to="/login">
            Sign In
          </NavLink>
        </div>
      </div>
    );
  };

  const loggedInLinks = () => {
    return (
      <div className="left logged-in">
         <div className="navlink-wrapper">
          <NavLink className="link" exact to="/">
            Home
          </NavLink>
        </div>
        
        <div className="navlink-wrapper">
          <NavLink className="link" exact to="/announcements">
            {/* Announcements was too big of a word */}
            Events
          </NavLink>
        </div>

        <div className="navlink-wrapper">
          <NavLink className="link" exact to="/dashboard">
            Dashboard
          </NavLink>
        </div>

        <div className="navlink-wrapper">
          <NavLink className="link" exact to="/profile">
            Profile
          </NavLink>
        </div>

        {adminLinks()}

        <div className="navlink-wrapper">
          <button className="link logout-btn" onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </div>
    );
  };

  const adminLinks = () => {
    if (user) {
      if (user.profile.roles === "ADMIN") {
        return (
          <div className="navlink-wrapper">
            <NavLink className="link" exact to="/admin">
              Admin
            </NavLink>
          </div>
        );
      }
    }
  };

  const handleSignOut = () => {
    Cookies.remove('access_token')
    window.location.reload()
  };

  return (
    <div className="navlink-container">
      {props.isAuthenticated ? loggedInLinks() : loggedOutLinks()}
    </div>
  );
};

export default withRouter(NavigationContainer);
