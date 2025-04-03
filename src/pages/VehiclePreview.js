// 



import React from "react";
import "../styles/VehiclePreview.css";

const VehiclePreview = ({ vehicle, imageUrls }) => {
  return (
    <div className="vehicle-preview">
      <h2>{vehicle.name}</h2>
      <p>Type: {vehicle.type}</p>
      <p>License Plate: {vehicle.licensePlate}</p>
      <p>Capacity: {vehicle.capacity} passengers</p>
      <p>Fuel Type: {vehicle.fuelType}</p>
      <p>Rental Rate: ${vehicle.rentalRate} per day</p>
      <p>Location: {vehicle.location}</p>

      {/* <div className="image-gallery">
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Vehicle ${index + 1}`} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div> */}

      <div className="vehicle-images">
        <h3>Vehicle Images</h3>
        <div className="image-container">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Vehicle ${index + 1}`} />
            ))
          ) : (
            <p>No images available for this vehicle.</p>
          )}
        </div>
    </div> </div>
  );
};

export default VehiclePreview;

