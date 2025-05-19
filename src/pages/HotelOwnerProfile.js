
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfileHeader from "../components/UserProfileHeader";
import "../styles/hotelOwnerProfile.css";

const HotelOwnerProfile = ({ user, handleLogout }) => {
    const [packages, setPackages] = useState([]);
    const [locations, setLocations] = useState([]);
    const [hotelDetails, setHotelDetails] = useState(null);
    const [formData, setFormData] = useState({
        packageName: "",
        locationIds: [],
        pricePerDay: "",
        bedCount: 1,
        available: true
    });
    const [images, setImages] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [viewingImages, setViewingImages] = useState(null);

    const BASE_URL = "http://localhost:8081/api/hotel-packages";

    const fetchHotelDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/api/hotel-owners/user/${user.id}`);
            setHotelDetails(res.data);
        } catch (err) {
            console.error("Error fetching hotel details", err);
            if (err.response?.status === 404) {
                alert("Please complete your hotel registration first!");
                window.location.href = '/hotel-registration';
            }
        }
    };

    const fetchPackages = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/hotel-owner/user/${user.id}`);
            setPackages(res.data);
        } catch (err) {
            console.error("Error fetching packages", err);
            alert("Failed to load packages");
        }
    };

    const fetchLocations = async () => {
        try {
            const res = await axios.get("http://localhost:8081/api/locations/all");
            setLocations(res.data);
        } catch (err) {
            console.error("Error fetching locations", err);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchHotelDetails();
            fetchPackages();
            fetchLocations();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === "locationIds") {
            const val = parseInt(value);
            setFormData(prev => ({
                ...prev,
                locationIds: checked
                    ? [...prev.locationIds, val]
                    : prev.locationIds.filter(id => id !== val)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        setImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length > 5) {
            alert("Maximum 5 images allowed");
            return;
        }

        try {
            const payload = {
                ...formData,
                imagePaths: []
            };

            const formPayload = new FormData();
            formPayload.append("package", new Blob([JSON.stringify(payload)], { type: "application/json" }));
            images.forEach(file => formPayload.append("images", file));

            if (editingId) {
                await axios.put(`${BASE_URL}/${editingId}`, formPayload, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            } else {
                await axios.post(`${BASE_URL}/create/user/${user.id}`, formPayload, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
            }

            fetchPackages();
            resetForm();
        } catch (err) {
            console.error("Operation failed", err);
            alert(err.response?.data?.message || "Operation failed");
        }
    };

    const resetForm = () => {
        setFormData({
            packageName: "",
            locationIds: [],
            pricePerDay: "",
            bedCount: 1,
            available: true
        });
        setImages([]);
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (pkg) => {
        setFormData({
            packageName: pkg.packageName,
            locationIds: pkg.locations.map(l => l.id),
            pricePerDay: pkg.pricePerDay,
            bedCount: pkg.bedCount,
            available: pkg.available
        });
        setEditingId(pkg.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this package permanently?")) return;
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchPackages();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const openImageGallery = (images) => setViewingImages(images);
    const closeImageGallery = () => setViewingImages(null);

    return (
        <div className="hotel-owner-profile-page">
            <div className="hotel-owner-profile">
                <UserProfileHeader user={user} handleLogout={handleLogout} />

                {hotelDetails && (
                    <div className="hotel-header">
                        <h1>{hotelDetails.hotelName}</h1>
                        <div className="hotel-info">
                            <span>⭐ {hotelDetails.starRating} Star Hotel</span>
                            <p>{hotelDetails.hotelAddress}</p>
                        </div>
                    </div>
                )}

                <div className="package-management">
                    <div className="header-section">
                        <h2>Manage Packages</h2>
                        <button onClick={() => setShowForm(!showForm)} className="toggle-form-btn">
                            {showForm ? "Close Form" : "Create New Package"}
                        </button>
                    </div>

                    {showForm && (
                        <form className="package-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Package Name</label>
                                <input
                                    name="packageName"
                                    value={formData.packageName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bed Count</label>
                                <input
                                    type="number"
                                    name="bedCount"
                                    min="1"
                                    value={formData.bedCount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Price Per Day ($)</label>
                                <input
                                    type="number"
                                    name="pricePerDay"
                                    step="0.01"
                                    value={formData.pricePerDay}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group locations-group">
                                <label>Associated Locations</label>
                                <div className="location-checkboxes">
                                    {locations.map(location => (
                                        <label key={location.id} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="locationIds"
                                                value={location.id}
                                                checked={formData.locationIds.includes(location.id)}
                                                onChange={handleChange}
                                            />
                                            {location.name} ({location.province})
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Package Images (Max 5)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                />
                                <div className="image-preview">
                                    {images.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`Preview ${index + 1}`}
                                            className="preview-image"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="form-group availability-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleChange}
                                    />
                                    Available for Booking
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-btn">
                                    {editingId ? "Update Package" : "Create Package"}
                                </button>
                                <button type="button" onClick={resetForm} className="cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="package-list">
                        {packages.map(pkg => (
                            <div key={pkg.id} className="package-card">
                                <div className="card-header">
                                    <h3>{pkg.packageName}</h3>
                                    <span className={`status ${pkg.available ? 'available' : 'unavailable'}`}>
                                        {pkg.available ? 'Available' : 'Unavailable'}
                                    </span>
                                </div>
                                
                                {pkg.imagePaths?.length > 0 && (
                                    <div className="card-images">
                                        <img
                                            src={`http://localhost:8081${pkg.imagePaths[0]}`}
                                            alt={pkg.packageName}
                                            className="main-image"
                                            onClick={() => openImageGallery(pkg.imagePaths)}
                                        />
                                        {pkg.imagePaths.length > 1 && (
                                            <div className="image-count" onClick={() => openImageGallery(pkg.imagePaths)}>
                                                +{pkg.imagePaths.length - 1}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="card-details">
                                    <p><strong>Bed Count:</strong> {pkg.bedCount}</p>
                                    <p><strong>Price:</strong> ${pkg.pricePerDay}/night</p>
                                    <p><strong>Locations:</strong></p>
                                    <ul className="location-list">
                                        {pkg.locations?.map(location => (
                                            <li key={location.id}>{location.name}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="card-actions">
                                    <button onClick={() => handleEdit(pkg)} className="edit-btn">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(pkg.id)} className="delete-btn">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {viewingImages && (
                        <div className="image-modal" onClick={closeImageGallery}>
                            <div className="modal-content" onClick={e => e.stopPropagation()}>
                                <button className="close-btn" onClick={closeImageGallery}>×</button>
                                <div className="image-gallery">
                                    {viewingImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:8081${img}`}
                                            alt={`Gallery ${index + 1}`}
                                            className="gallery-image"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelOwnerProfile;