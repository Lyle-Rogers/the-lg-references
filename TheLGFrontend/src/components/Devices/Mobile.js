import {
  faBars,
  faCaretDown,
  faCaretUp,
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import MobileSidebar from "../navigation/MobileSidebar";
import * as authActions from '../../store/actions/auth';

const Mobile = (props) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSidebar = () =>{
    setSidebarOpen(false);
  }


  const handleSignOut = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="base-mobile">
      <div className="header">
        <div className="left">
          <FontAwesomeIcon icon={faBars} className="icon" onClick={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        <div className="right">
          <FontAwesomeIcon className="user-icon" icon={faUserCircle} onClick={() => setOptionsOpen(!optionsOpen)} />
        </div>
      </div>
      <div className="body">
        <MobileSidebar isOpen={sidebarOpen} match={props.match} handleSidebar={handleSidebar} />
        <div className={optionsOpen ? "mobileOptions" : "mobileOptions collapse"}>
            <Link to="/dashboard/profile" onClick={() => setOptionsOpen(!optionsOpen)}>
              <div className="options-link">
                <FontAwesomeIcon className="options-icon" icon={faUser} />
                Profile
              </div>
            </Link>
            <div className="options-link" onClick={() => handleSignOut()}>
              <FontAwesomeIcon className="options-icon" icon={faSignOutAlt} />
              Logout
            </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Mobile;
