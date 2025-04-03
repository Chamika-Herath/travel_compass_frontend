


import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/userprofile.css";
import "../styles/DriverProfile.css";
import vehicleImage from "../images/hero.jpg"; // Replace with actual vehicle images

const vehicles = [
  { id: 21, name: "Car", image: vehicleImage },
  { id: 2, name: "Van", image: vehicleImage },
  { id: 3, name: "Tuk Tuk", image: vehicleImage },
  { id: 4, name: "Motor Bike", image: vehicleImage },
];

const VehicleProviderProfile = ({ user, handleLogout }) => {
  const navigate = useNavigate();

  const handleUpdateAndView = (vehicleId) => {
    // Navigate to the VehiclePage for the specific vehicle
    navigate(`/vehicle-page/${vehicleId}`);
  };
  return (
    <div className="vehicle-owner-profile">
      {/* Profile Header */}
      <UserProfileHeader user={user} handleLogout={handleLogout} />

      {/* My Vehicles Section */}
      <div className="vehicle-section">
        <h2>My Vehicles</h2>
        <div className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="vehicle-card">
              <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
              <h3>{vehicle.name}</h3>
              <button className="update-btn" onClick={() => handleUpdateAndView(vehicle.id)}>Update and View</button>
            </div>
          ))}
        </div>
        {/* Register Vehicle Button */}
        <button className="register-btn"onClick={() => navigate("/vehicle-registration")}>Register Vehicle</button>
      </div>
    </div>
  );
};



export default VehicleProviderProfile;
