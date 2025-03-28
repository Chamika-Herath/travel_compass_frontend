// import React from "react";
// import "../styles/navbar.css"; // Import the CSS file

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <a href="/" className="logo">TravelCOMPASS</a>
//       <ul>
//         <li><a href="#home">Home</a></li>
//         <li><a href="#packages">Packages</a></li>
//         <li><a href="#special-offers">Special Offers</a></li>
//         <li><a href="#about">About Us</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//       <a href="#login" className="login-btn">Login</a>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check session when component mounts
  useEffect(() => {
    axios.get("http://localhost:8080/auth/session", { withCredentials: true })
      .then(response => {
        if (response.data && response.data.id) {
          setUser(response.data); // ✅ Store logged-in user
        }
      })
      .catch(() => setUser(null));
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear user session
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-after-scroll" : "navbar-before-scroll"}`}>
      <div className="nav-content">
        <Link to="/" className="logo">Travel<span style={{ color: "#00bfff" }}>COMPASS</span></Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/offers">Special Offers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>

          {user ? (
            <>
              <Link to="/user_profile" className="btn">Profile</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn">Log In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
