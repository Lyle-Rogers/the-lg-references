import React from 'react';
import Axios from 'axios';

const stripeTokenHandler = (token) => {
  const paymentData = {token : token.id}

  return {"status": "success"}
}

export default stripeTokenHandler

// function stripeTokenHandler(token) {
//   const paymentData = {token: token.id};

//   // Use fetch to send the token ID and any other payment data to your server.
//   // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//   const response = await fetch('/charge', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(paymentData),
//   });

//   // Return and display the result of the charge.
//   return response.json();
// }