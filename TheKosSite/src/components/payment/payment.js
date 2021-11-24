import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from './Card-Minimal';

const stripePromise = loadStripe(
  "pk_test_51GrtUoHuoQnP408hk6dnSJKGungKZi3NqsYBBKhx2BJnzKpX0MMNuLOxXKTRleXogSS4tQghf4ZSsqDodxOuZZTz006S8g1HjE"
);

const Payment = (props) => {
  const handlePayment = () => {
    props.handleSuccessfulPayment()
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm handlePayment={handlePayment} />
    </Elements>
  );
}

export default Payment;