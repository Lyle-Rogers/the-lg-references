import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faMoneyBillWave,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const AccountDetailsForm = (props) => {
  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [error, setError] = useState();

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "middleName":
        setMiddleName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    if(!firstName || !middleName || !lastName || !phoneNumber){
      setError("Error: You left a field below blank.")
      return;
    }

    let data = {
      "first_name": firstName,
      "middle_name": middleName,
      "last_name": lastName,
      "phone": phoneNumber
    }

    props.handleAccountDetails(data);
  };

  return (
    <div className="CreateAccount">
      <div className="left">
        <div className="title" id="title">Account details</div>
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
            <FontAwesomeIcon className="highlight-icon" icon={faPen} id="pen-icon"/>
            <div>Respond to local petitions</div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="input-wrapper">
          <div className="input-label">First Name</div>
          <input
            type="text"
            name="firstName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Last Name</div>
          <input
            type="text"
            name="lastName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Middle Name</div>
          <input
            type="text"
            name="middleName"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="input-wrapper">
          <div className="input-label">Phone Number</div>
          <input
            type="text"
            name="phoneNumber"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="create-button" onClick={handleSubmit}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default AccountDetailsForm;
