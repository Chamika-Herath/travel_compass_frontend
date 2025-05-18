


import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Pending.css";

const Pending = () => {
  const navigate = useNavigate();
  const backgroundStyle = {
    background: `linear-gradient(135deg, 
      ${getRandomBlue()}, 
      ${getRandomBlue()}, 
      ${getRandomBlue()})`
  };

  function getRandomBlue() {
    const hues = [200, 210, 220, 230]; // Different blue hue ranges
    const hue = hues[Math.floor(Math.random() * hues.length)];
    return `hsl(${hue}, 80%, ${Math.random() * 20 + 60}%)`;
  }

  return (
    <div className="pending-container" style={backgroundStyle}>
      <button 
        className="back-button"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>
      <div className="pending-content">
        <h1 className="pending-text">Pending</h1>
        <div className="pending-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Pending;