import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faMoneyBillWave,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import Axios from 'axios';

const CreateAccount = (props) => {
  const [username, setUsername] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState();

  const usernameCheck = (name) =>{
    Axios.post(
      "https://www.lebarongaleana-api.com/api/username_check/",
      {
        username: name
      },
    ).then((res) => {
        if(res.data.Status === "Taken"){
          setUsernameTaken(true);
          setError("Username Is Taken")
        } else {
          setUsernameTaken(false);
        }
      })
  }

  const handleChange = (e) => {
    setError()

    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        usernameCheck(e.target.value)
        break;
      case "email":
        setEmail(e.target.value);
      case "password":
        setPassword(e.target.value);
      case "confirmPassword":
        setConfirmPassword(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Error: You left a field below blank.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Error: Password's Don't Match");
      return;
    }

    if (agreement === false) {
      setError("Error: Privacy Policy Checkbox Not Checked");
      return;
    }

    if(error){
      return;
    }

    let data = {
      username: username,
      email: email,
      password: password,
    };

    props.handleCreateAccount(data);
  };

  return (
    <div className="CreateAccount">
      <div className="left">
        <div className="title">Create an account</div>
        <div className="highlights">
          <div className="highlight">
            <FontAwesomeIcon className="highlight-icon" icon="info-circle" />
            <div>Access to instant information about your community.</div>
          </div>
          <div className="highlight">
            <FontAwesomeIcon className="highlight-icon" icon="address-book" />
            <div>Business Directory</div>
          </div>
          <div className="highlight">
            <FontAwesomeIcon
              className="highlight-icon"
              icon={faMoneyBillWave}
            />
            <div>View Exchange Rates</div>
          </div>
          <div className="highlight">
            <FontAwesomeIcon className="highlight-icon" icon={faBlog} />
            <div>Blog's for the latest information</div>
          </div>
          <div className="highlight">
            <FontAwesomeIcon className="highlight-icon" icon={faPen} id="pen-icon" />
            <div>Respond to local petitions</div>
          </div>
        </div>
      </div>
      <div className="right">
        {error ? <div className="error">{error}</div> : null}
        <div className="input-wrapper">
          <div className="input-label">Username</div>
          <input
            type="text"
            name="username"
            className={usernameTaken ? "usernameTaken" : null}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Email</div>
          <input type="text" name="email" onChange={(e) => handleChange(e)} />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Password</div>
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Confirm Password</div>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="agreement">
          <input
            type="checkbox"
            onClick={() => setAgreement(!agreement)}
            checked={agreement}
          />
          <label>
            I have read and understand the
            <a
              href="https://www.privacypolicygenerator.info/live.php?token=jPvI8N4quWh5kzHSBULDNhTyxgLxH0jH"
              target="_blank"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        <div className="agreement-2">
          By creating an account, I am agreeing to the responsibility of being
          involved in our commmunity and voting on important decisions.
        </div>
        <button className="create-button" onClick={() => handleSubmit()}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
