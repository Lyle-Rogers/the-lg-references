import React from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = () => {
    Axios.get("https://www.lebarongaleana-api.com/api/raffle/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("userTokenLG")}`,
      },
    }).then((res) => {
      setTickets(res.data.tickets);
    });
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="my-raffle-tickets">
      <h1>My Tickets</h1>
      <div className="raffle-tickets">
        {tickets.map((ticket) => {
          return (
            <div className="ticket-wrapper">
              <div className="ticket">
                <div className="title">Raffle Ticket</div>
                <div className="ticket-number"># {ticket.id}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyTickets;
