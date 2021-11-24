import React from "react";
import image from "../../../../static/assets/images/YOI-image.jpg";

const YouthOfIsrael = ({ match }) => {
  const { path, url } = match;

  return (
    <div className="YOI-wrapper">
      <div className="top-container">
        <div className="left">
          <p className="title">Be a part of The Youth of Israel</p>
          <div className="sub-title">
            The Youth of Israel is a program that gives our teens an opportunity
            to come together, open up, learn, experience, and express themselves
            with a great support system.
          </div>
          <a href={`${url}/register`}>Register for YOI</a>
          <a href={`${url}/assistant`} className="secondary"> Sign up to be a YOI assistant</a>
        </div>
        <div className="right">
          <img src={image} alt="YOI Image" />
        </div>
      </div>
      <div className="container">
      </div>
    </div>
  );
};

export default YouthOfIsrael;
