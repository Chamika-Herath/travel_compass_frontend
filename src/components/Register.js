import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSection"; // Import HeroSection
import "../styles/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:8081/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("Response:", response); // Debugging log

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("🎉 Registration successful! Redirecting to login...");
        
        // Delay redirection for 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <HeroSection />
        <div className="register-container">
          <div className="register-box">
            <h2>Sign Up</h2>
            
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}

            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Register</button>
            </form>

            <p>Already have an account? <a href="/login">Log In</a></p>
          </div>
        </div>
    </div>     
  );
};

export default Register;
