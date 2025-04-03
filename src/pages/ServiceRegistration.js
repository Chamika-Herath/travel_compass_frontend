



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/serviceregistration.css";

const ServiceRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    nic: "",
    serviceType: "",
    description: "",
    phoneNumber: "",
    userId: "", // Will be dynamically updated
  });

  // Fetch logged-in user's details when component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get("http://localhost:8081/auth/session", {
          withCredentials: true, // Ensure session cookies are sent

        });

        if (response.data && response.data.id) {
          setUserId(response.data.id);
        } else {
          alert("User not authenticated. Please log in.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to retrieve user session. Please log in.");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Update formData when userId is set
  useEffect(() => {
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId, // Ensure userId is correctly added
      }));
    }
  }, [userId]);

  // Extract service type from URL query parameters
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
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    // Debugging: Check if userId and formData are set correctly
    console.log("Submitting request with:", { ...formData, userId });

    try {

      const requestData = {
        ...formData,
        userId, // Include logged-in user's ID
      };

      await axios.post("http://localhost:8081/service-requests/submit", requestData, {
        withCredentials: true, // Send session cookies
      });


      alert("Request submitted successfully! Waiting for admin approval.");
      navigate("/user_profile");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(`Error submitting request: ${error.response?.data || "Please try again."}`);
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
