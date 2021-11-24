import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import stripeTokenHandler from "./CheckoutForm";
import FloatingInput from "../elements/Input_Floating";
import { useState } from "react";
import Axios from "axios";
import Spinner from "../spinners/spinner";
import CircleSpinner from "../spinners/circle-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutForm({ handlePayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [processing, setProccessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState("");

  const handleInput = (input_name, input_val) => {
    if (input_name === "Address") {
      setAddress(input_val);
    } else if (input_name === "City") {
      setCity(input_val);
    } else if (input_name === "State") {
      setState(input_val);
    } else if (input_name === "Name") {
      setName(input_val);
    }
  };

  const handleSubmit = async (event) => {
    setProccessing(true);

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();


    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const client_secret = await Axios.get("http://127.0.0.1:8000/api/stripe/", {
      params: {
        price: 20600,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: card,
        billing_details: {
          address: {
            line1: address,
            city: city,
            state: state,
          },
          name: name,
        },
      },
    });
   
    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        handlePayment();
        setSubmitted(true)
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="Payment-Form">
      <div className="payment-header">Payment Form</div>
      <div className={processing ? "payment-body hide" : "payment-body"}>
        <div className="billing">
          <div className="billing-body">
            <FloatingInput
              className="item-1"
              label="Name"
              placeholder="Name on card"
              handleInput={handleInput}
              required={true}
            />
            <FloatingInput
              className="item-1"
              placeholder="185 Berry St"
              label="Address"
              handleInput={handleInput}
              required={true}
            />
            <FloatingInput
              label="City"
              placeholder="Salt Lake City"
              handleInput={handleInput}
              required={true}
            />
            <FloatingInput
              label="State"
              placeholder="UT"
              handleInput={handleInput}
              required={true}
            />
          </div>
        </div>
        <div className="payment-info">
          <CardSection />
        </div>
        <div className="payment-button-container">
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="payment-button"
            disabled={!stripe}
          >
            Pay $206
          </button>
        </div>
      </div>
      <div
        className={
          processing ? "proccessing-container" : "proccessing-container hide"
        }
      >
        {submitted ? (
          <div className="submission-success">
            <FontAwesomeIcon icon={faCheckCircle} className="submission-icon" />
            <div className="submission-text">Payment Has Been Successfully Submitted.</div>
          </div>
        ) : (
          <CircleSpinner />
        )}
      </div>
    </form>
  );
}
