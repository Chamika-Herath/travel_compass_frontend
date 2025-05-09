
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AddLocationForm from './AddLocationForm';
// import '../../styles/LocationManage.css';

// const LocationManage = () => {
//   const [locations, setLocations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingLocation, setEditingLocation] = useState(null);
//   const [newImages, setNewImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   const fetchLocations = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/api/locations/all');
//       setLocations(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching locations');
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const filteredLocations = locations.filter(location =>
//     location.name.toLowerCase().includes(searchTerm) ||
//     location.province.toLowerCase().includes(searchTerm) ||
//     location.district.toLowerCase().includes(searchTerm)
//   );

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this location?')) {
//       try {
//         await axios.delete(`http://localhost:8081/api/locations/${id}`);
//         fetchLocations();
//       } catch (err) {
//         setError('Error deleting location');
//       }
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('province', editingLocation.province);
//       formData.append('district', editingLocation.district);
//       formData.append('name', editingLocation.name);
//       formData.append('category', editingLocation.category);
//       formData.append('description', editingLocation.description);

//       // Append new images
//       newImages.forEach((image) => {
//         formData.append('images', image);
//       });

//       await axios.put(`http://localhost:8081/api/locations/${editingLocation.id}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setEditingLocation(null);
//       setNewImages([]);
//       fetchLocations();
//     } catch (err) {
//       setError('Error updating location');
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const totalImages = newImages.length + (editingLocation?.imagePaths?.length || 0);
    
//     if (totalImages + files.length > 5) {
//       setError('Maximum 5 images allowed');
//       return;
//     }
    
//     setNewImages([...newImages, ...files]);
//     setError('');
//   };

//   const removeNewImage = (index) => {
//     const updatedImages = [...newImages];
//     updatedImages.splice(index, 1);
//     setNewImages(updatedImages);
//   };

//   return (
//     <div className="manage-container">
//       <h1>Manage Locations</h1>
      
//       <div className="controls">
//         <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
//           {showAddForm ? 'Cancel' : 'Add New Location'}
//         </button>
        
//         <input
//           type="text"
//           placeholder="Search locations..."
//           onChange={handleSearch}
//           className="search-input"
//         />
//       </div>

//       {showAddForm && <AddLocationForm onSuccess={() => {
//         setShowAddForm(false);
//         fetchLocations();
//       }} />}

//       {error && <div className="error-message">{error}</div>}

//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="locations-grid">
//           {filteredLocations.map(location => (
//             <div key={location.id} className="location-card">
//               <div className="card-header">
//                 <h3>{location.name}</h3>
//                 <div className="action-buttons">
//                   <button 
//                     onClick={() => setEditingLocation(location)} 
//                     className="edit-btn"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(location.id)} 
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
              
//               <p><strong>Province:</strong> {location.province}</p>
//               <p><strong>District:</strong> {location.district}</p>
//               <p><strong>Category:</strong> {location.category}</p>
//               <p><strong>Description:</strong> {location.description}</p>
              
//               <div className="image-gallery">
//                 {location.imagePaths?.map((path, index) => (
//                   <img
//                     key={index}
//                     src={`http://localhost:8081${path}`}
//                     alt={`${location.name} ${index + 1}`}
//                     className="location-image"
//                   />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {editingLocation && (
//         <div className="edit-modal">
//           <div className="modal-content">
//             <h2>Edit Location</h2>
//             <form onSubmit={handleUpdate}>
//               <label>
//                 Province:
//                 <input
//                   type="text"
//                   value={editingLocation.province}
//                   onChange={(e) => setEditingLocation({
//                     ...editingLocation,
//                     province: e.target.value
//                   })}
//                   required
//                 />
//               </label>

//               <label>
//                 District:
//                 <input
//                   type="text"
//                   value={editingLocation.district}
//                   onChange={(e) => setEditingLocation({
//                     ...editingLocation,
//                     district: e.target.value
//                   })}
//                   required
//                 />
//               </label>

//               <label>
//                 Name:
//                 <input
//                   type="text"
//                   value={editingLocation.name}
//                   onChange={(e) => setEditingLocation({
//                     ...editingLocation,
//                     name: e.target.value
//                   })}
//                   required
//                 />
//               </label>

//               <label>
//                 Category:
//                 <input
//                   type="text"
//                   value={editingLocation.category}
//                   onChange={(e) => setEditingLocation({
//                     ...editingLocation,
//                     category: e.target.value
//                   })}
//                   required
//                 />
//               </label>

//               <label>
//                 Description:
//                 <textarea
//                   value={editingLocation.description}
//                   onChange={(e) => setEditingLocation({
//                     ...editingLocation,
//                     description: e.target.value
//                   })}
//                   required
//                 />
//               </label>

//               <div className="image-section">
//                 <h4>Existing Images:</h4>
//                 <div className="existing-images">
//                   {editingLocation.imagePaths?.map((path, index) => (
//                     <img
//                       key={`existing-${index}`}
//                       src={`http://localhost:8081${path}`}
//                       alt={`Existing ${index}`}
//                       className="thumbnail"
//                     />
//                   ))}
//                 </div>

//                 <h4>Add New Images:</h4>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleImageChange}
//                   accept="image/*"
//                 />
                
//                 <div className="new-images-preview">
//                   {newImages.map((image, index) => (
//                     <div key={`new-${index}`} className="image-preview">
//                       <img
//                         src={URL.createObjectURL(image)}
//                         alt={`Preview ${index}`}
//                         className="thumbnail"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeNewImage(index)}
//                         className="remove-image-btn"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <small>
//                   Total images: {editingLocation.imagePaths?.length + newImages.length}/5
//                 </small>
//               </div>

//               <div className="modal-buttons">
//                 <button type="submit" className="save-btn">Save Changes</button>
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     setEditingLocation(null);
//                     setNewImages([]);
//                   }}
//                   className="cancel-btn"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationManage;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import AddLocationForm from './AddLocationForm';
import '../../styles/LocationManage.css';

const LocationManage = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/locations/all');
      setLocations(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching locations');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm) ||
    location.province.toLowerCase().includes(searchTerm) ||
    location.district.toLowerCase().includes(searchTerm)
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        await axios.delete(`http://localhost:8081/api/locations/${id}`);
        fetchLocations();
      } catch (err) {
        setError('Error deleting location');
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('province', editingLocation.province);
      formData.append('district', editingLocation.district);
      formData.append('name', editingLocation.name);
      formData.append('category', editingLocation.category);
      formData.append('description', editingLocation.description);

      // Append new images
      newImages.forEach((image) => {
        formData.append('images', image);
      });

      // Append images to delete
      imagesToDelete.forEach(path => {
        formData.append('imagesToDelete', path);
      });

      await axios.put(`http://localhost:8081/api/locations/${editingLocation.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditingLocation(null);
      setNewImages([]);
      setImagesToDelete([]);
      fetchLocations();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating location');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = (editingLocation?.imagePaths?.length || 0) - 
                       imagesToDelete.length + 
                       newImages.length;
    
    if (totalImages + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }
    
    setNewImages([...newImages, ...files]);
    setError('');
  };

  const removeNewImage = (index) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
  };

  const removeExistingImage = (index) => {
    const updatedImages = [...editingLocation.imagePaths];
    const removedImage = updatedImages.splice(index, 1)[0];
    setEditingLocation({...editingLocation, imagePaths: updatedImages});
    setImagesToDelete([...imagesToDelete, removedImage]);
  };

  return (
    
    <div className="manage-container">
    <Sidebar />
      <h1>Manage Locations</h1>
      
      <div className="controls">
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="add-btn"
        >
          {showAddForm ? 'Cancel' : 'Add New Location'}
        </button>
        
        <input
          type="text"
          placeholder="Search locations..."
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {showAddForm && (
        <AddLocationForm 
          onSuccess={() => {
            setShowAddForm(false);
            fetchLocations();
          }} 
        />
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading locations...</div>
      ) : (
        <div className="locations-grid">
          {filteredLocations.map(location => (
            <div key={location.id} className="location-card">
              <div className="card-header">
                <h3>{location.name}</h3>
                <div className="action-buttons">
                  <button 
                    onClick={() => setEditingLocation(location)} 
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(location.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <p><strong>Province:</strong> {location.province}</p>
              <p><strong>District:</strong> {location.district}</p>
              <p><strong>Category:</strong> {location.category}</p>
              <p><strong>Description:</strong> {location.description}</p>
              
              <div className="image-gallery">
                {location.imagePaths?.map((path, index) => (
                  <img
                    key={index}
                    src={`http://localhost:8081${path}`}
                    alt={`${location.name} ${index + 1}`}
                    className="location-image"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingLocation && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Location</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Province:</label>
                <input
                  type="text"
                  value={editingLocation.province}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    province: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>District:</label>
                <input
                  type="text"
                  value={editingLocation.district}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    district: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editingLocation.name}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    name: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <input
                  type="text"
                  value={editingLocation.category}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    category: e.target.value
                  })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={editingLocation.description}
                  onChange={(e) => setEditingLocation({
                    ...editingLocation,
                    description: e.target.value
                  })}
                  required
                />
              </div>

              <div className="image-section">
                <h4>Existing Images:</h4>
                <div className="existing-images">
                  {editingLocation.imagePaths?.map((path, index) => (
                    <div key={`existing-${index}`} className="image-preview">
                      <img
                        src={`http://localhost:8081${path}`}
                        alt={`Existing ${index}`}
                        className="thumbnail"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <h4>Add New Images:</h4>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  accept="image/*"
                />
                
                <div className="new-images-preview">
                  {newImages.map((image, index) => (
                    <div key={`new-${index}`} className="image-preview">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="thumbnail"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <small className="image-count">
                  Total images: {(editingLocation.imagePaths?.length || 0) - imagesToDelete.length + newImages.length}/5
                </small>
              </div>

              <div className="modal-buttons">
                <button type="submit" className="save-btn">Save Changes</button>
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingLocation(null);
                    setNewImages([]);
                    setImagesToDelete([]);
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManage;