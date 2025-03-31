




import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/navbar.css";

const Navbar = ({ user, setUser, isProfilePage, userProfileRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-after-scroll" : "navbar-before-scroll"}`}>
      <div className="nav-content">
        <Link to="/" className="logo">
          Travel<span style={{ color: "#00bfff" }}>COMPASS</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/offers">Special Offers</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>

          {user ? (
            isProfilePage ? (
              <button onClick={handleLogout} className="btn">Logout</button>
            ) : (
              <Link to={userProfileRoute} className="btn">
                {user.role === "ROLE_GUIDE" && "Guide Profile"}
                {user.role === "ROLE_HOTEL_OWNER" && "Hotel Profile"}
                {user.role === "ROLE_DRIVER" && " Profile"}
                {user.role === "USER" && "User Profile"}
              </Link>
            )
          ) : (
            <Link to="/login" className="btn">Log In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;