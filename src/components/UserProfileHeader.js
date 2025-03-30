// src/components/UserProfileHeader.js
import React from "react";
import profileImage from "../images/hero.jpg";
import "../styles/userprofile.css";

const UserProfileHeader = ({ user, handleLogout }) => {
  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-left">
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-right">
          <h1>WELCOME, {user ? user.firstName : "User"}!</h1>
          <div className="profile-form-container">
            <div className="profile-form">
              <input type="text" value={user ? user.firstName + " " + user.lastName : ""} readOnly />
              <input type="email" value={user ? user.email : ""} readOnly />
              <input type="text" value={user ? user.role : "User"} readOnly />
            </div>
            <button className="edit-profile-btn">Edit Profile</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
