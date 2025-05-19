import React, { useState, useEffect } from "react";
import hero1 from "../images/hero.jpg";
import hero2 from "../images/hero2.jpeg";
import hero3 from "../images/images.jpeg";
import "../styles/hero.css";

const HeroSection = () => {
  const slides = [
    {
      image: hero1,
      title: "Discover Tropical Paradises",
      subtitle: "Relax on pristine beaches with crystal-clear waters"
    },
    {
      image: hero2,
      title: "Explore Ancient Cultures",
      subtitle: "Walk through history in world heritage sites"
    },
    {
      image: hero3,
      title: "Adventure Awaits You",
      subtitle: "Experience thrilling outdoor activities"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setZoomLevel(160);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % slides.length);
          setZoomLevel(150);
        }, 1000);
      }, 20000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const handleDotClick = (index) => {
    setZoomLevel(160);
    setTimeout(() => {
      setCurrentIndex(index);
      setZoomLevel(100);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 20000);
    }, 1000);
  };

  return (
    <section className="hero">
      {/*zoom effect */}
      <div 
        className="hero-bg" 
        style={{ 
          backgroundImage: `url(${slides[currentIndex].image})`,
          transform: `scale(${zoomLevel}%)`
        }}
      ></div>
      
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h2 className="hero-title">
          <span className="title-line">{slides[currentIndex].title}</span>
          <span className="title-line subtitle">{slides[currentIndex].subtitle}</span>
        </h2>
        
        <a href="#explore" className="explore-btn">
          <span>Explore Now</span>
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        
        <div className="dots-container">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;