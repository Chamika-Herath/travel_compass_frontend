import React from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/guideProfile.css";
import guideImage from "../images/hero.jpg"; // Example image

const GuideProfile = ({ user, handleLogout }) => {
  return (
    <div className="guide-section">
      <UserProfileHeader user={user} handleLogout={handleLogout} />
      <div className="guide-content">
        <h2>My Tour Packages</h2>
        <div className="guide-grid">
          <div className="guide-card">
            <img src={guideImage} alt="Tour Package 01" className="guide-image" />
            <h3>Tour Package 01</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="guide-update-btn">Update</button>
          </div>
          <div className="guide-card">
            <img src={guideImage} alt="Tour Package 02" className="guide-image" />
            <h3>Tour Package 02</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="guide-update-btn">Update</button>
          </div>
          <div className="guide-card">
            <img src={guideImage} alt="Tour Package 03" className="guide-image" />
            <h3>Tour Package 03</h3>
            <a href="#">Update and view</a>
            <p>✔ Availability</p>
            <button className="guide-update-btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
