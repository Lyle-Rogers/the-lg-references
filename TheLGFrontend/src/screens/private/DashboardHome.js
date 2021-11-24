import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
// import ImageOne from '../../../static/assets/images/ads/ad-1.png';
import ImageTwo from '../../../static/assets/images/ads/ad-2.png';

const DashboardHome = () => {
  const subscriptionStatus = useSelector(
    (state) => state.auth.subscriptionStatus
  );
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 800px)",
  });

  return (
    <div className="all-vw">
      <div className="dashboard-header">
        <h1>Welcome to the Lebaron dashboard</h1>
        <a className="my-tickets-button" href="/dashboard/raffle/MyTickets">
          My Raffle Tickets
        </a>
        {isTabletOrMobileDevice ? <h3>Click <FontAwesomeIcon icon={faBars}/> at the top to open the menu.</h3> : null}
        <h3><a href="/dashboard/home">Click Here</a> to go to home page.</h3>
        {subscriptionStatus.Error ? (
          <div>
            Your Subscription Needs Updating. Click{" "}
            <Link to="/dashboard/profile/">Here</Link> to Update Now
          </div>
        ) : null}
      </div>
      <div className="ads">
        {/* <div className="ad">
          <img src={ImageOne} alt="ad" />
        </div> */}
        <div className="ad">
          <img src={ImageTwo} alt="ad" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
