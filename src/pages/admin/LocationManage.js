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
    <div className="location-management-container">
      <div className='location-management-sidebar'>
        <Sidebar />
      </div>
      
      <div className="location-management-content">
        <div className='location-management-header'>
          <h1 className="location-management-title">Manage Locations</h1>
        </div>
        
        <div className="location-management-controls">
          <div className='location-management-search-container'>
            <input
              type="text"
              placeholder="Search locations..."
              onChange={handleSearch}
              className="location-management-search-input"
            />
          </div>
          
          <div className='location-management-add-btn-container'>
            <button 
              onClick={() => setShowAddForm(!showAddForm)} 
              className="location-management-add-btn"
            >
              {showAddForm ? 'Cancel' : 'Add New Location'}
            </button>
          </div>
        </div>

        {showAddForm && (
          <AddLocationForm 
            onSuccess={() => {
              setShowAddForm(false);
              fetchLocations();
            }} 
          />
        )}

        {error && <div className="location-management-error">{error}</div>}

        {loading ? (
          <div className="location-management-loading">Loading locations...</div>
        ) : (
          <div className="location-management-grid">
            {filteredLocations.map(location => (
              <div key={location.id} className="location-management-card">
                <div className="location-management-card-header">
                  <h3 className="location-management-card-title">{location.name}</h3>
                  <div className="location-management-card-actions">
                    <button 
                      onClick={() => setEditingLocation(location)} 
                      className="location-management-card-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(location.id)} 
                      className="location-management-card-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="location-management-card-body">
                  <p className="location-management-card-info"><strong>Province:</strong> {location.province}</p>
                  <p className="location-management-card-info"><strong>District:</strong> {location.district}</p>
                  <p className="location-management-card-info"><strong>Category:</strong> {location.category}</p>
                  <p className="location-management-card-description"><strong>Description:</strong> {location.description}</p>
                  
                  <div className="location-management-card-gallery">
                    {location.imagePaths?.map((path, index) => (
                      <div key={index} className="location-management-card-image-container">
                        <img
                          src={`http://localhost:8081${path}`}
                          alt={`${location.name} ${index + 1}`}
                          className="location-management-card-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingLocation && (
          <div className="location-management-modal">
            <div className="location-management-modal-content">
              <h2 className="location-management-modal-title">Edit Location</h2>
              <form onSubmit={handleUpdate} className="location-management-modal-form">
                <div className="location-management-form-group">
                  <label className="location-management-form-label">Province:</label>
                  <input
                    type="text"
                    value={editingLocation.province}
                    onChange={(e) => setEditingLocation({
                      ...editingLocation,
                      province: e.target.value
                    })}
                    className="location-management-form-input"
                    required
                  />
                </div>

                <div className="location-management-form-group">
                  <label className="location-management-form-label">District:</label>
                  <input
                    type="text"
                    value={editingLocation.district}
                    onChange={(e) => setEditingLocation({
                      ...editingLocation,
                      district: e.target.value
                    })}
                    className="location-management-form-input"
                    required
                  />
                </div>

                <div className="location-management-form-group">
                  <label className="location-management-form-label">Name:</label>
                  <input
                    type="text"
                    value={editingLocation.name}
                    onChange={(e) => setEditingLocation({
                      ...editingLocation,
                      name: e.target.value
                    })}
                    className="location-management-form-input"
                    required
                  />
                </div>

                <div className="location-management-form-group">
                  <label className="location-management-form-label">Category:</label>
                  <input
                    type="text"
                    value={editingLocation.category}
                    onChange={(e) => setEditingLocation({
                      ...editingLocation,
                      category: e.target.value
                    })}
                    className="location-management-form-input"
                    required
                  />
                </div>

                <div className="location-management-form-group">
                  <label className="location-management-form-label">Description:</label>
                  <textarea
                    value={editingLocation.description}
                    onChange={(e) => setEditingLocation({
                      ...editingLocation,
                      description: e.target.value
                    })}
                    className="location-management-form-textarea"
                    required
                  />
                </div>

                <div className="location-management-image-section">
                  <h4 className="location-management-image-section-title">Existing Images:</h4>
                  <div className="location-management-existing-images">
                    {editingLocation.imagePaths?.map((path, index) => (
                      <div key={`existing-${index}`} className="location-management-image-preview">
                        <img
                          src={`http://localhost:8081${path}`}
                          alt={`Existing ${index}`}
                          className="location-management-thumbnail"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="location-management-remove-image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <h4 className="location-management-image-section-title">Add New Images:</h4>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    accept="image/*"
                    className="location-management-file-input"
                  />
                  
                  <div className="location-management-new-images">
                    {newImages.map((image, index) => (
                      <div key={`new-${index}`} className="location-management-image-preview">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="location-management-thumbnail"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="location-management-remove-image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <small className="location-management-image-count">
                    Total images: {(editingLocation.imagePaths?.length || 0) - imagesToDelete.length + newImages.length}/5
                  </small>
                </div>

                <div className="location-management-modal-actions">
                  <button type="submit" className="location-management-save-btn">Save Changes</button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingLocation(null);
                      setNewImages([]);
                      setImagesToDelete([]);
                    }}
                    className="location-management-cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationManage;