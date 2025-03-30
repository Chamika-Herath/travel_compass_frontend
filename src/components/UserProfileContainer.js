// src/components/UserProfileContainer.js
import React from "react";
import { useNavigate } from "react-router-dom";
import vehicleImage from "../images/hero.jpg";
import hotelImage from "../images/hero.jpg";
import guideImage from "../images/hero.jpg";
import "../styles/userprofile.css";

const UserProfileContainer = () => {
  const navigate = useNavigate();

  return (
    <div className="partner-section">
      <div className="partner-content">
        <div className="partner-text">
          <h3>"Are you a Hotel Owner, Vehicle Owner, or Guide?"</h3>
          <p>
            Provide your services through our platform and connect with travelers worldwide.
            Join us today and create your partner account to grow your business!
          </p>
        </div>

        <div className="partner-options">
          <div className="partner-card">
            <img src={vehicleImage} alt="Vehicle" />
            <button className="register-btn" onClick={() => navigate("/service-registration?service=VEHICLE_PROVIDER")}>
              Register as Vehicle Provider
            </button>
          </div>
          <div className="partner-card">
            <img src={hotelImage} alt="Hotel" />
            <button className="register-btn" onClick={() => navigate("/service-registration?service=HOTEL_OWNER")}>
              Register as Hotel Owner
            </button>
          </div>
          <div className="partner-card">
            <img src={guideImage} alt="Guide" />
            <button className="register-btn" onClick={() => navigate("/service-registration?service=GUIDE")}>
              Register as Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContainer;
