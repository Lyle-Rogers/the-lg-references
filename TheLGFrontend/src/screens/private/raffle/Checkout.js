import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_live_k0aK8nc2yrbiDGxw2LfspiU900HFQ6M8ML"
);

export default class Checkout extends Component {
  render() {
    return (
      <div className="checkout-wrapper">
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    );
  }
}
