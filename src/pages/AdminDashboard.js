import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css"; // Add styles

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Admin Dashboard</h1>
        <div className="stats">
          <div className="stat-card">Total Hotels <span>1153</span></div>
          <div className="stat-card">Total Places <span>500</span></div>
          <div className="stat-card">Total Guides <span>2000</span></div>
          <div className="stat-card">Total Vehicles <span>426</span></div>
          <div className="stat-card">Total Reviews <span>5524</span></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
