import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditVehicleForm.css";

const API_BASE_URL = "http://localhost:8081/api/vehicles";

const EditVehicleForm = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    name: "",
    type: "",
    licensePlate: "",
    description: "",
    capacity: "",
    fuelType: "",
    rentalRate: "",
    location: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${vehicleId}`, {
          headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch vehicle details");
        const data = await response.json();
        setVehicle(data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
        setError("Error loading vehicle details.");
      }
    };

    fetchVehicleDetails();
  }, [vehicleId]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(vehicle),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update vehicle");
      }

      alert("Vehicle updated successfully!");
      navigate("/vehicle-list");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-vehicle">
      <h2>Edit Vehicle</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" value={vehicle.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="type" value={vehicle.type} onChange={handleChange} placeholder="Type" required />
        <input type="text" name="licensePlate" value={vehicle.licensePlate} onChange={handleChange} placeholder="License Plate" required />
        <textarea name="description" value={vehicle.description} onChange={handleChange} placeholder="Description" required />
        <input type="number" name="capacity" value={vehicle.capacity} onChange={handleChange} placeholder="Capacity" required />
        <input type="text" name="fuelType" value={vehicle.fuelType} onChange={handleChange} placeholder="Fuel Type" required />
        <input type="number" name="rentalRate" value={vehicle.rentalRate} onChange={handleChange} placeholder="Rental Rate" required />
        <input type="text" name="location" value={vehicle.location} onChange={handleChange} placeholder="Location" required />
        <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update Vehicle"}</button>
      </form>
    </div>
  );
};

export default EditVehicleForm;

