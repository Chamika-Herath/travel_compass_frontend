// import React from "react";
// import UserProfileHeader from "../components/UserProfileHeader";
// import "../styles/guideProfile.css";
// import guideImage from "../images/hero.jpg"; // Example image

// const GuideProfile = ({ user, handleLogout }) => {
//   return (
//     <div className="guide-section">
//       <UserProfileHeader user={user} handleLogout={handleLogout} />
//       <div className="guide-content">
//         <h2>My Tour Packages</h2>
//         <div className="guide-grid">
//           <div className="guide-card">
//             <img src={guideImage} alt="Tour Package 01" className="guide-image" />
//             <h3>Tour Package 01</h3>
//             <a href="#">Update and view</a>
//             <p>✔ Availability</p>
//             <button className="guide-update-btn">Update</button>
//           </div>
//           <div className="guide-card">
//             <img src={guideImage} alt="Tour Package 02" className="guide-image" />
//             <h3>Tour Package 02</h3>
//             <a href="#">Update and view</a>
//             <p>✔ Availability</p>
//             <button className="guide-update-btn">Update</button>
//           </div>
//           <div className="guide-card">
//             <img src={guideImage} alt="Tour Package 03" className="guide-image" />
//             <h3>Tour Package 03</h3>
//             <a href="#">Update and view</a>
//             <p>✔ Availability</p>
//             <button className="guide-update-btn">Update</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GuideProfile;







import React, { useState } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/guideProfile.css";

const GuideProfile = ({ user, handleLogout }) => {
  const [packages, setPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    packageName: "",
    location: "",
    places: "",
    price: "",
    description: "",
    images: [],
    available: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length !== 3) {
      alert("Please select exactly 3 images");
      return;
    }
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: imageUrls }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length !== 3) {
      alert("Please upload exactly 3 images");
      return;
    }

    const newPackage = {
      ...formData,
      id: Date.now(),
      places: formData.places.split(',').map(p => p.trim()),
    };

    if (editingPackage) {
      setPackages(prev => prev.map(p => p.id === editingPackage.id ? newPackage : p));
      setEditingPackage(null);
    } else {
      setPackages(prev => [...prev, newPackage]);
    }

    setFormData({
      packageName: "",
      location: "",
      places: "",
      price: "",
      description: "",
      images: [],
      available: true
    });
    setShowAddForm(false);
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      ...pkg,
      places: pkg.places.join(', ')
    });
    setShowAddForm(true);
  };

  const closePackageDetails = () => {
    setSelectedPackage(null);
  };

  return (
    <div className="guide-section">
      <UserProfileHeader user={user} handleLogout={handleLogout} />
      <div className="guide-content">
        <div className="header-row">
          <h2>My Tour Packages</h2>
          <button 
            className="add-package-btn"
            onClick={() => setShowAddForm(true)}
          >
            Add Package
          </button>
        </div>

        {showAddForm && (
          <div className="package-form-overlay">
            <form className="package-form" onSubmit={handleSubmit}>
              <h3>{editingPackage ? "Edit Package" : "New Package"}</h3>
              
              <label>
                Package Name:
                <input
                  type="text"
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Places (comma separated):
                <input
                  type="text"
                  name="places"
                  value={formData.places}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Price per day:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Images (exactly 3):
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                  required={!editingPackage}
                />
                <div className="image-requirements">Select exactly 3 images</div>
              </label>

              <label className="availability">
                Available:
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                />
              </label>

              <div className="form-buttons">
                <button type="submit">{editingPackage ? "Update" : "Create"}</button>
                <button type="button" onClick={() => {
                  setShowAddForm(false);
                  setEditingPackage(null);
                }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {selectedPackage && (
          <div className="package-details-overlay" onClick={closePackageDetails}>
            <div className="package-details" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={closePackageDetails}>×</button>
              <h3>{selectedPackage.packageName}</h3>
              <div className="image-gallery">
                {selectedPackage.images.map((img, index) => (
                  <img key={index} src={img} alt={`Package ${index + 1}`} />
                ))}
              </div>
              <p><strong>Location:</strong> {selectedPackage.location}</p>
              <p><strong>Places:</strong> {selectedPackage.places.join(', ')}</p>
              <p><strong>Price per day:</strong> ${selectedPackage.price}</p>
              <p><strong>Description:</strong> {selectedPackage.description}</p>
              <p><strong>Availability:</strong> {selectedPackage.available ? "Available" : "Not Available"}</p>
              <div className="modal-actions">
                <button 
                  className="close-details-btn"
                  onClick={closePackageDetails}
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="guide-grid">
          {packages.map(pkg => (
            <div className="guide-card" key={pkg.id}>
              {pkg.images.length > 0 && (
                <img src={pkg.images[0]} alt={pkg.packageName} className="guide-image" />
              )}
              <h3>{pkg.packageName}</h3>
              <p>{pkg.location}</p>
              <p>{pkg.available ? "✔ Available" : "✖ Not Available"}</p>
              <div className="card-buttons">
                <button 
                  className="view-btn"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  View
                </button>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(pkg)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;