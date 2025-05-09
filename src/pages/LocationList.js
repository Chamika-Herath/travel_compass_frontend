// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../styles/LocationList.css";

// const LocationList = () => {
//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8081/api/locations/all') // Adjust if your endpoint differs
//       .then(response => {
//         setLocations(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching locations:', error);
//       });
//   }, []);

//   return (
//     <div className="location-list-container">
//   <h2 className="location-list-title">All Locations</h2>
//   <div className="location-grid">
//     {locations.map(location => (
//       <div key={location.id} className="location-card">
//         <h3>{location.locationName}</h3>
//         <p><strong>Province:</strong> {location.province}</p>
//         <p><strong>District:</strong> {location.district}</p>
//         <p><strong>Category:</strong> {location.category}</p>
//         <p>{location.description}</p>

//         <div className="location-images">
//           {(location.imageUrls || []).map((url, index) => (
//             <img
//               key={index}
//               src={`http://localhost:8081/${url}`}
//               alt={`Location ${index}`}
//             />
//           ))}
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

//   );
// };

// export default LocationList;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/LocationList.css";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/locations/all');
        setLocations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching locations');
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="location-list">
      <h2>All Locations</h2>
      <div className="locations-container">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <h3>{location.name}</h3>
            <p><strong>Province:</strong> {location.province}</p>
            <p><strong>District:</strong> {location.district}</p>
            <p><strong>Category:</strong> {location.category}</p>
            <p><strong>Description:</strong> {location.description}</p>
            
            <div className="image-gallery">
              {location.imagePaths?.map((path, index) => (
                <img 
                  key={index}
                  src={`http://localhost:8081${path}`}
                  alt={`${location.name} ${index + 1}`}
                  className="location-image"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;