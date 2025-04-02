

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/userprofile.css";
// import profileImage from "../images/hero.jpg";
// import vehicleImage from "../images/hero.jpg";
// import hotelImage from "../images/hero.jpg";
// import guideImage from "../images/hero.jpg";

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Fetch logged-in user details
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/auth/session", { withCredentials: true })
//       .then((response) => {
//         if (response.data.id) {
//           setUser(response.data);
//         } else {
//           navigate("/login"); // Redirect if not logged in
//         }
//       })
//       .catch(() => {
//         navigate("/login"); // Redirect if error occurs
//       });
//   }, [navigate]);

//   // Handle Logout
//   const handleLogout = () => {
//     axios
//       .post("http://localhost:8080/auth/logout", {}, { withCredentials: true })
//       .then(() => {
//         navigate("/login"); // Redirect to login after logout
//       })
//       .catch((error) => {
//         console.error("Logout failed:", error);
//       });
//   };

//   return (
//     <div className="profile-container">
//       {/* Profile Section */}
//       <div className="profile-header">
//         <div className="profile-header-content">
//           <div className="profile-left">
//             <img src={profileImage} alt="Profile" className="profile-image" />
//           </div>
//           <div className="profile-right">
//             <h1>WELCOME, {user ? user.firstName : "User"}!</h1>
//             <div className="profile-form-container">
//               <div className="profile-form">
//                 <input type="text" value={user ? user.firstName + " " + user.lastName : ""} readOnly />
//                 <input type="email" value={user ? user.email : ""} readOnly />
//                 <input type="text" value={user ? user.role : "User"} readOnly />
//               </div>
//               <button className="edit-profile-btn">Edit Profile</button>
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
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

//           {/* Service Request Buttons */}
//           <div className="partner-options">
//             <div className="partner-card">
//               <img src={vehicleImage} alt="Vehicle" />
//               <button className="register-btn" onClick={() => navigate("/service-registration?service=VEHICLE_PROVIDER")}>
//                 Register as Vehicle Provider
//               </button>
//             </div>
//             <div className="partner-card">
//               <img src={hotelImage} alt="Hotel" />
//               <button className="register-btn" onClick={() => navigate("/service-registration?service=HOTEL_OWNER")}>
//                 Register as Hotel Owner
//               </button>
//             </div>
//             <div className="partner-card">
//               <img src={guideImage} alt="Guide" />
//               <button className="register-btn" onClick={() => navigate("/service-registration?service=GUIDE")}>
//                 Register as Guide
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


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
