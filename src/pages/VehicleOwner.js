


// import React from "react";
// import { useNavigate } from "react-router-dom";
// import UserProfileHeader from "../components/UserProfileHeader";
// import "../styles/userprofile.css";
// import "../styles/DriverProfile.css";
// import vehicleImage from "../images/car.jpg"; // Replace with actual vehicle images

// const vehicles = [
//   { id: 24, name: "Vehicle 1", image: vehicleImage },
//   { id: 25, name: "Vehicle 2", image: vehicleImage },
//   { id: 26, name: "Vehicle 3", image: vehicleImage },
//   { id: 27, name: "Vehicle 4", image: vehicleImage },
// ];

// const DriverProfile = ({ user, handleLogout }) => {
//   const navigate = useNavigate();

//   const handleUpdateAndView = (vehicleId) => {
//     // Navigate to the VehiclePage for the specific vehicle
//     navigate(`/vehicle-page/${vehicleId}`);
//   };
//   return (
//     <div className="vehicle-owner-profile">
//       {/* Profile Header */}
//       <UserProfileHeader user={user} handleLogout={handleLogout} />

//       {/* My Vehicles Section */}
//       <div className="vehicle-section">
//         <h2>My Vehicles</h2>
//         <div className="vehicle-grid">
//           {vehicles.map((vehicle) => (
//             <div key={vehicle.id} className="vehicle-card">
//               <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
//               <h3>{vehicle.name}</h3>
//               <button className="update-btn" onClick={() => handleUpdateAndView(vehicle.id)}>Update and View</button>
//             </div>
//           ))}
//         </div>
//         {/* Register Vehicle Button */}
//         <button className="register-btn"onClick={() => navigate("/vehicle-registration")}>Register Vehicle</button>
//       </div>
//     </div>
//   );
// };



// export default DriverProfile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/guideProfile.css";

