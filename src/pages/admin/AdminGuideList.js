import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminGuideList.css";

const AdminGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [selectedGuideId, setSelectedGuideId] = useState(null);
  const [packages, setPackages] = useState([]);

  // Fetch all guides
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/guides/all")
      .then((res) => setGuides(res.data))
      .catch((err) => console.error("Error fetching guides:", err));
  }, []);

  // Fetch packages of selected guide
  const fetchPackages = (guideId) => {
    axios
      .get(`http://localhost:8081/api/guide-packages/guide/${guideId}`)
      .then((res) => {
        setSelectedGuideId(guideId);
        setPackages(res.data);
      })
      .catch((err) => console.error("Error fetching packages:", err));
  };

  // Delete guide
  const deleteGuide = (guideId) => {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      axios
        .delete(`http://localhost:8081/api/guides/delete/${guideId}`)
        .then(() => {
          alert("Guide deleted successfully");
          setGuides(guides.filter((g) => g.id !== guideId));
          if (selectedGuideId === guideId) {
            setPackages([]);
            setSelectedGuideId(null);
          }
        })
        .catch((err) => console.error("Error deleting guide:", err));
    }
  };

  return (
    <div className="admin-guidelist-container">
      <h2 className="admin-guidelist-heading">All Guides</h2>
      <table className="admin-guidelist-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>License</th>
            <th>Expertise</th>
            <th>Languages</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guides.map((guide) => (
            <tr key={guide.id}>
              <td>{guide.id}</td>
              <td>{guide.userId}</td>
              <td>{guide.licenseNumber}</td>
              <td>{guide.areasOfExpertise}</td>
              <td>{guide.languagesSpoken}</td>
              <td>{guide.verified ? "Yes" : "No"}</td>
              <td className="admin-guidelist-actions">
                <button
                  className="admin-guidelist-btn view"
                  onClick={() => fetchPackages(guide.id)}
                >
                  View Packages
                </button>
                <button
                  className="admin-guidelist-btn delete"
                  onClick={() => deleteGuide(guide.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGuideId && (
        <div className="admin-guidelist-packages">
          <h3>Packages for Guide ID: {selectedGuideId}</h3>
          {packages.length === 0 ? (
            <p>No packages found.</p>
          ) : (
            <ul>
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <strong>{pkg.packageName}</strong> - {pkg.location} - ${pkg.pricePerDay}/day
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminGuideList;
