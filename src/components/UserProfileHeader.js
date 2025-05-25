


import React, { useState, useEffect } from "react";
import profileImage from "../images/1.png";
import "../styles/UserProfileHeader.css";

const UserProfileHeader = ({ user, handleLogout, handleUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic, setProfilePic] = useState(profileImage);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize form fields with user data
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  // Handle Profile Image Change (UI-only for now)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePic(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle Profile Update
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update parent component with new data
      if (handleUpdateUser) {
        handleUpdateUser(data);
      }

      setSuccess("Profile updated successfully!");
      setError("");
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

    try {
      // Debug: Confirm user ID
    console.log("Deleting user ID:", user.id); // ✅ Add this line

      const response = await fetch(`http://localhost:8081/api/users/${user.id}/delete`, {
        method: "DELETE",
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error("Failed to delete account");
      }

      // Logout and redirect
      handleLogout();
      window.location.href = "/login";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-left">
          <img src={profilePic} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-right">
          <h1>WELCOME, {user?.firstName || "User"}!</h1>
          <div className="profile-form-container">
            <div className="profile-form">
              <input 
                type="text" 
                value={`${firstName} ${lastName}`} 
                readOnly 
              />
              <input 
                type="email" 
                value={user?.email || ""} 
                readOnly 
              />
              <input 
                type="text" 
                value={user?.role || "User"} 
                readOnly 
              />
            </div>
            <button 
              className="edit-profile-btn" 
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-profile-popup">
          <div className="popup-content">
            <h2>Edit Profile</h2>
            
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <label>Profile Picture:</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
            />

            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <div className="popup-buttons">
              <button onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button 
                onClick={handleDeleteAccount} 
                className="delete-btn"
              >
                Delete Account
              </button>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setError("");
                  setSuccess("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

UserProfileHeader.defaultProps = {
  handleUpdateUser: null
};

export default UserProfileHeader;


