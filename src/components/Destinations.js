import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Destinations.css";

const Destinations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/locations/all");
        const data = Array.isArray(res.data) ? res.data.slice(0, 3) : [];
        setLocations(data);
      } catch (err) {
        setError("Failed to load destinations");
        console.error("Error fetching locations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (loading) return <div className="destinations-loading">Loading paradise locations...</div>;
  if (error) return <div className="destinations-error">{error}</div>;

  return (
    <div className="destinations-page">
      <div className="destinations-container">
        <h2 className="section-title animate-slide-up">Pearls of Sri Lanka</h2>
        <div className="destinations-grid">
          {locations.map((location, index) => (
            <div 
              key={location.id} 
              className="destination-card animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="destination-image-container">
                {location.imagePaths?.length > 0 && (
                  <img
                    src={`http://localhost:8081${location.imagePaths[0]}`}
                    alt={location.name}
                    className="destination-image"
                  />
                )}
                <div className="destination-overlay">
                  <h3 className="destination-title">{location.name}</h3>
                  <p className="destination-location">
                    {location.province}, {location.district}
                  </p>
                </div>
              </div>
              <div className="destination-info">
                <span className="destination-category">{location.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="website-description animate-fade-in">
        <div className="description-container">
          <h2 className="section-title">Discover the Wonder of Sri Lanka</h2>
          <p className="description-text">
            🌴 Where golden beaches meet ancient kingdoms, and lush tea plantations 
            blend with wild jungles. Sri Lanka - The resplendent island nation waiting 
            to be explored!
          </p>
          
          <div className="highlight-box animate-scale-in">
            <ul className="services-list">
              <li>🏖️ Pristine beaches & surf spots</li>
              <li>🏰 UNESCO World Heritage Sites</li>
              <li>🐘 Wildlife safaris & nature reserves</li>
              <li>☕ World-famous tea trails</li>
              <li>⛰️ Misty mountain escapes</li>
            </ul>
          </div>

          <p className="description-text">
            Find everything you need for your perfect Sri Lankan adventure:
            expert guides, boutique hotels, and reliable transportation. 
            Dive into our curated packages and create unforgettable memories 
            in the Pearl of the Indian Ocean!
          </p>
          
          <button 
            className="cta-button animate-pulse"
            onClick={() => navigate('/packages')}
          >
            Begin Your Lankan Journey →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Destinations;