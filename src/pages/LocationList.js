import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LocationList.css";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [guidePackages, setGuidePackages] = useState([]);
  const [hotelPackages, setHotelPackages] = useState([]);
  const [vehiclePackages, setVehiclePackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:8081/api/locations/all");
        const data = res.data;
        setLocations(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching locations", err);
        setLocations([]);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationSelect = async (location) => {
    setLoading(true);
    setSelectedLocation(location);
    
    try {
      const [guidesRes, hotelsRes, vehiclesRes] = await Promise.all([
        axios.get(`http://localhost:8081/api/locations/${location.id}/guide-packages`),
        axios.get(`http://localhost:8081/api/locations/${location.id}/hotel-packages`),
        axios.get(`http://localhost:8081/api/locations/${location.id}/vehicle-packages`)
      ]);

      setGuidePackages(guidesRes.data);
      setHotelPackages(hotelsRes.data);
      setVehiclePackages(vehiclesRes.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderPackageSection = (title, packages, type) => {
    if (loading) return <p>Loading {title}...</p>;
    
    return (
      <div className="package-section">
        <h3>{title} in {selectedLocation.name}</h3>
        {packages.length > 0 ? (
          <div className="package-grid">
            {packages.map(pkg => (
              <div key={pkg.id} className={`package-card ${type}-card`}>
                {pkg.imagePaths?.length > 0 && (
                  <img
                    src={`http://localhost:8081${pkg.imagePaths[0]}`}
                    alt={type}
                    className="package-image"
                  />
                )}
                <div className="package-details">
                  <h4>{pkg.packageName || pkg.vehicleModel || 'Unnamed Package'}</h4>
                  {type === 'guide' && (
                    <>
                      <p>Price/day: ${pkg.pricePerDay}</p>
                      <p>Status: <span className={pkg.available ? "available" : "unavailable"}>
                        {pkg.available ? "Available" : "Unavailable"}
                      </span></p>
                    </>
                  )}
                  {type === 'hotel' && (
                    <>
                      <p>Price/night: ${pkg.pricePerDay}</p>
                      <p>Beds: {pkg.bedCount}</p>
                    </>
                  )}
                  {type === 'vehicle' && (
                    <>
                      <p>Price/day: ${pkg.pricePerDay}</p>
                      <p>Price/km: ${pkg.pricePerKm}</p>
                      <p>Type: {pkg.vehicleType}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No {title.toLowerCase()} found for this location.</p>
        )}
      </div>
    );
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
            <div className="location-image-container">
              {loc.imagePaths?.length > 0 && (
                <img
                  src={`http://localhost:8081${loc.imagePaths[0]}`}
                  alt={loc.name}
                  className="location-image"
                />
              )}
            </div>
            <div className="location-info">
              <h3>{loc.name}</h3>
              <p>{loc.province}, {loc.district}</p>
              <p className="location-category">{loc.category}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedLocation && (
        <div className="package-container">
          {renderPackageSection("Guide Packages", guidePackages, 'guide')}
          {renderPackageSection("Hotel Packages", hotelPackages, 'hotel')}
          {renderPackageSection("Vehicle Packages", vehiclePackages, 'vehicle')}
        </div>
      )}
    </div>
  );
};

export default LocationList;