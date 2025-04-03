// 



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VehiclePreview from "./VehiclePreview";
import "../styles/VehiclePage.css";

const API_BASE_URL = "http://localhost:8081/api/vehicles";

const VehiclePage = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const vehicleResponse = await fetch(`${API_BASE_URL}/${vehicleId}`);
        if (!vehicleResponse.ok) throw new Error("Failed to fetch vehicle details");
        const vehicleData = await vehicleResponse.json();
        setVehicle(vehicleData);

        // Fetch images only if the vehicle exists
        const imagesResponse = await fetch(`${API_BASE_URL}/${vehicleId}/images`);
        if (imagesResponse.ok) {
          const imageUrlsData = await imagesResponse.json();
          console.log("Fetched Image URLs:", imageUrlsData); // 🔍 Debugging
          setImageUrls(imageUrlsData);
        } else {
          console.warn("No images found for this vehicle");
        }
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

   // Delete vehicle function
   const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/${vehicleId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Vehicle deleted successfully!");
        navigate("/driver_profile"); // Redirect after deletion
      } else {
        throw new Error("Failed to delete vehicle");
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
  };

  return (
    <div className="vehicle-page">
      <div className="navbar">
        {/* Navbar Content */}
      </div>

      <div className="vehicle-preview-container">
        {loading ? (
          <p>Loading vehicle details...</p>
        ) : vehicle ? (
          <>
          <VehiclePreview vehicle={vehicle} imageUrls={imageUrls} />
          <div className="vehicle-actions">
              <button className="edit-btn" onClick={() => navigate(`/edit-vehicle/${vehicleId}`)}>Edit</button>
              <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
          </>
        ) : (
          <p>Vehicle not found.</p>
        )}
      </div>
    </div>
  );
};

export default VehiclePage;
