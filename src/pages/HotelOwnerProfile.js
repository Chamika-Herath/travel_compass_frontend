

// import React, { useState } from "react";
// import UserProfileHeader from "../components/UserProfileHeader";
// import "../styles/hotelOwnerProfile.css";
// import hotelImage from "../images/hero.jpg";

// const HotelOwnerProfile = ({ user, handleLogout }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [newPackage, setNewPackage] = useState({
//     name: "",
//     description: "",
//     bedCount: "",
//     price: "",
//     available: true
//   });
  
//   const [packages, setPackages] = useState([
//     { 
//       id: 1, 
//       name: "Package 01", 
//       description: "Luxury mountain view package",
//       bedCount: 2,
//       price: 299,
//       available: true 
//     },
//     { 
//       id: 2, 
//       name: "Package 02",
//       description: "Beachfront villa experience",
//       bedCount: 4,
//       price: 299,
//       available: true 
//     },
//     { 
//       id: 3, 
//       name: "Package 03",
//       description: "City center business suite",
//       bedCount: 1,
//       price: 299,
//       available: true 
//     },
//     { 
//       id: 4, 
//       name: "Package 04",
//       description: "City center business suite",
//       bedCount: 5,
//       price: 299,
//       available: true 
//     },
//   ]);


  
//   const handlePackageAction = (action, packageId) => {
//     if(action === 'create') {
//       setShowModal(true);
//     } else {
//       console.log(`${action} package ${packageId}`);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const createdPackage = {
//       id: Date.now(),
//       ...newPackage,
//       bedCount: parseInt(newPackage.bedCount),
//       price: parseFloat(newPackage.price) 
//     };
    
//     setPackages([...packages, createdPackage]);
//     setNewPackage({ name: "", description: "", bedCount: "", price: "", available: true });
//     setShowModal(false);
//   };

//   return (
//     <div className="hotel-section">
//       {/* Add Package Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="package-modal">
//             <button 
//               className="close-modal"
//               onClick={() => setShowModal(false)}
//             >
//               &times;
//             </button>
//             <h2>Create New Package</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Package Name:</label>
//                 <input
//                   type="text"
//                   value={newPackage.name}
//                   onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
//                   required
//                 />
//                 <label>Price ($):</label>
//                 <input
//                   type="number"
//                   value={newPackage.price}
//                   onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
//                   min="1"
//                   step="0.01"
//                   required
//                 /> 
//               </div>
              
//               <div className="form-group">
//                 <label>Description:</label>
//                 <textarea
//                   value={newPackage.description}
//                   onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Bed Count:</label>
//                 <input
//                   type="number"
//                   value={newPackage.bedCount}
//                   onChange={(e) => setNewPackage({...newPackage, bedCount: e.target.value})}
//                   min="1"
//                   required
//                 />
//               </div>
              

//               <div className="modal-actions">
//                 <button type="button" 
//                   className="cancel-btn"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="submit-btn">
//                   Create Package
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <UserProfileHeader user={user} handleLogout={handleLogout} />
      
//       <main className="hotel-content">
//         <header className="package-header">
//           <h1>My Packages</h1>
//           <button 
//             className="create-package-btn"
//             onClick={() => handlePackageAction('create', null)}
//           >
//             + Create New Package
//           </button>
//         </header>

//         <div className="hotel-grid">
//           {packages.map((pkg) => (
//             <article key={pkg.id} className="hotel-card">
//               <img 
//                 src={hotelImage} 
//                 alt={`Thumbnail for ${pkg.name}`} 
//                 className="hotel-image" 
//               />
//               <div className="card-content">
//                 <h2>{pkg.name}</h2>
//                 <div className="package-details">
//                   <p>{pkg.description}</p>
//                   <div className="bed-count">
//                     <span>🛏 Beds:</span>
//                     <strong>{pkg.bedCount}</strong>
//                   </div>
//                   <div className="package-price">
//                   <span>💰 Price:</span>
//                   <strong>${pkg.price}/night</strong>
//                 </div>
//                 </div>
//                 <div className="availability">
//                   <span 
//                     role="img" 
//                     aria-label={pkg.available ? "Available" : "Unavailable"}
//                   >
//                     {pkg.available ? "✔" : "✖"}
//                   </span>
//                   {pkg.available ? "Available" : "Sold Out"}
//                 </div>
//                 <div className="card-actions">
//                   <button
//                     className="action-btn view-btn"
//                     onClick={() => handlePackageAction('view', pkg.id)}
//                   >
//                     View Details
//                   </button>
//                   <button
//                     className="action-btn update-btn"
//                     onClick={() => handlePackageAction('edit', pkg.id)}
//                   >
//                     Edit Package
//                   </button>
//                 </div>s
//               </div>
//             </article>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HotelOwnerProfile;


