// src/pages/UserProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/userprofile.css";
import UserProfileHeader from "../components/UserProfileHeader";
import UserProfileContainer from "../components/UserProfileContainer";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/auth/session", { withCredentials: true })
      .then((response) => {
        if (response.data.id) {
          setUser(response.data);
        } else {
          navigate("/login");
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    axios
      .post("http://localhost:8081/auth/logout", {}, { withCredentials: true })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <div className="profile-container">
      <UserProfileHeader user={user} handleLogout={handleLogout} />
      <UserProfileContainer />
    </div>
  );
};

export default UserProfile;
