import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/EditPlace.css';

const EditPlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    image: null,
    currentImageUrl: ''
  });

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
    
    const foundPlace = mockPlaces.find(p => p.id === parseInt(id));
    if (foundPlace) {
      setPlace(foundPlace);
      setFormData({
        name: foundPlace.name,
        location: foundPlace.location,
        description: foundPlace.description,
        image: null,
        currentImageUrl: foundPlace.imageUrl
      });
    }
  }, [id]);

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
    alert(`Place ${id} updated successfully!`);
    navigate('/admin/places');
  };

  if (!place) return <div className="ep-not-found">Place not found</div>;

  return (
    <div className="ep-edit-place">
      <div className="ep-container">
        <h2 className="ep-title">Edit Place</h2>
        <form onSubmit={handleSubmit} className="ep-form">
          <div className="ep-form-group">
            <label className="ep-form-label">Place Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="ep-form-input"
            />
          </div>
          <div className="ep-form-group">
            <label className="ep-form-label">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="ep-form-input"
            />
          </div>
          <div className="ep-form-group">
            <label className="ep-form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="ep-form-textarea"
            />
          </div>
          <div className="ep-form-group">
            <label className="ep-form-label">Current Image</label>
            <img 
              src={formData.currentImageUrl} 
              alt={place.name} 
              className="ep-current-image"
            />
          </div>
          <div className="ep-form-group">
            <label className="ep-form-label">New Image (Leave blank to keep current)</label>
            <div className="ep-file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="ep-file-input"
                id="ep-file-input"
              />
              <label htmlFor="ep-file-input" className="ep-file-label">
                Choose File
              </label>
            </div>
          </div>
          <div className="ep-form-actions">
            <button type="submit" className="ep-btn ep-btn-primary">Update</button>
            <button 
              type="button" 
              className="ep-btn ep-btn-secondary"
              onClick={() => navigate('/admin/places')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlace;