import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; // Add styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Travel<span>COMPASS</span></h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/service-requests">User Requests</Link></li>
        <li><Link to="#">Hotels</Link></li>
        <li><Link to="#">Guides</Link></li>
        <li><Link to="#">Vehicles</Link></li>
        <li><Link to="#">Places</Link></li>
        <li><Link to="#">Reviews & Ratings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