const VehicleOwner = ({ user, handleLogout }) => {
  const [vehicles, setVehicles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [providerDetails, setProviderDetails] = useState(null);
  const [formData, setFormData] = useState({
    vehicleModel: "",
    vehicleType: "CAR",
    licensePlate: "",
    description: "",
    passengerCapacity: 4,
    fuelType: "PETROL",
    pricePerDay: "",
    pricePerKm: "",
    locationIds: [],
    available: true
  });
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingImages, setViewingImages] = useState(null);

  const VEHICLE_API = "http://localhost:8081/api/vehicle-packages";
  const PROVIDER_API = "http://localhost:8081/api/vehicle-providers";

  const fetchProviderDetails = async () => {
    try {
      const res = await axios.get(`${PROVIDER_API}/user/${user.id}`);
      setProviderDetails(res.data);
    } catch (err) {
      console.error("Error fetching provider details", err);
      if (err.response?.status === 404) {
        alert("Please complete your vehicle provider registration first!");
        window.location.href = '/vehicle-provider-registration';
      }
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${VEHICLE_API}/user/${user.id}`);
      setVehicles(res.data);
    } catch (err) {
      console.error("Error fetching vehicles", err);
      alert("Failed to load vehicles");
    }
  };

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/locations/all");
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations", err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProviderDetails();
      fetchVehicles();
      fetchLocations();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "locationIds") {
      const val = parseInt(value);
      setFormData(prev => ({
        ...prev,
        locationIds: checked
          ? [...prev.locationIds, val]
          : prev.locationIds.filter(id => id !== val)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    try {
      const payload = {
        ...formData,
        imagePaths: []
      };

      const formPayload = new FormData();
      formPayload.append("package", new Blob([JSON.stringify(payload)], { 
        type: "application/json" 
      }));
      images.forEach(file => formPayload.append("images", file));

      if (editingId) {
        await axios.put(`${VEHICLE_API}/${editingId}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        await axios.post(`${VEHICLE_API}/create/user/${user.id}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      fetchVehicles();
      resetForm();
    } catch (err) {
      console.error("Operation failed", err);
      alert(err.response?.data?.message || "Operation failed. Check console.");
    }
  };

  const resetForm = () => {
    setFormData({
      vehicleModel: "",
      vehicleType: "CAR",
      licensePlate: "",
      description: "",
      passengerCapacity: 4,
      fuelType: "PETROL",
      pricePerDay: "",
      pricePerKm: "",
      locationIds: [],
      available: true
    });
    setImages([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (vehicle) => {
    setFormData({
      vehicleModel: vehicle.vehicleModel,
      vehicleType: vehicle.vehicleType,
      licensePlate: vehicle.licensePlate,
      description: vehicle.description,
      passengerCapacity: vehicle.passengerCapacity,
      fuelType: vehicle.fuelType,
      pricePerDay: vehicle.pricePerDay,
      pricePerKm: vehicle.pricePerKm,
      locationIds: vehicle.locations.map(l => l.id),
      available: vehicle.available
    });
    setEditingId(vehicle.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle permanently?")) return;
    try {
      await axios.delete(`${VEHICLE_API}/${id}`);
      fetchVehicles();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openImageGallery = (images) => setViewingImages(images);
  const closeImageGallery = () => setViewingImages(null);

  return (
    <div className="guide-profile">
      <UserProfileHeader user={user} handleLogout={handleLogout} />

      {providerDetails && (
        <div className="guide-header">
          <h1>{providerDetails.user?.firstName}'s Vehicle Fleet</h1>
          <div className="guide-info">
            <p>Company: {providerDetails.companyName}</p>
            <p>License: {providerDetails.licenseNumber}</p>
            <p>Fleet Size: {providerDetails.fleetSize} vehicles</p>
          </div>
        </div>
      )}

      <div className="package-management">
        <div className="header-section">
          <h2>Manage Vehicles</h2>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="toggle-form-btn"
          >
            {showForm ? "Close Form" : "Add New Vehicle"}
          </button>
        </div>

        {showForm && (
          <form className="package-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Vehicle Model</label>
              <input
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="BIKE">Bike</option>
                <option value="CAR">Car</option>
                <option value="VAN">Van</option>
                <option value="THREE_WHEELER">Three Wheeler</option>
              </select>
            </div>

            <div className="form-group">
              <label>License Plate</label>
              <input
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Passenger Capacity</label>
              <input
                type="number"
                name="passengerCapacity"
                value={formData.passengerCapacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                required
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="ELECTRIC">Electric</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

            <div className="form-group">
              <label>Price Per Day ($)</label>
              <input
                type="number"
                name="pricePerDay"
                step="0.01"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Price Per Km ($)</label>
              <input
                type="number"
                name="pricePerKm"
                step="0.01"
                value={formData.pricePerKm}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group locations-group">
              <label>Service Locations</label>
              <div className="location-checkboxes">
                {locations.map(loc => (
                  <label key={loc.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      name="locationIds"
                      value={loc.id}
                      checked={formData.locationIds.includes(loc.id)}
                      onChange={handleChange}
                    />
                    {loc.name} ({loc.province})
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Vehicle Images (max 3)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div className="image-preview">
                {images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                  />
                ))}
              </div>
            </div>

            <div className="form-group availability-group">
              <label>
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                />
                Available for Booking
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingId ? "Update Vehicle" : "Add Vehicle"}
              </button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="package-list">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="package-card">
              <div className="card-header">
                <h3>{vehicle.vehicleModel}</h3>
                <span className={`status ${vehicle.available ? 'available' : 'unavailable'}`}>
                  {vehicle.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              
              {vehicle.imagePaths?.length > 0 && (
                <div className="card-images">
                  <img
                    src={`http://localhost:8081${vehicle.imagePaths[0]}`}
                    alt={vehicle.vehicleModel}
                    className="main-image"
                    onClick={() => openImageGallery(vehicle.imagePaths)}
                  />
                  {vehicle.imagePaths.length > 1 && (
                    <div 
                      className="image-count" 
                      onClick={() => openImageGallery(vehicle.imagePaths)}
                    >
                      +{vehicle.imagePaths.length - 1}
                    </div>
                  )}
                </div>
              )}

              <div className="card-details">
                <p><strong>Type:</strong> {vehicle.vehicleType}</p>
                <p><strong>License:</strong> {vehicle.licensePlate}</p>
                <p><strong>Capacity:</strong> {vehicle.passengerCapacity} passengers</p>
                <p><strong>Fuel:</strong> {vehicle.fuelType}</p>
                <p><strong>Prices:</strong> 
                  ${vehicle.pricePerDay}/day + ${vehicle.pricePerKm}/km
                </p>
                <p><strong>Locations:</strong></p>
                <ul className="location-list">
                  {vehicle.locations?.map(location => (
                    <li key={location.id}>{location.name}</li>
                  ))}
                </ul>
              </div>

              <div className="card-actions">
                <button onClick={() => handleEdit(vehicle)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => handleDelete(vehicle.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {viewingImages && (
          <div className="image-modal" onClick={closeImageGallery}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="close-btn" onClick={closeImageGallery}>×</button>
              <div className="image-gallery">
                {viewingImages.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8081${img}`}
                    alt={`Gallery ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleOwner;