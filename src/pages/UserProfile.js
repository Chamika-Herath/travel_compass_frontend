// import React from "react";
// import "../styles/userprofile.css";
// import profileImage from "../images/hero.jpg"; // Profile Image
// import vehicleImage from "../images/hero.jpg"; // Vehicle Service
// import hotelImage from "../images/hero.jpg"; // Hotel Service
// import guideImage from "../images/hero.jpg"; // Guide Service

// const UserProfile = () => {
//   return (
//     <div className="profile-container">
//       {/* Profile Section */}
//       <div className="profile-header">
//         <div className="profile-header-content">
//           <div className="profile-left">
//             <img src={profileImage} alt="Profile" className="profile-image" />
//           </div>
//           <div className="profile-right">
//             <h1>WELCOME ,VISAL</h1>
//             <div className="profile-form-container">
//               <div className="profile-form">
//                 <input type="text" value="Hi Visal" readOnly />
//                 <input type="email" value="visal@borumail.com" readOnly />
//                 <input type="text" value="user" readOnly />
//               </div>
//               <button className="edit-profile-btn">Edit profile</button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Partner Section */}
//       <div className="partner-section">
//         <div className="partner-content">
//           <div className="partner-text">
//             <h3>"Are you a Hotel Owner, Vehicle Owner, or Guide?"</h3>
//             <p>
//               Provide your services through our platform and connect with travelers worldwide.
//               Join us today and create your partner account to grow your business!
//             </p>
//           </div>
//           <div className="partner-options">
//             <div className="partner-card">
//               <img src={vehicleImage} alt="Vehicle" />
//               <button className="register-btn">Register now</button>
//             </div>
//             <div className="partner-card">
//               <img src={hotelImage} alt="Hotel" />
//               <button className="register-btn">Register now</button>
//             </div>
//             <div className="partner-card">
//               <img src={guideImage} alt="Guide" />
//               <button className="register-btn">Register now</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/userprofile.css";
import profileImage from "../images/hero.jpg"; // Profile Image
import vehicleImage from "../images/hero.jpg"; // Vehicle Service
import hotelImage from "../images/hero.jpg"; // Hotel Service
import guideImage from "../images/hero.jpg"; // Guide Service

const UserProfile = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = 1; // Replace this with dynamic user ID from session/auth
  const navigate = useNavigate();

  // Function to handle service request
  const requestService = async (serviceType) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/service-request/request",
        null, 
        { params: { userId, serviceType } }
      );
      setMessage(response.data);
      setError("");
    } catch (err) {
      setError("Failed to submit request. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-left">
            <img src={profileImage} alt="Profile" className="profile-image" />
          </div>
          <div className="profile-right">
            <h1>WELCOME, VISAL</h1>
            <div className="profile-form-container">
              <div className="profile-form">
                <input type="text" value="Hi Visal" readOnly />
                <input type="email" value="visal@borumail.com" readOnly />
                <input type="text" value="user" readOnly />
              </div>
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Section */}
      <div className="partner-section">
        <div className="partner-content">
          <div className="partner-text">
            <h3>"Are you a Hotel Owner, Vehicle Owner, or Guide?"</h3>
            <p>
              Provide your services through our platform and connect with travelers worldwide.
              Join us today and create your partner account to grow your business!
            </p>
          </div>
          
          {/* Service Request Buttons */}
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

      {/* Success/Error Messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserProfile;
