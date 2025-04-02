import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import '../../styles/PlacesManagement.css';

const PlacesManagement = () => {
  const [places, setPlaces] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: null
  });
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const mockPlaces = [
      {
        id: 1,
        name: 'Eiffel Tower',
        location: 'Paris, France',
        description: 'Iconic iron tower in Paris',
        imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400'
      },
      {
        id: 2,
        name: 'Grand Canyon',
        location: 'Arizona, USA',
        description: 'Massive canyon carved by the Colorado River',
        imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400'
      }
    ];
    setPlaces(mockPlaces);
    setNextId(3);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlace = {
      id: nextId,
      name: formData.name,
      location: formData.location,
      description: formData.description,
      imageUrl: formData.image || 'https://via.placeholder.com/400'
    };
    
    setPlaces([...places, newPlace]);
    setNextId(nextId + 1);
    setShowAddForm(false);
    setFormData({
      name: '',
      location: '',
      description: '',
      image: null
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this place?')) {
      setPlaces(places.filter(place => place.id !== id));
    }
  };

  return (
    <div className="pm-admin-container">
      <Sidebar />
      <div className="pm-admin-content">
        <div className="pm-places-management">
          <div className="pm-header">
            <h2 className="pm-title">Places Management</h2>
            <button 
              className="pm-btn pm-btn-primary"
              onClick={() => setShowAddForm(true)}
            >
              Add Place
            </button>
          </div>

          {showAddForm && (
            <div className="pm-add-place-form">
              <h3 className="pm-form-title">Add New Place</h3>
              <form onSubmit={handleSubmit} className="pm-form">
                <div className="pm-form-group">
                  <label className="pm-form-label">Place Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="pm-form-input"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="pm-form-input"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-form-label">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="pm-form-textarea"
                  />
                </div>
                <div className="pm-form-group">
                  <label className="pm-form-label">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="pm-file-input"
                  />
                </div>
                <div className="pm-form-actions">
                  <button type="submit" className="pm-btn pm-btn-primary">Submit</button>
                  <button 
                    type="button" 
                    className="pm-btn pm-btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="pm-places-table">
            <table className="pm-table">
              <thead className="pm-table-header">
                <tr className="pm-table-row">
                  <th className="pm-table-head">ID</th>
                  <th className="pm-table-head">Name</th>
                  <th className="pm-table-head">Location</th>
                  <th className="pm-table-head">Description</th>
                  <th className="pm-table-head">Image</th>
                  <th className="pm-table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="pm-table-body">
                {places.map(place => (
                  <tr key={place.id} className="pm-table-row">
                    <td className="pm-table-data">{place.id}</td>
                    <td className="pm-table-data">{place.name}</td>
                    <td className="pm-table-data">{place.location}</td>
                    <td className="pm-table-data">{place.description}</td>
                    <td className="pm-table-data">
                      <img 
                        src={place.imageUrl} 
                        alt={place.name} 
                        className="pm-place-thumbnail"
                      />
                    </td>
                    <td className="pm-table-data pm-action-buttons">
                      <Link 
                        to={`/admin/places/edit/${place.id}`} 
                        className="pm-btn pm-btn-edit"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(place.id)}
                        className="pm-btn pm-btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesManagement;