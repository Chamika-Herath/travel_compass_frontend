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
import "../styles/navbar.css"; 

const Navbar = () => {
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
        <a href="/" className="logo">Travel<span style={{ color: "#00bfff" }}>COMPASS</span></a>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/packages">Packages</a>
          <a href="/offers">Special Offers</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/login" className="btn">Log In</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
