import React, { useState } from "react";
import "../styles/VehicleRegistrationForm.css";

const VehicleRegistrationForm = () => {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    type: "",
    licensePlate: "",
    description: "",
    capacity: "",
    fuelType: "",
    rentalRate: "",
    location: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false); // Track upload state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + vehicleData.images.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setVehicleData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleImageRemove = (index) => {
    setVehicleData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("name", vehicleData.name);
    formData.append("type", vehicleData.type);
    formData.append("licensePlate", vehicleData.licensePlate);
    formData.append("description", vehicleData.description);
    formData.append("capacity", vehicleData.capacity);
    formData.append("fuelType", vehicleData.fuelType);
    formData.append("rentalRate", vehicleData.rentalRate);
    formData.append("location", vehicleData.location);

    vehicleData.images.forEach((image) => {
      formData.append("files", image);
    });

    try {
      const response = await fetch("http://localhost:8081/api/vehicles/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Vehicle registered successfully!");
        setVehicleData({
          name: "",
          type: "",
          licensePlate: "",
          description: "",
          capacity: "",
          fuelType: "",
          rentalRate: "",
          location: "",
          images: [],
        });
      } else {
        const errorMessage = await response.text();
        alert("Error: " + errorMessage);
      }
    } catch (error) {
      console.error("Error submitting vehicle data:", error);
      alert("Failed to register vehicle.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="vform-container">
      <form className="vehicle-registration-form" onSubmit={handleSubmit}>
        <h2>Register Your Vehicle</h2>

        <input type="text" name="name" value={vehicleData.name} onChange={handleChange} placeholder="Vehicle Name/Model" required />

        <select name="type" value={vehicleData.type} onChange={handleChange} required>
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="van">Van</option>
          <option value="suv">SUV</option>
          <option value="motorcycle">Motorcycle</option>
        </select>

        <input type="text" name="licensePlate" value={vehicleData.licensePlate} onChange={handleChange} placeholder="License Plate Number" required />

        <textarea name="description" value={vehicleData.description} onChange={handleChange} placeholder="Description of the vehicle" required />

        <input type="number" name="capacity" value={vehicleData.capacity} onChange={handleChange} placeholder="Capacity (Passengers)" required />

        <select name="fuelType" value={vehicleData.fuelType} onChange={handleChange} required>
          <option value="">Select Fuel Type</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <input type="number" name="rentalRate" value={vehicleData.rentalRate} onChange={handleChange} placeholder="Rental Rate per 1Km" required />

        <input type="text" name="location" value={vehicleData.location} onChange={handleChange} placeholder="Pickup/Drop-off Location" required />

        <input type="file" multiple accept="image/*" onChange={handleFileChange} />

        <div className="image-previews-container">
          {vehicleData.images.map((image, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(image)} alt={`Preview ${index + 1}`} className="preview-img" />
              
              <button type="button" className="remove-image-btn" onClick={() => handleImageRemove(index)}>
                Remove
              </button>
        
            </div>
          ))}
        </div>
        <div className="Reg-button">
        <button type="submit" disabled={uploading}>{uploading ? "Registering..." : "Register Vehicle"}</button>
        </div>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;