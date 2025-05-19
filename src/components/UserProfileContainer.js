import React from "react";
import { useNavigate } from "react-router-dom";
import vehicleImage from "../images/vehicle.jpg";
import hotelImage from "../images/hotel.jpg";
import guideImage from "../images/guid.jpeg";
import "../styles/UserProfileContainer.css";

const UserProfileContainer = () => {
  const navigate = useNavigate();

  const handleCardClick = (serviceType) => {
    navigate(`/service-registration?service=${serviceType}`);
  };

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
          <div className="partner-card" onClick={() => handleCardClick("VEHICLE_PROVIDER")}>
            <img src={vehicleImage} alt="Vehicle" />
            <div className="card-label">
              <h4>Register as Vehicle Provider</h4>
              <p>Connect with travelers needing transport</p>
            </div>
          </div>
          <div className="partner-card" onClick={() => handleCardClick("HOTEL_OWNER")}>
            <img src={hotelImage} alt="Hotel" />
            <div className="card-label">
              <h4>Register as Hotel Owner</h4>
              <p>List your property for global visibility</p>
            </div>
          </div>
          <div className="partner-card" onClick={() => handleCardClick("GUIDE")}>
            <img src={guideImage} alt="Guide" />
            <div className="card-label">
              <h4>Register as Guide</h4>
              <p>Offer local expertise to tourists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfileContainer;