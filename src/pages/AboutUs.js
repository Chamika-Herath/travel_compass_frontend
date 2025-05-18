import React from "react";
import "../styles/AboutUs.css";
import logo from "../images/Travel COMPASS 2.png";

const AboutUs = () => {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <div className="logo-section">
          <img src={logo} alt="Travel Compass Logo" className="about-logo" />
        </div>
        <div className="description-section">
          <h1>About <span className="highlight">Travel Compass</span></h1>
          <p>
            <strong>Travel Compass</strong> is your smart companion for planning budget-friendly
            and unforgettable journeys across Sri Lanka.
          </p>
          <p>
            Our AI-powered platform customizes travel packages based on your preferences,
            budget, and travel duration—making planning easy, fast, and stress-free.
          </p>
          <p>
            From cozy hotels to professional guides and reliable transport, we connect you
            with trusted service providers so you can enjoy more and spend less.
          </p>
          <p className="mission">
            <em>Let’s plan your next journey — smarter, faster, and better.</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
