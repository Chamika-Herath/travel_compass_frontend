


import React from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/userprofile.css";
import vehicleImage from "../images/hero.jpg"; // Replace with actual vehicle images

const vehicles = [
  { id: 1, name: "Motorbike", image: vehicleImage },
  { id: 2, name: "Tuk Tuk", image: vehicleImage },
  { id: 3, name: "Car", image: vehicleImage },
];

const VehicleProviderProfile = ({ user, handleLogout }) => {
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
              <button className="update-btn">Update and View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default VehicleProviderProfile;
