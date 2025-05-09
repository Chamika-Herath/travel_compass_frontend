// import React, { useState } from 'react';
// import axios from 'axios';

// const AddLocationForm = () => {
//   const [formData, setFormData] = useState({
//     province: '',
//     district: '',
//     name: '',
//     category: '',
//     description: '',
//   });
//   const [images, setImages] = useState([]);
//   const [preview, setPreview] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files).slice(0, 5);
//     setImages(selectedImages);
//     setPreview(selectedImages.map(file => URL.createObjectURL(file)));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (images.length === 0) {
//       alert('Please upload at least one image.');
//       return;
//     }

//     const data = new FormData();
//     data.append('province', formData.province);
//     data.append('district', formData.district);
//     data.append('name', formData.name);
//     data.append('category', formData.category);
//     data.append('description', formData.description);

//     images.forEach((img) => {
//       data.append('images', img);
//     });

//     try {
//       const res = await axios.post('http://localhost:8081/api/locations/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Location added successfully!');
//       setFormData({ province: '', district: '', name: '', category: '', description: '' });
//       setImages([]);
//       setPreview([]);
//     } catch (err) {
//       console.error(err);
//       alert('Error adding location');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
//       <h2>Add New Location</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="province" placeholder="Province" value={formData.province} onChange={handleChange} required />
//         <br /><br />
//         <input name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
//         <br /><br />
//         <input name="name" placeholder="Location Name" value={formData.name} onChange={handleChange} required />
//         <br /><br />
//         <input name="category" placeholder="Category (e.g., Beach, Mountain)" value={formData.category} onChange={handleChange} required />
//         <br /><br />
//         <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5" cols="50" />
//         <br /><br />
//         <input type="file" multiple accept="image/*" onChange={handleImageChange} />
//         <p style={{ fontSize: '12px', color: 'gray' }}>* You can upload up to 5 images</p>
//         <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
//           {preview.map((img, index) => (
//             <img key={index} src={img} alt={`preview-${index}`} width="80" height="80" style={{ objectFit: 'cover', borderRadius: 4 }} />
//           ))}
//         </div>
//         <br />
//         <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: 4 }}>
//           Add Location
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddLocationForm;




import React, { useState } from 'react';
import axios from 'axios';

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
  );
};

export default AddLocationForm;