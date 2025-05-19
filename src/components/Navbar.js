import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import compassIcon from "../images/compass.svg";
import "../styles/navbar.css";

const Navbar = ({ user, setUser, isProfilePage, userProfileRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [lastTimestamp, setLastTimestamp] = useState(0);
  const logoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const idleTimer = useRef();

  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {


    setActiveLink(location.pathname);
  }, [location]);


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const timeDiff = now - lastTimestamp;
      
      // Reset idle timer
      const logoImg = logoRef.current?.querySelector('.logo-icon');
      if (logoImg) {
        logoImg.classList.remove('idle');
        clearTimeout(idleTimer.current);
        idleTimer.current = setTimeout(() => {
          logoImg.classList.add('idle');
        }, 3000);
      }

      if (timeDiff > 10) { 
        const distance = Math.sqrt(
          Math.pow(e.clientX - lastPosition.x, 2) + 
          Math.pow(e.clientY - lastPosition.y, 2)
        );
        const speed = Math.min(distance / timeDiff * 2, 3); 
        
        if (speed > 0.2) { 
          const direction = e.clientX > lastPosition.x ? 1 : -1;
          const rotationAmount = speed * 180 * direction; 
          setRotation(prev => prev + rotationAmount);
        }
      }
      
      setLastPosition({ x: e.clientX, y: e.clientY });
      setLastTimestamp(now);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, [lastPosition, lastTimestamp]);

  const handleLogout = async () => {
    try {


      await axios.post("http://localhost:8081/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/");

    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className={`navbar ${isScrolled ? "navbar-after-scroll" : "navbar-before-scroll"}`}>
      <div className="nav-content">
        <Link to="/" className="logo" onClick={() => handleNavClick("/")} ref={logoRef}>
          <img 
            src={compassIcon} 
            alt="Compass" 
            className="logo-icon"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          Travel<span style={{ color: "#00bfff" }}>COMPASS</span>
        </Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link 
            to="/" 
            className={activeLink === "/" ? "active" : ""}
            onClick={() => handleNavClick("/")}
          >
            Home
          </Link>
          <Link 
            to="/packages" 
            className={activeLink === "/packages" ? "active" : ""}
            onClick={() => handleNavClick("/packages")}
          >
            Locations
          </Link>
          <Link 
            to="/offers" 
            className={activeLink === "/offers" ? "active" : ""}
            onClick={() => handleNavClick("/offers")}
          >
            Special Offers
          </Link>
          <Link 
            to="/about" 
            className={activeLink === "/about" ? "active" : ""}
            onClick={() => handleNavClick("/about")}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={activeLink === "/contact" ? "active" : ""}
            onClick={() => handleNavClick("/contact")}
          >
            Contact Us
          </Link>

          {user ? (
            isProfilePage ? (
              <button onClick={handleLogout} className="btn">Logout</button>
            ) : (
              <Link 
                to={userProfileRoute} 
                className={`btn ${activeLink === userProfileRoute ? "active" : ""}`}
                onClick={() => handleNavClick(userProfileRoute)}
              >
                {user.role === "ROLE_GUIDE" && "Guide Profile"}
                {user.role === "ROLE_HOTEL_OWNER" && "Hotel Profile"}
                {user.role === "ROLE_DRIVER" && "Driver Profile"}
                {user.role === "USER" && "User Profile"}
              </Link>
            )
          ) : (
            <Link 
              to="/login" 
              className={`btn ${activeLink === "/login" ? "active" : ""}`}
              onClick={() => handleNavClick("/login")}
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;