import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddLocationForm.css';

const AddLocationForm = () => {
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    name: '',
    category: '',
    description: '',
    images: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError('You can upload maximum 5 images');
      return;
    }
    setError('');
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length > 5) {
      setError('You can upload maximum 5 images');
      return;
    }

    const data = new FormData();
    data.append('province', formData.province);
    data.append('district', formData.district);
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    formData.images.forEach((image) => {
      data.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8081/api/locations/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Location added successfully!');
      setFormData({
        province: '',
        district: '',
        name: '',
        category: '',
        description: '',
        images: []
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding location');
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Location</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
    <div className='form1'>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Images (max 5):</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
          />
          <small>Selected files: {formData.images.length}</small>
        </div>

        <button type="submit" className="submit-btn">Add Location</button>
      </form>
    </div>
    </div>
  );
};

export default AddLocationForm;