//ADMIN PPROFILE NAVBAR

import React, { useEffect, useState } from "react";
import "../styles/navbar.css"; // Adjust the path if necessary

const ProfileNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-after-scroll" : "navbar-before-scroll"}`}>
      <div className="nav-content">
        <a href="/" className="logo">
          Travel<span style={{ color: "#00bfff" }}>COMPASS</span>
        </a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/packages">Packages</a>
          <a href="/offers">Special Offers</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/user_profile" className="btn">Profile</a> {/* Replaced Log In with Profile */}
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavbar;