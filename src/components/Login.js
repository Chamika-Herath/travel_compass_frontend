

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSection from "./HeroSection"; // Import HeroSection
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password },
        { withCredentials: true }
      );
  
      console.log("Login Response:", response); // Debugging log
  
      if (response.status === 200) {
        navigate("/user_profile"); // ✅ Navigate only on success
      }
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err.message);
      
      // ❌ Handle incorrect credentials
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };
  
  

  return (
    <div className="login-page">
      <HeroSection /> {/* HeroSection as the background */}
      <img src="../images/compass.svg" alt="Compass" className="compass-icon" /> {/* Add the compass icon */}

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleLogin}>
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
            <button type="submit">Log In</button>
          </form>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

