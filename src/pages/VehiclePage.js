// 



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VehiclePreview from "./VehiclePreview";
import "../styles/VehiclePage.css";

const API_BASE_URL = "http://localhost:8081/api/vehicles";

const VehiclePage = () => {
  const { vehicleId } = useParams();
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

  return (
    <div className="vehicle-page">
      <div className="navbar">
        {/* Navbar Content */}
      </div>

      <div className="vehicle-preview-container">
        {loading ? (
          <p>Loading vehicle details...</p>
        ) : vehicle ? (
          <VehiclePreview vehicle={vehicle} imageUrls={imageUrls} />
        ) : (
          <p>Vehicle not found.</p>
        )}
      </div>
    </div>
  );
};

export default VehiclePage;
