import React from "react";
import "../styles/AboutUs.css"; // Make sure this path matches your file structure
import logo from "../images/hero.jpg"; // Replace with your actual logo path

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="logo-section">
        <img src={logo} alt="Travel Compass Logo" className="about-logo" />
      </div>
      <div className="description-section">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Travel Compass</strong>, your smart companion for planning
          budget-friendly trips across Sri Lanka. We believe that travel should be
          simple, personal, and affordable—so we created a platform that brings
          all your travel needs into one place.
        </p>
        <p>
          Our AI-powered system helps you find the best travel packages based on
          your budget, destination, and travel dates. Whether you're looking for
          cozy hotels, experienced tour guides, or reliable transport, Travel
          Compass connects you with the right service providers—quickly and easily.
        </p>
        <p>
          We’re here to make trip planning stress-free and exciting, helping
          travelers explore more and spend less.
        </p>
        <p>
          <strong>Let’s plan your next journey—smarter, faster, and better!</strong>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