import React, { useState, useEffect } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/hotelOwnerProfile.css";
import hotelImage from "../images/hero.jpg";

const HotelOwnerProfile = ({ user, handleLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
    bedCount: "",
    price: "",
    available: true
  });

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/packages")
      .then((response) => response.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  const handlePackageAction = async (action, packageId) => {
    if (action === "create") {
      setEditingPackageId(null);
      setNewPackage({
        name: "",
        description: "",
        bedCount: "",
        price: "",
        available: true
      });
      setShowModal(true);
    } else if (action === "edit") {
      const pkgToEdit = packages.find((pkg) => pkg.id === packageId);
      if (pkgToEdit) {
        setNewPackage({
          name: pkgToEdit.name,
          description: pkgToEdit.description,
          bedCount: pkgToEdit.bedCount,
          price: pkgToEdit.price,
          available: pkgToEdit.available
        });
        setEditingPackageId(pkgToEdit.id);
        setShowModal(true);
      }
    } else if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this package?")) {
        try {
          const response = await fetch(`http://localhost:8081/api/packages/${packageId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });

          if (response.ok) {
            setPackages((prevPackages) =>
              prevPackages.filter((pkg) => pkg.id !== packageId)
            );
          } else {
            const errorMessage = await response.text();
            alert(`Failed to delete the package: ${errorMessage}`);
          }
        } catch (error) {
          console.error("Error deleting package:", error);
          alert("An error occurred while deleting the package.");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPackage.name || !newPackage.description || !newPackage.bedCount || !newPackage.price) {
      alert("All fields are required.");
      return;
    }

    const preparedPackage = {
      name: newPackage.name,
      description: newPackage.description,
      bedCount: parseInt(newPackage.bedCount, 10),
      price: parseFloat(newPackage.price),
      available: newPackage.available
    };

    try {
      const url = editingPackageId
        ? `http://localhost:8081/api/packages/${editingPackageId}`
        : "http://localhost:8081/api/packages";

      const method = editingPackageId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(preparedPackage)
      });

      if (!response.ok) throw new Error("Failed to save package");

      const data = await response.json();

      if (editingPackageId) {
        setPackages((prevPackages) =>
          prevPackages.map((pkg) => (pkg.id === editingPackageId ? data : pkg))
        );
      } else {
        setPackages((prevPackages) => [...prevPackages, data]);
      }

      setShowModal(false);
      setEditingPackageId(null);
      setNewPackage({
        name: "",
        description: "",
        bedCount: "",
        price: "",
        available: true
      });
    } catch (error) {
      console.error("Error saving package:", error);
      alert("An error occurred while saving the package.");
    }
  };

  return (
    <div className="hotel-section">
      {/* Add/Edit Package Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="package-modal">
            <button className="close-modal" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2>{editingPackageId ? "Edit Package" : "Create New Package"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Package Name:</label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                  required
                />
                <label>Price ($):</label>
                <input
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                  min="1"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={newPackage.description}
                  onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Bed Count:</label>
                <input
                  type="number"
                  value={newPackage.bedCount}
                  onChange={(e) => setNewPackage({ ...newPackage, bedCount: e.target.value })}
                  min="1"
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingPackageId ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <UserProfileHeader user={user} handleLogout={handleLogout} />

      <main className="hotel-content">
        <header className="package-header">
          <h1>My Packages</h1>
          <button className="create-package-btn" onClick={() => handlePackageAction("create", null)}>
            + Create New Package
          </button>
        </header>

        <div className="hotel-grid">
          {packages.map((pkg) => (
            <article key={pkg.id} className="hotel-card">
              <img src={hotelImage} alt={`Thumbnail for ${pkg.name}`} className="hotel-image" />
              <div className="card-content">
                <h2>{pkg.name}</h2>
                <div className="package-details">
                  <p>{pkg.description}</p>
                  <div className="bed-count">
                    <span>🛏 Beds:</span>
                    <strong>{pkg.bedCount}</strong>
                  </div>
                  <div className="package-price">
                    <span>💰 Price:</span>
                    <strong>${pkg.price}/night</strong>
                  </div>
                </div>
                <div className="availability">
                  <span role="img" aria-label={pkg.available ? "Available" : "Unavailable"}>
                    {pkg.available ? "✔" : "✖"}
                  </span>
                  {pkg.available ? "Available" : "Sold Out"}
                </div>
                <div className="card-actions">
                  <button className="action-btn update-btn" onClick={() => handlePackageAction("edit", pkg.id)}>
                    Edit Package
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handlePackageAction("delete", pkg.id)}>
                    Delete Package
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HotelOwnerProfile;




