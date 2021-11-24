import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js";
import Axios from "axios";
import { Link } from "react-router-dom";

const NewSubscription = () => {
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = async (ID) => {
    const stripe = await loadStripe(
      "pk_live_k0aK8nc2yrbiDGxw2LfspiU900HFQ6M8ML"
    );

    Axios.post("https://www.lebarongaleana-api.com/api/create-checkout-session/", {
      priceId: ID,
      userId: user.id,
    }).then((res) => {
      stripe
        .redirectToCheckout({ sessionId: res.data.sessionId })
    });
  };
  return (
    <div>
      <h2 className="new-subscription-header">Select a membership option below</h2>

      <div className="Subscription">
        <div className="price-card">
          <div className="price-header">
            <div className="title">Monthly</div>
          </div>
          <div className="price-body">
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local News
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Business Directory
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Petitions
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Exchange Rate
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Blogs
            </div>
          </div>
          <div className="price-footer">
            <div className="amount">
              <div className="price">$8</div>
              <div className="time">/month</div>
            </div>
            <button
              className="price-button"
              onClick={() => handleSubmit("price_1IQgbKHuoQnP408hEJtj6fKr")}
            >
              Choose
            </button>
          </div>
        </div>
        <div className="price-card">
          <div className="price-header">
            <div className="title">Yearly</div>
          </div>
          <div className="price-body">
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local News
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Business Directory
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Petitions
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Exchange Rate
            </div>
            <div>
              <FontAwesomeIcon className="info-icon" icon={faCheckCircle} />
              Local Blogs
            </div>
          </div>
          <div className="price-footer">
            <div className="amount">
              <div className="price">$55</div>
              <div className="time">/year</div>
            </div>
            <button
              className="price-button"
              onClick={() => handleSubmit("price_1IQF0FHuoQnP408hgtRHbOah")}
            >
              Choose
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSubscription;
