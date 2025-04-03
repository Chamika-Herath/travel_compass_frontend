// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import "../styles/EditVehicleForm.css";

// // const API_BASE_URL = "http://localhost:8081/api/vehicles";

// // const EditVehicleForm = () => {
// //   const { vehicleId } = useParams();
// //   const navigate = useNavigate();
// //   const [vehicle, setVehicle] = useState({
// //     name: "",
// //     type: "",
// //     licensePlate: "",
// //     description: "",
// //     capacity: "",
// //     fuelType: "",
// //     rentalRate: "",
// //     location: "",
// //   });
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchVehicleDetails = async () => {
// //       try {
// //         const response = await fetch(`${API_BASE_URL}/${vehicleId}`);
// //         if (!response.ok) throw new Error("Failed to fetch vehicle details");
// //         const data = await response.json();
// //         setVehicle(data);
// //       } catch (error) {
// //         console.error("Error fetching vehicle details:", error);
// //       }
// //     };

// //     fetchVehicleDetails();
// //   }, [vehicleId]);

// //   const handleChange = (e) => {
// //     setVehicle({ ...vehicle, [e.target.name]: e.target.value });
// //   };

// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     setError(null);

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/${vehicleId}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json",
// //         "Authorization": `Bearer ${localStorage.getItem("token")}`, // Add authentication if required
// //         },
// //         body: JSON.stringify(vehicle),
// //       });

// //       if (response.ok) {
// //         alert("Vehicle updated successfully!");
// //         navigate(`/${vehicleId}`);
// //       } else {
// //         const errorData = await response.json();
// //         throw new Error("Failed to update vehicle");
// //       }
// //     } catch (error) {
// //       console.error("Error updating vehicle:", error);
// //       setError(error.message);
// //     }
// //   };

// //   return (
// //     <div className="edit-vehicle">
// //       <h2>Edit Vehicle</h2>
// //       {error && <p className="error-message">{error}</p>}
// //       <form onSubmit={handleUpdate}>
// //         <input type="text" name="name" value={vehicle.name} onChange={handleChange} placeholder="Name" required />
// //         <input type="text" name="type" value={vehicle.type} onChange={handleChange} placeholder="Type" required />
// //         <input type="text" name="licensePlate" value={vehicle.licensePlate} onChange={handleChange} placeholder="License Plate" required />
// //         <input type="text" name="description" value={vehicle.description} onChange={handleChange} placeholder="Description" required />
// //         <input type="number" name="capacity" value={vehicle.capacity} onChange={handleChange} placeholder="Capacity" required />
// //         <input type="text" name="fuelType" value={vehicle.fuelType} onChange={handleChange} placeholder="Fuel Type" required />
// //         <input type="number" name="rentalRate" value={vehicle.rentalRate} onChange={handleChange} placeholder="Rental Rate" required />
// //         <input type="text" name="location" value={vehicle.location} onChange={handleChange} placeholder="Location" required />
// //         <button type="submit">Update Vehicle</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditVehicleForm;


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EditVehicleForm = () => {
//   const { vehicleId } = useParams();
//   const navigate = useNavigate();

//   const [vehicleData, setVehicleData] = useState({
//     name: "",
//     type: "",
//     licensePlate: "",
//     description: "",
//     capacity: "",
//     fuelType: "",
//     rentalRate: "",
//     location: "",
//     images: [], // Existing images from backend
//     newImages: {}, // Stores updated images mapped by index
//   });

//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     const fetchVehicle = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/api/vehicles/${vehicleId}`);
//         const data = await response.json();

//         setVehicleData({
//           ...data,
//           images: data.imageUrls || [], // Ensure images is always an array
//           newImages: {}, // Initialize empty object for new images
//         });
//       } catch (error) {
//         console.error("Error fetching vehicle details:", error);
//         setVehicleData((prevState) => ({ ...prevState, images: [] }));
//       }
//     };

//     fetchVehicle();
//   }, [vehicleId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVehicleData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle replacing an existing image
//   const handleImageReplace = (index, file) => {
//     setVehicleData((prevState) => ({
//       ...prevState,
//       newImages: {
//         ...prevState.newImages,
//         [index]: file,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("name", vehicleData.name);
//     formData.append("type", vehicleData.type);
//     formData.append("licensePlate", vehicleData.licensePlate);
//     formData.append("description", vehicleData.description);
//     formData.append("capacity", vehicleData.capacity);
//     formData.append("fuelType", vehicleData.fuelType);
//     formData.append("rentalRate", vehicleData.rentalRate);
//     formData.append("location", vehicleData.location);

//     // Append new images mapped to old ones
//     Object.entries(vehicleData.newImages).forEach(([index, file]) => {
//       formData.append(`updatedImages[${index}]`, file);
//     });

//     try {
//       const response = await fetch(`http://localhost:8081/api/vehicles/update/${vehicleId}`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Vehicle updated successfully!");
//         navigate("/vehicle-list");
//       } else {
//         const errorMessage = await response.text();
//         alert("Error: " + errorMessage);
//       }
//     } catch (error) {
//       console.error("Error updating vehicle data:", error);
//       alert("Failed to update vehicle.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="vform-container">
//       <form className="vehicle-registration-form" onSubmit={handleSubmit}>
//         <h2>Edit Vehicle</h2>

//         <input type="text" name="name" value={vehicleData.name} onChange={handleChange} placeholder="Vehicle Name/Model" required />

//         <select name="type" value={vehicleData.type} onChange={handleChange} required>
//           <option value="">Select Vehicle Type</option>
//           <option value="car">Car</option>
//           <option value="van">Van</option>
//           <option value="suv">SUV</option>
//           <option value="motorcycle">Motorcycle</option>
//         </select>

//         <input type="text" name="licensePlate" value={vehicleData.licensePlate} onChange={handleChange} placeholder="License Plate Number" required />

//         <textarea name="description" value={vehicleData.description} onChange={handleChange} placeholder="Description of the vehicle" required />

//         <input type="number" name="capacity" value={vehicleData.capacity} onChange={handleChange} placeholder="Capacity (Passengers)" required />

//         <select name="fuelType" value={vehicleData.fuelType} onChange={handleChange} required>
//           <option value="">Select Fuel Type</option>
//           <option value="petrol">Petrol</option>
//           <option value="diesel">Diesel</option>
//           <option value="electric">Electric</option>
//           <option value="hybrid">Hybrid</option>
//         </select>

//         <input type="number" name="rentalRate" value={vehicleData.rentalRate} onChange={handleChange} placeholder="Rental Rate per 1Km" required />

//         <input type="text" name="location" value={vehicleData.location} onChange={handleChange} placeholder="Pickup/Drop-off Location" required />

//         <h3>Current Images</h3>
//         <div className="image-previews-container">
//           {vehicleData.images.map((image, index) => (
//             <div key={index} className="image-preview">
//               <img src={vehicleData.newImages[index] ? URL.createObjectURL(vehicleData.newImages[index]) : image} alt={`Preview ${index + 1}`} className="preview-img" />
              
//               <label className="edit-image-label">
//                 Replace Image
//                 <input type="file" accept="image/*" onChange={(e) => handleImageReplace(index, e.target.files[0])} />
//               </label>
//             </div>
//           ))}
//         </div>

//         <button type="submit" disabled={uploading}>{uploading ? "Updating..." : "Update Vehicle"}</button>
//       </form>
//     </div>
//   );
// };

// export default EditVehicleForm;

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

