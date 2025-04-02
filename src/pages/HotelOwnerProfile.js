import React from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/hotelOwnerProfile.css";
import hotelImage from "../images/hero.jpg"; // Example image

const HotelOwnerProfile = ({ user, handleLogout }) => {
  return (
    <div className="hotel-section">
      <UserProfileHeader user={user} handleLogout={handleLogout} />
      <div className="hotel-content">
        <h2>My Packages</h2>
        <div className="hotel-grid">
          <div className="hotel-card">
            <img src={hotelImage} alt="Package 01" className="hotel-image" />
            <h3>Package 01</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="hotel-update-btn">Update</button>
          </div>
          <div className="hotel-card">
            <img src={hotelImage} alt="Package 02" className="hotel-image" />
            <h3>Package 02</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="hotel-update-btn">Update</button>
          </div>
          <div className="hotel-card">
            <img src={hotelImage} alt="Package 03" className="hotel-image" />
            <h3>Package 03</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="hotel-update-btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOwnerProfile;
