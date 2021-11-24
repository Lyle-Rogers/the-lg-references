import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class LogoInfo extends Component {
  render() {
    return (
      <div className="logo-info-wrapper">
        <div className="info">
          <p>
            Welcome and thank you for your interest in the KOS fitness challenge
            6.0.
          </p>
          <p> The entry fee is $200 USD.</p>
          <p> The entry deadline is August 7th, 2020. </p>
          <p> For more information, check out our Home page. </p>
          <h3> OR </h3>
          <p> You can contact any of the following:</p>
          <p>Adrian LeBaron JR (A.D.) - Days worked out / Website concerns: </p>
          <p> +1 (801) 835 3995 </p>
          <p> Octavio - KOS Merchandise: </p>
          <p> +1 (619) 850 1987 </p>
          <p> Gustavo - Monthly Challenges: </p>
          <p> 2252680068 </p>
          <p> Bronson Lebaron - Final Event Organizer </p>
        </div>

        <div className="downArrow bounce">
          <img
            width="40"
            height="40"
            alt=""
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDMyIDMyIiBoZWlnaHQ9IjMycHgiIGlkPSLQodC70L7QuV8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik0yNC4yODUsMTEuMjg0TDE2LDE5LjU3MWwtOC4yODUtOC4yODhjLTAuMzk1LTAuMzk1LTEuMDM0LTAuMzk1LTEuNDI5LDAgIGMtMC4zOTQsMC4zOTUtMC4zOTQsMS4wMzUsMCwxLjQzbDguOTk5LDkuMDAybDAsMGwwLDBjMC4zOTQsMC4zOTUsMS4wMzQsMC4zOTUsMS40MjgsMGw4Ljk5OS05LjAwMiAgYzAuMzk0LTAuMzk1LDAuMzk0LTEuMDM2LDAtMS40MzFDMjUuMzE5LDEwLjg4OSwyNC42NzksMTAuODg5LDI0LjI4NSwxMS4yODR6IiBmaWxsPSIjMTIxMzEzIiBpZD0iRXhwYW5kX01vcmUiLz48Zy8+PGcvPjxnLz48Zy8+PGcvPjxnLz48L3N2Zz4="
          />
        </div>
      </div>
    );
  }
}
