




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import UserProfileHeader from "../components/UserProfileHeader";
// import "../styles/guideProfile.css";

// const GuideProfile = ({ user, handleLogout }) => {
//   const [packages, setPackages] = useState([]);
//   const [formData, setFormData] = useState({
//     packageName: "",
//     location: "",
//     places: "",
//     pricePerDay: "",
//     available: true
//   });
//   const [images, setImages] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const BASE_URL = "http://localhost:8081/api/guide-packages";

//   const fetchPackages = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/guide/${user.id}`);
//       setPackages(res.data);
//     } catch (err) {
//       console.error("Error fetching packages", err);
//     }
//   };

//   useEffect(() => {
//     if (user?.id) fetchPackages();
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const selectedFiles = Array.from(e.target.files).slice(0, 3); // Only keep max 3
//     setImages(selectedFiles);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...formData,
//       places: formData.places.split(",").map(p => p.trim())
//     };

//     if (editingId) {
//       try {
//         await axios.put(`${BASE_URL}/update/${editingId}`, payload);
//         fetchPackages();
//         resetForm();
//       } catch (err) {
//         console.error("Error updating package", err);
//       }
//     } else {
//       const formPayload = new FormData();
//       formPayload.append("package", new Blob([JSON.stringify(payload)], { type: "application/json" }));
//       images.forEach((file) => formPayload.append("images", file));

//       try {
//         await axios.post(`${BASE_URL}/create/${user.id}`, formPayload, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//         fetchPackages();
//         resetForm();
//       } catch (err) {
//         console.error("Error creating package", err);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       packageName: "",
//       location: "",
//       places: "",
//       pricePerDay: "",
//       available: true
//     });
//     setImages([]);
//     setEditingId(null);
//     setShowForm(false);
//   };

//   const handleEdit = (pkg) => {
//     setFormData({
//       packageName: pkg.packageName,
//       location: pkg.location,
//       places: pkg.places.join(", "),
//       pricePerDay: pkg.pricePerDay,
//       available: pkg.available
//     });
//     setEditingId(pkg.id);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete/${id}`);
//       fetchPackages();
//     } catch (err) {
//       console.error("Error deleting package", err);
//     }
//   };

//   return (
//     <div className="guide-section">
//       <UserProfileHeader user={user} handleLogout={handleLogout} />

//       <div className="guide-content">
//         <div className="header-row">
//           <h2>My Tour Packages</h2>
//           <button onClick={() => setShowForm(true)} className="add-package-btn">
//             {editingId ? "Edit Package" : "Add Package"}
//           </button>
//         </div>

//         {showForm && (
//           <form className="package-form" onSubmit={handleSubmit}>
//             <label>Package Name:
//               <input name="packageName" value={formData.packageName} onChange={handleChange} required />
//             </label>

//             <label>Location:
//               <input name="location" value={formData.location} onChange={handleChange} required />
//             </label>

//             <label>Places (comma separated):
//               <input name="places" value={formData.places} onChange={handleChange} required />
//             </label>

//             <label>Price Per Day:
//               <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required />
//             </label>

//             <label>Images (max 3):
//               <input type="file" accept="image/*" multiple onChange={handleImageChange} />
//             </label>

//             <label className="availability">
//               Available:
//               <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
//             </label>

//             <div className="form-buttons">
//               <button type="submit">{editingId ? "Update" : "Create"}</button>
//               <button type="button" onClick={resetForm}>Cancel</button>
//             </div>
//           </form>
//         )}

//         <div className="guide-grid">
//           {packages.map(pkg => (
//             <div key={pkg.id} className="guide-card">
//               <h3>{pkg.packageName}</h3>
//               <p><strong>Location:</strong> {pkg.location}</p>
//               <p><strong>Places:</strong> {pkg.places.join(", ")}</p>
//               <p><strong>Price per day:</strong> ${pkg.pricePerDay}</p>
//               <p><strong>Status:</strong> {pkg.available ? "Available" : "Not Available"}</p>

//               {pkg.imagePaths?.length > 0 && (
//                 <div className="image-preview">
//                   {pkg.imagePaths.map((img, index) => (
//                     <img key={index} src={`http://localhost:8081${img}`} alt={`Package ${index}`} className="thumbnail" />
//                   ))}
//                 </div>
//               )}

//               <div className="card-buttons">
//                 <button onClick={() => handleEdit(pkg)}>Edit</button>
//                 <button onClick={() => handleDelete(pkg.id)} className="delete-btn">Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuideProfile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/guideProfile.css";

