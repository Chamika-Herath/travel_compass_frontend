



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../styles/LocationList.css";

// const LocationList = () => {
//   const [locations, setLocations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/api/locations/all');
//         setLocations(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching locations');
//         setLoading(false);
//       }
//     };

//     fetchLocations();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="location-list">
//       <h2>All Locations</h2>
//       <div className="locations-container">
//         {locations.map((location) => (
//           <div key={location.id} className="location-card">
//             <h3>{location.name}</h3>
//             <p><strong>Province:</strong> {location.province}</p>
//             <p><strong>District:</strong> {location.district}</p>
//             <p><strong>Category:</strong> {location.category}</p>
//             <p><strong>Description:</strong> {location.description}</p>
            
//             <div className="image-gallery">
//               {location.imagePaths?.map((path, index) => (
//                 <img 
//                   key={index}
//                   src={`http://localhost:8081${path}`}
//                   alt={`${location.name} ${index + 1}`}
//                   className="location-image"
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LocationList;



// LocationList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LocationList.css";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [guidePackages, setGuidePackages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/locations/all")
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setLocations(data);
        } else if (typeof data === 'object') {
          setLocations([data]); // Wrap single object in array
        } else {
          console.error("Unexpected location data format:", data);
          setLocations([]);
        }
      })
      .catch(err => {
        console.error("Error fetching locations", err);
        setLocations([]);
      });
  }, []);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (Array.isArray(location.guidePackages)) {
      setGuidePackages(location.guidePackages);
    } else {
      setGuidePackages([]);
    }
  };

  return (
    <div className="location-container">
      <h2>Explore Locations</h2>
      <div className="location-grid">
        {locations.map(loc => (
          <div
            key={loc.id}
            className={`location-card ${selectedLocation?.id === loc.id ? "selected" : ""}`}
            onClick={() => handleLocationSelect(loc)}
          >
            <h3>{loc.name}</h3>
            <p>{loc.province}, {loc.district}</p>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="guide-package-section">
          <h3>Available Guides in {selectedLocation.name}</h3>
          {guidePackages.length > 0 ? (
            <div className="package-grid">
              {guidePackages.map(pkg => (
                <div key={pkg.id} className="guide-card">
                  <h4>{pkg.packageName}</h4>
                  <p>Price Per Day: ${pkg.pricePerDay}</p>
                  <p>Status: <span className={pkg.available ? "status-available" : "status-unavailable"}>
                    {pkg.available ? "Available" : "Unavailable"}
                  </span></p>
                  {pkg.imagePaths?.length > 0 && (
                    <img
                      src={`http://localhost:8081${pkg.imagePaths[0]}`}
                      alt="Guide package"
                      className="guide-image"
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No guide packages found for this location.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationList;
