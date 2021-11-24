import Axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import Payment from "../payment/payment";
import SlideCard from "../elements/Slide_Card";
import UploadPayment from "../payment/UploadPayment";
import CircleSpinner from "../spinners/circle-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [feet, setFeet] = useState();
  const [inches, setInches] = useState();
  const [weight, setWeight] = useState();
  const [size, setSize] = useState();
  const [submission, setSubmission] = useState("");

  const handleUploadPayment = (image) => {
    setSubmission("pending");
    Axios.put(
      "http://127.0.0.1:8000/api/update-user/",
      {
        registration: true,
        PUT_TYPE: "Payment",
        PAYMENT_TYPE: "Other",
        imgData: image,
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get("access_token")}`,
        },
      }
    ).then(() => {
      setSubmission("complete");
      setTimeout(() => location.reload(), 2000);
    });
  };

  const handleSuccessfulPayment = () => {
    Axios.put(
      "http://127.0.0.1:8000/api/update-user/",
      {
        registration: true,
        PUT_TYPE: "Payment",
        PAYMENT_TYPE: "Card",
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get("access_token")}`,
        },
      }
    ).then(() => {
      setTimeout(() => location.reload(), 2000);
    });
  };

  const handleSubmit = () => {
    let height = 0;
    if (feet) {
      height = feet * 12;
    } else {
      height = Math.floor(user.profile.height / 12) * 12;
    }
    if (inches) {
      height = +height + +inches;
    } else {
      height =
        +height +
        (+user.profile.height - Math.floor(user.profile.height / 12) * 12);
    }

    Axios.put(
      "http://127.0.0.1:8000/api/update-user/",
      {
        PUT_TYPE: "Update",
        height: height,
        weight: weight ? weight : user.profile.weight,
        shirt_size: size ? size : user.profile.shirt_size,
      },
      {
        headers: {
          Authorization: `Token ${Cookies.get("access_token")}`,
        },
      }
    ).then((res) => {
      window.location.reload();
    });
  };

  if (user) {
    return (
      <div className="profile-container">
        <div className="profile">
          <div>
            <div className="profile-header">Profile</div>
            <div className="form">
              <div className="height">
                <div className="input-container">
                  <div className="form-input">
                    <label htmlFor="">Feet:</label>
                    <input
                      className="profile-input"
                      placeholder="Enter Here"
                      value={
                        feet != null
                          ? feet
                          : Math.floor(user.profile.height / 12)
                      }
                      onChange={(event) => setFeet(event.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor="">Inches:</label>
                    <input
                      className="profile-input"
                      placeholder="Enter Here"
                      value={
                        inches != null
                          ? inches
                          : user.profile.height -
                            Math.floor(user.profile.height / 12) * 12
                      }
                      onChange={(event) => setInches(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="input-container">
                <div className="form-input">
                  <label htmlFor="">Weight:</label>
                  <input
                    className="profile-input"
                    type="text"
                    placeholder="Enter Here"
                    value={weight != null ? weight : user.profile.weight}
                    onChange={(event) => setWeight(event.target.value)}
                  />
                </div>
                <div className="form-input">
                  <label htmlFor="">Shirt Size:</label>
                  <select
                    className="profile-input"
                    onChange={(event) => setSize(event.target.value)}
                  >
                    <option
                      value="SMALL"
                      selected={
                        user.profile.shirt_size === "SMALL" ? true : false
                      }
                    >
                      Small
                    </option>
                    <option
                      value="MEDIUM"
                      selected={
                        user.profile.shirt_size === "MEDIUM" ? true : false
                      }
                    >
                      Medium
                    </option>
                    <option
                      value="LARGE"
                      selected={
                        user.profile.shirt_size === "LARGE" ? true : false
                      }
                    >
                      Large
                    </option>
                    <option
                      value="EXTRA-LARGE"
                      selected={
                        user.profile.shirt_size === "EXTRA-LARGE" ? true : false
                      }
                    >
                      Extra-Large
                    </option>
                  </select>
                </div>
              </div>

              <div className="button-container">
                <button onClick={handleSubmit} className="form-button">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {user.profile.registration === false ? (
          <div className="registration">
            <div className="pr-form">
              <div className="pr-header">Register for new season</div>
              <div className="pr-body">
                <SlideCard title={"Pay With Card"}>
                  <Payment handleSuccessfulPayment={handleSuccessfulPayment} />
                </SlideCard>
                <SlideCard title={"Cash App/Venmo/Other"}>
                  {submission === "complete" ? (
                    <div className="submission-success">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="submission-icon"
                      />
                      <div className="submission-text">
                        Payment Has Been Successfully Submitted.
                      </div>
                    </div>
                  ) : null}
                  {submission === "pending" ? (
                    <div className="submission-pending">
                      <CircleSpinner />
                    </div>
                  ) : null}
                  {submission === "" ? (
                    <UploadPayment
                      handleUploadPayment={(image) =>
                        handleUploadPayment(image)
                      }
                    />
                  ) : null}
                </SlideCard>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;
