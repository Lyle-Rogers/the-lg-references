import React from "react";
import Axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const RaffleCheckout = () => {
  const handleSubmit = async (ID, Mode) => {
    const stripe = await loadStripe(
      "pk_live_k0aK8nc2yrbiDGxw2LfspiU900HFQ6M8ML"
    );

    Axios.post(
      "https://www.lebarongaleana-api.com/api/create-raffle-checkout-session/",
      {
        priceId: ID,
        mode: Mode,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
        },
      }
    ).then((res) => {
      stripe.redirectToCheckout({ sessionId: res.data.sessionId });
    });
  };
  return (
    <div className="raffleCheckout-wrapper">
      <div className="raffleCheckout">
        <a className="my-tickets-button" href="/dashboard/raffle/MyTickets">
          My Tickets
        </a>
        <div className="container">
          <div className="details">
            <div className="title">Lebaron Community Raffle</div>
            <div className="description">
              For more information about the raffle you are purchasing please
              visit <a href="https://youthofisrael.com/contributorsgiveaway" target="blank">HERE</a>  or Contact AD info found on
              {/* contact page. By entering this raffle you are agreeing to the
              contract found at www.chip-in-fbt.com/contrato */}
              {/* <br/> */}

            </div>
          </div>
        </div>
        <div className="container">
          <div className="options">
            <div className="option">
              <div className="title">$300 - Raffle Ticket</div>
              <button
                onClick={() =>
                  handleSubmit("price_1JEyiLHuoQnP408hj7qjIq4i", "payment")
                }
              >
                Buy Ticket
              </button>
            </div>
            {/* <div className="option">
              <div className="title">$100 A Month For 10 Months</div>
              <button
                onClick={() =>
                  handleSubmit("price_1In52vHuoQnP408hUvFf1b2k", "subscription")
                }
              >
                Select
              </button>
            </div>
            <div className="option">
              <div className="title">$1000 One Time Payment</div>
              <button
                onClick={() =>
                  handleSubmit("price_1In52vHuoQnP408hiwJnNCH1", "payment")
                }
              >
                Select
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default RaffleCheckout;
