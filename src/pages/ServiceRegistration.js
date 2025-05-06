



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../styles/serviceregistration.css";

// const ServiceRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userId, setUserId] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     nic: "",
//     serviceType: "",
//     description: "",
//     phoneNumber: "",
//     userId: "", // Will be dynamically updated
//   });

//   // Fetch logged-in user's details when component loads
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {

//         const response = await axios.get("http://localhost:8081/auth/session", {
//           withCredentials: true, // Ensure session cookies are sent

//         });

//         if (response.data && response.data.id) {
//           setUserId(response.data.id);
//         } else {
//           alert("User not authenticated. Please log in.");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         alert("Failed to retrieve user session. Please log in.");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   // Update formData when userId is set
//   useEffect(() => {
//     if (userId) {
//       setFormData((prevData) => ({
//         ...prevData,
//         userId, // Ensure userId is correctly added
//       }));
//     }
//   }, [userId]);

//   // Extract service type from URL query parameters
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
//     if (!userId) {
//       alert("User ID is missing. Please log in again.");
//       return;
//     }

//     // Debugging: Check if userId and formData are set correctly
//     console.log("Submitting request with:", { ...formData, userId });

//     try {

//       const requestData = {
//         ...formData,
//         userId, // Include logged-in user's ID
//       };

//       await axios.post("http://localhost:8081/service-requests/submit", requestData, {
//         withCredentials: true, // Send session cookies
//       });


//       alert("Request submitted successfully! Waiting for admin approval.");
//       navigate("/user_profile");
//     } catch (error) {
//       console.error("Error submitting request:", error);
//       alert(`Error submitting request: ${error.response?.data || "Please try again."}`);
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



// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import "../styles/serviceregistration.css";

// const ServiceRegistration = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userId, setUserId] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     nic: "",
//     serviceType: "",
//     description: "",
//     phoneNumber: "",
//     licenseNumber: "",
//     businessName: "",
//     vehicleTypes: "",
//     userId: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   // Fetch logged-in user's details
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/auth/session", {
//           withCredentials: true // Crucial for session cookies
//         });

//         if (response.data && response.data.id) {
//           setUserId(response.data.id);
//           setFormData(prev => ({
//             ...prev,
//             userId: response.data.id,
//             fullName: `${response.data.firstName || ''} ${response.data.lastName || ''}`.trim()
//           }));
//         } else {
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         if (error.response && error.response.status === 401) {
//           // Redirect to login if unauthorized
//           navigate("/login");
//         }
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   // Set service type from URL
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const serviceType = params.get("service");
//     if (serviceType && ["GUIDE", "HOTEL_OWNER", "VEHICLE_PROVIDER"].includes(serviceType)) {
//       setFormData(prev => ({ ...prev, serviceType }));
//     }
//   }, [location]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.description) newErrors.description = "Required";
//     if (!formData.address) newErrors.address = "Required";
//     if (!formData.nic) newErrors.nic = "Required";
//     if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    
//     // Role-specific validations
//     if (formData.serviceType === "GUIDE" && !formData.licenseNumber) {
//       newErrors.licenseNumber = "License required for guides";
//     }
//     if (formData.serviceType === "HOTEL_OWNER" && !formData.businessName) {
//       newErrors.businessName = "Business name required";
//     }
//     if (formData.serviceType === "VEHICLE_PROVIDER" && !formData.vehicleTypes) {
//       newErrors.vehicleTypes = "Vehicle types required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (!userId) {
//       alert("Please wait while we verify your session...");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:8081/api/service-requests",
//         formData,
//         {
//           withCredentials: true // Important for session cookies
//         }
//       );

//       alert(`Request submitted successfully! ID: ${response.data.id}`);
//       navigate("/user_profile");
//     } catch (error) {
//       console.error("Submission error:", error);
//       if (error.response && error.response.status === 401) {
//         alert("Session expired. Please log in again.");
//         navigate("/login");
//       } else {
//         alert(error.response?.data?.message || "Submission failed. Please try again.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderRoleSpecificFields = () => {
//     switch(formData.serviceType) {
//       case "GUIDE":
//         return (
//           <div className="form-group">
//             <label>Guide License Number</label>
//             <input
//               type="text"
//               name="licenseNumber"
//               value={formData.licenseNumber}
//               onChange={handleChange}
//               className={errors.licenseNumber ? "error" : ""}
//             />
//             {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
//           </div>
//         );
//       case "HOTEL_OWNER":
//         return (
//           <div className="form-group">
//             <label>Hotel/Business Name</label>
//             <input
//               type="text"
//               name="businessName"
//               value={formData.businessName}
//               onChange={handleChange}
//               className={errors.businessName ? "error" : ""}
//             />
//             {errors.businessName && <span className="error-message">{errors.businessName}</span>}
//           </div>
//         );
//       case "VEHICLE_PROVIDER":
//         return (
//           <div className="form-group">
//             <label>Vehicle Types (comma separated)</label>
//             <input
//               type="text"
//               name="vehicleTypes"
//               value={formData.vehicleTypes}
//               onChange={handleChange}
//               placeholder="e.g., Sedan,SUV,Van"
//               className={errors.vehicleTypes ? "error" : ""}
//             />
//             {errors.vehicleTypes && <span className="error-message">{errors.vehicleTypes}</span>}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="service-registration-container">
//       <h2>Service Provider Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Service Type</label>
//           <input
//             type="text"
//             name="serviceType"
//             value={formData.serviceType}
//             readOnly
//           />
//         </div>

//         <div className="form-group">
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             readOnly
//           />
//         </div>

//         <div className="form-group">
//           <label>Address</label>
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className={errors.address ? "error" : ""}
//           />
//           {errors.address && <span className="error-message">{errors.address}</span>}
//         </div>

//         <div className="form-group">
//           <label>NIC Number</label>
//           <input
//             type="text"
//             name="nic"
//             value={formData.nic}
//             onChange={handleChange}
//             className={errors.nic ? "error" : ""}
//           />
//           {errors.nic && <span className="error-message">{errors.nic}</span>}
//         </div>

//         <div className="form-group">
//           <label>Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             className={errors.phoneNumber ? "error" : ""}
//           />
//           {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
//         </div>

//         <div className="form-group">
//           <label>Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className={errors.description ? "error" : ""}
//             rows="4"
//           />
//           {errors.description && <span className="error-message">{errors.description}</span>}
//         </div>

//         {renderRoleSpecificFields()}

//         <button 
//           type="submit" 
//           className="submit-btn"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Submitting..." : "Submit Request"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ServiceRegistration;



import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/serviceregistration.css";

const ServiceRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    nic: "",
    serviceType: "",
    description: "",
    phoneNumber: "",
    licenseNumber: "",
    businessName: "",
    vehicleTypes: "",
    userId: "",
    // Guide specific
    areasOfExpertise: "",
    languagesSpoken: "English",
    // Hotel Owner specific
    hotelAddress: "",
    starRating: "",
    amenities: "",
    // Vehicle Provider specific
    companyName: "",
    fleetSize: "",
    serviceAreas: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch logged-in user's details and check for existing requests
  useEffect(() => {
    const fetchUserAndCheckRequest = async () => {
      try {
        // Get user session
        const userResponse = await axios.get("http://localhost:8081/auth/session", {
          withCredentials: true
        });

        if (userResponse.data && userResponse.data.id) {
          setUserId(userResponse.data.id);
          setFormData(prev => ({
            ...prev,
            userId: userResponse.data.id,
            fullName: `${userResponse.data.firstName || ''} ${userResponse.data.lastName || ''}`.trim()
          }));

          // Check for existing requests
          const requestResponse = await axios.get(
            `http://localhost:8081/api/service-requests/user/${userResponse.data.id}`,
            { withCredentials: true }
          );
          
          if (requestResponse.data && requestResponse.data.status === "PENDING") {
            setHasPendingRequest(true);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchUserAndCheckRequest();
  }, [navigate]);

  // Set service type from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceType = params.get("service");
    if (serviceType && ["GUIDE", "HOTEL_OWNER", "VEHICLE_PROVIDER"].includes(serviceType)) {
      setFormData(prev => ({ ...prev, serviceType }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Common validations
    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.address) newErrors.address = "Required";
    if (!formData.nic) newErrors.nic = "Required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Required";
    if (!formData.description) newErrors.description = "Required";
    
    // Role-specific validations
    switch(formData.serviceType) {
      case "GUIDE":
        if (!formData.licenseNumber) newErrors.licenseNumber = "Required";
        if (!formData.areasOfExpertise) newErrors.areasOfExpertise = "Required";
        if (!formData.languagesSpoken) newErrors.languagesSpoken = "Required";
        break;
      case "HOTEL_OWNER":
        if (!formData.businessName) newErrors.businessName = "Required";
        if (!formData.hotelAddress) newErrors.hotelAddress = "Required";
        break;
      case "VEHICLE_PROVIDER":
        if (!formData.companyName) newErrors.companyName = "Required";
        if (!formData.vehicleTypes) newErrors.vehicleTypes = "Required";
        if (!formData.fleetSize) newErrors.fleetSize = "Required";
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!userId) {
      alert("Please wait while we verify your session...");
      return;
    }
    if (hasPendingRequest) {
      alert("You already have a pending request. Please wait for approval.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        // For guides
        ...(formData.serviceType === "GUIDE" && {
          licenseNumber: formData.licenseNumber,
          description: `${formData.description}\n\nAreas of Expertise: ${formData.areasOfExpertise}\nLanguages: ${formData.languagesSpoken}`
        }),
        // For hotel owners
        ...(formData.serviceType === "HOTEL_OWNER" && {
          businessName: formData.businessName,
          licenseNumber: formData.licenseNumber,
          description: `${formData.description}\n\nHotel Address: ${formData.hotelAddress}\nStar Rating: ${formData.starRating}\nAmenities: ${formData.amenities}`
        }),
        // For vehicle providers
        ...(formData.serviceType === "VEHICLE_PROVIDER" && {
          businessName: formData.companyName,
          licenseNumber: formData.licenseNumber,
          vehicleTypes: formData.vehicleTypes,
          description: `${formData.description}\n\nFleet Size: ${formData.fleetSize}\nService Areas: ${formData.serviceAreas}`
        })
      };

      const response = await axios.post(
        "http://localhost:8081/api/service-requests",
        submissionData,
        { withCredentials: true }
      );

      alert(`Request submitted successfully! Your request ID: ${response.data.id}`);
      navigate("/user_profile");
    } catch (error) {
      console.error("Submission error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else if (error.response?.status === 400 && error.response.data?.message?.includes("already has a pending")) {
        setHasPendingRequest(true);
        alert("You already have a pending service request");
      } else {
        alert(error.response?.data?.message || "Submission failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderGuideFields = () => (
    <>
      <div className="form-group">
        <label>Guide License Number*</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          className={errors.licenseNumber ? "error" : ""}
        />
        {errors.licenseNumber && <span className="error-message">{errors.licenseNumber}</span>}
      </div>

      <div className="form-group">
        <label>Areas of Expertise*</label>
        <input
          type="text"
          name="areasOfExpertise"
          value={formData.areasOfExpertise}
          onChange={handleChange}
          placeholder="e.g., Historical Sites, Adventure Tours"
          className={errors.areasOfExpertise ? "error" : ""}
        />
        {errors.areasOfExpertise && <span className="error-message">{errors.areasOfExpertise}</span>}
      </div>

      <div className="form-group">
        <label>Languages Spoken*</label>
        <input
          type="text"
          name="languagesSpoken"
          value={formData.languagesSpoken}
          onChange={handleChange}
          placeholder="Comma separated (e.g., English, Sinhala, Tamil)"
          className={errors.languagesSpoken ? "error" : ""}
        />
        {errors.languagesSpoken && <span className="error-message">{errors.languagesSpoken}</span>}
      </div>
    </>
  );

  const renderHotelOwnerFields = () => (
    <>
      <div className="form-group">
        <label>Hotel/Business Name*</label>
        <input
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          className={errors.businessName ? "error" : ""}
        />
        {errors.businessName && <span className="error-message">{errors.businessName}</span>}
      </div>

      <div className="form-group">
        <label>Hotel Address*</label>
        <input
          type="text"
          name="hotelAddress"
          value={formData.hotelAddress}
          onChange={handleChange}
          className={errors.hotelAddress ? "error" : ""}
        />
        {errors.hotelAddress && <span className="error-message">{errors.hotelAddress}</span>}
      </div>

      <div className="form-group">
        <label>Business License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Star Rating</label>
        <select
          name="starRating"
          value={formData.starRating}
          onChange={handleChange}
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Amenities</label>
        <textarea
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          placeholder="List amenities separated by commas"
          rows="3"
        />
      </div>
    </>
  );

  const renderVehicleProviderFields = () => (
    <>
      <div className="form-group">
        <label>Company Name*</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={errors.companyName ? "error" : ""}
        />
        {errors.companyName && <span className="error-message">{errors.companyName}</span>}
      </div>

      <div className="form-group">
        <label>Vehicle Types*</label>
        <input
          type="text"
          name="vehicleTypes"
          value={formData.vehicleTypes}
          onChange={handleChange}
          placeholder="e.g., Sedan, SUV, Van, Bus"
          className={errors.vehicleTypes ? "error" : ""}
        />
        {errors.vehicleTypes && <span className="error-message">{errors.vehicleTypes}</span>}
      </div>

      <div className="form-group">
        <label>License Number</label>
        <input
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Fleet Size*</label>
        <input
          type="number"
          name="fleetSize"
          value={formData.fleetSize}
          onChange={handleChange}
          min="1"
          className={errors.fleetSize ? "error" : ""}
        />
        {errors.fleetSize && <span className="error-message">{errors.fleetSize}</span>}
      </div>

      <div className="form-group">
        <label>Service Areas</label>
        <textarea
          name="serviceAreas"
          value={formData.serviceAreas}
          onChange={handleChange}
          placeholder="Areas you operate in (comma separated)"
          rows="3"
        />
      </div>
    </>
  );

  if (hasPendingRequest) {
    return (
      <div className="service-registration-container">
        <h2>Service Provider Registration</h2>
        <div className="pending-request-message">
          <h3>You already have a pending service request</h3>
          <p>Please wait for administrator approval before submitting another request.</p>
          <button 
            onClick={() => navigate("/user_profile")}
            className="back-btn"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-registration-container">
      <h2>Service Provider Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Information</h3>
          
          <div className="form-group">
            <label>Service Type</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label>Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label>NIC Number*</label>
            <input
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              className={errors.nic ? "error" : ""}
            />
            {errors.nic && <span className="error-message">{errors.nic}</span>}
          </div>

          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? "error" : ""}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? "error" : ""}
              rows="4"
              placeholder={`Tell us about your ${formData.serviceType === "GUIDE" ? "guiding experience" : 
                          formData.serviceType === "HOTEL_OWNER" ? "hotel" : "vehicle services"}`}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-section">
          <h3>{formData.serviceType === "GUIDE" ? "Guide Information" : 
               formData.serviceType === "HOTEL_OWNER" ? "Hotel Information" : "Company Information"}</h3>
          
          {formData.serviceType === "GUIDE" && renderGuideFields()}
          {formData.serviceType === "HOTEL_OWNER" && renderHotelOwnerFields()}
          {formData.serviceType === "VEHICLE_PROVIDER" && renderVehicleProviderFields()}
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceRegistration;