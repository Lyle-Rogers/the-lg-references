import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import LogoInfo from "./LogoInfo";

const stripePromise = loadStripe(
  "pk_test_51GrtUoHuoQnP408hk6dnSJKGungKZi3NqsYBBKhx2BJnzKpX0MMNuLOxXKTRleXogSS4tQghf4ZSsqDodxOuZZTz006S8g1HjE"
);

export default class Register extends Component {
  render() {
    return (
      <div className="registration-container">
        {/* <RegistrationForm /> */}
        <LogoInfo />
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    );
  }
}
