import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/serviceregistration.css";

const ServiceRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    nic: "",
    serviceType: "",
    description: "",
    phoneNumber: "",
  });

  // Extract service type from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceType = params.get("service");
    if (serviceType) {
      setFormData((prevData) => ({ ...prevData, serviceType }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/service-request/submit", formData);
      alert("Request submitted successfully! Waiting for admin approval.");
      navigate("/user_profile");
    } catch (error) {
      alert("Error submitting request. Please try again.");
    }
  };

  return (
    <div className="service-registration-container">
      <h2>Service Provider Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="nic" placeholder="NIC Number" value={formData.nic} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
        <textarea name="description" placeholder="Describe your service..." value={formData.description} onChange={handleChange} required />
        <input type="text" name="serviceType" value={formData.serviceType} readOnly />

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default ServiceRegistration;