const GuideProfile = ({ user, handleLogout }) => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    packageName: "",
    location: "",
    places: "",
    pricePerDay: "",
    available: true
  });
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingImages, setViewingImages] = useState(null);

  const BASE_URL = "http://localhost:8081/api/guide-packages";

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/guide/${user.id}`);
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages", err);
    }
  };

  useEffect(() => {
    if (user?.id) fetchPackages();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 3); // Only keep max 3
    setImages(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      places: formData.places.split(",").map(p => p.trim())
    };

    if (editingId) {
      try {
        await axios.put(`${BASE_URL}/update/${editingId}`, payload);
        fetchPackages();
        resetForm();
      } catch (err) {
        console.error("Error updating package", err);
      }
    } else {
      const formPayload = new FormData();
      formPayload.append("package", new Blob([JSON.stringify(payload)], { type: "application/json" }));
      images.forEach((file) => formPayload.append("images", file));

      try {
        await axios.post(`${BASE_URL}/create/${user.id}`, formPayload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        fetchPackages();
        resetForm();
      } catch (err) {
        console.error("Error creating package", err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      packageName: "",
      location: "",
      places: "",
      pricePerDay: "",
      available: true
    });
    setImages([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (pkg) => {
    setFormData({
      packageName: pkg.packageName,
      location: pkg.location,
      places: pkg.places.join(", "),
      pricePerDay: pkg.pricePerDay,
      available: pkg.available
    });
    setEditingId(pkg.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package", err);
    }
  };

  const openImageViewer = (images) => {
    setViewingImages(images);
  };

  const closeImageViewer = () => {
    setViewingImages(null);
  };

  return (
    <div className="guide-section">
      <UserProfileHeader user={user} handleLogout={handleLogout} />

      <div className="guide-content">
        <div className="header-row">
          <h2>My Tour Packages</h2>
          <button onClick={() => setShowForm(true)} className="add-package-btn">
            {editingId ? "Edit Package" : "Add Package"}
          </button>
        </div>

        {showForm && (
          <form className="package-form" onSubmit={handleSubmit}>
            <label>Package Name:
              <input name="packageName" value={formData.packageName} onChange={handleChange} required />
            </label>

            <label>Location:
              <input name="location" value={formData.location} onChange={handleChange} required />
            </label>

            <label>Places (comma separated):
              <input name="places" value={formData.places} onChange={handleChange} required />
            </label>

            <label>Price Per Day:
              <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} required />
            </label>

            <label>Images (max 3):
              <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            </label>

            <label className="availability">
              Available:
              <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} />
            </label>

            <div className="form-buttons">
              <button type="submit">{editingId ? "Update" : "Create"}</button>
              <button type="button" onClick={resetForm}>Cancel</button>
            </div>
          </form>
        )}

        <div className="guide-grid">
          {packages.map(pkg => (
            <div key={pkg.id} className="guide-card">
              <h3>{pkg.packageName}</h3>
              
              {pkg.imagePaths?.length > 0 && (
                <div className="featured-image">
                  <img src={`http://localhost:8081${pkg.imagePaths[0]}`} alt={pkg.packageName} />
                </div>
              )}
              
              <div className="package-details">
                <p><strong>Location:</strong> {pkg.location}</p>
                <p><strong>Places:</strong> {pkg.places.join(", ")}</p>
                <p><strong>Price per day:</strong> ${pkg.pricePerDay}</p>
                <p><strong>Status:</strong> <span className={pkg.available ? "status-available" : "status-unavailable"}>
                  {pkg.available ? "Available" : "Not Available"}
                </span></p>
              </div>

              <div className="card-buttons">
                {pkg.imagePaths?.length > 1 && (
                  <button 
                    onClick={() => openImageViewer(pkg.imagePaths)} 
                    className="view-btn"
                  >
                    View Images
                  </button>
                )}
                <button onClick={() => handleEdit(pkg)}>Edit</button>
                <button onClick={() => handleDelete(pkg.id)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Viewer Modal */}
      {viewingImages && (
        <div className="image-modal-overlay" onClick={closeImageViewer}>
          <div className="image-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeImageViewer}>×</button>
            <div className="image-gallery">
              {viewingImages.map((img, index) => (
                <img 
                  key={index} 
                  src={`http://localhost:8081${img}`} 
                  alt={`Gallery image ${index + 1}`} 
                  className="gallery-image" 
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideProfile;