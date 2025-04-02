// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../styles/serviceregistration.css";

// const ServiceRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     nic: "",
//     serviceType: "",
//     description: "",
//     phoneNumber: "",
//   });

//   // Extract service type from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const serviceType = params.get("service");
//     if (serviceType) {
//       setFormData((prevData) => ({ ...prevData, serviceType }));
//     }
//   }, [location]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/service-request/submit", formData);
//       alert("Request submitted successfully! Waiting for admin approval.");
//       navigate("/user_profile");
//     } catch (error) {
//       alert("Error submitting request. Please try again.");
//     }
//   };

//   return (
//     <div className="service-registration-container">
//       <h2>Service Provider Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
//         <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
//         <input type="text" name="nic" placeholder="NIC Number" value={formData.nic} onChange={handleChange} required />
//         <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
//         <textarea name="description" placeholder="Describe your service..." value={formData.description} onChange={handleChange} required />
//         <input type="text" name="serviceType" value={formData.serviceType} readOnly />

//         <button type="submit">Submit Request</button>
//       </form>
//     </div>
//   );
// };

// export default ServiceRegistration;



/*import React, { useState, useEffect } from "react";
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
      await axios.post("http://localhost:8080/service-request/submit", formData, {
        withCredentials: true, // Ensure cookies (session) are sent
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

export default ServiceRegistration;*/




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
    userId: "", // Add userId field
  });

  // Fetch logged-in user's details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8081/auth/session", {
          withCredentials: true, // Ensure session cookies are sent
        });
        setUserId(response.data.id); // Assuming the response contains { id: 123, name: "John" }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

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
    if (!userId) {
      alert("User not authenticated! Please log in.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/service-request/submit", 
        { ...formData, userId }, // Pass userId
        { withCredentials: true } // Ensure session is sent
      );
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

