import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [budget, setBudget] = useState(1000);
  const [days, setDays] = useState(2);
  const [members, setMembers] = useState(2);
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [services, setServices] = useState({ guide: true, hotel: true, vehicle: true });
  const [packages, setPackages] = useState([]);
  const [viewPackage, setViewPackage] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8081/api/locations/all")
      .then(res => setLocations(res.data))
      .catch(err => console.error("Failed to fetch locations", err));
  }, []);

  useEffect(() => {
    setFilteredLocations(
      locations.filter(loc =>
        loc.name.toLowerCase().startsWith(locationInput.toLowerCase())
      )
    );
  }, [locationInput, locations]);

  const handleServiceChange = (e) => {
    const { name, checked } = e.target;
    setServices(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!budget || !selectedLocationId || !days || !members) return;
    const params = { budget, location_id: selectedLocationId, days, members, ...services };
    try {
      const res = await axios.get("http://localhost:8000/recommendations", { params });
      setPackages(res.data.slice(0, 5));
      setShowPopup(false);
    } catch (err) {
      console.error("Failed to fetch recommendations", err);
    }
  };

  const handleViewDetails = async (pkg) => {
    try {
      const [guide, hotel, vehicle] = await Promise.all([
        pkg.guide?.id ? axios.get(`http://localhost:8081/api/guide-packages/${pkg.guide.id}`) : Promise.resolve({ data: null }),
        pkg.hotel?.id ? axios.get(`http://localhost:8081/api/hotel-packages/${pkg.hotel.id}`) : Promise.resolve({ data: null }),
        pkg.vehicle?.id ? axios.get(`http://localhost:8081/api/vehicle-packages/${pkg.vehicle.id}`) : Promise.resolve({ data: null })
      ]);

      setViewPackage({
        guide: guide.data,
        hotel: hotel.data,
        vehicle: vehicle.data,
        totalPrice: pkg.total_trip_price
      });
    } catch (err) {
      console.error("Error loading package details", err);
    }
  };

  const handleBookNow = () => {
    // Implement booking logic here
    // For now, just show a success message
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setViewPackage(null);
    }, 3000);
  };

  return (
    <div className="find-recommendations">
      <section className="intro-section">
        <h2 className="fade-in">Find Your Dream Travel Package</h2>
        <p className="fade-in-delay">
          Discover tailored travel packages that fit your budget, schedule, and interests. Simply select your preferences, and we'll handle the rest.
        </p>
        <button onClick={() => setShowPopup(true)} className="start-btn pulse">Find Packages</button>
      </section>

      {showPopup && (
        <div className="popup-overlay fade-in">
          <div className="popup-content slide-in">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <form onSubmit={handleSubmit} className="popup-form">
              <h3>Plan Your Trip</h3>
              
              <div className="form-group">
                <label htmlFor="budget">Your Budget ($)</label>
                <input 
                  id="budget"
                  type="number" 
                  value={budget} 
                  onChange={e => setBudget(e.target.value)} 
                  placeholder="Enter your budget" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="days">Number of Days</label>
                <input 
                  id="days"
                  type="number" 
                  value={days} 
                  onChange={e => setDays(e.target.value)} 
                  placeholder="How many days?" 
                  min={1} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="members">Number of People</label>
                <input 
                  id="members"
                  type="number" 
                  value={members} 
                  onChange={e => setMembers(e.target.value)} 
                  placeholder="How many people?" 
                  min={1} 
                  required 
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Destination</label>
                <div className="location-box">
                  <input
                    id="location"
                    type="text"
                    value={locationInput}
                    onChange={e => { setLocationInput(e.target.value); setSelectedLocationId(null); }}
                    placeholder="Search location"
                    required
                  />
                  {locationInput && filteredLocations.length > 0 && (
                    <ul className="autocomplete-dropdown">
                      {filteredLocations.map(loc => (
                        <li key={loc.id} onClick={() => { setLocationInput(loc.name); setSelectedLocationId(loc.id); setFilteredLocations([]); }}>
                          {loc.name} ({loc.province})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Services You Need</label>
                <div className="checkboxes">
                  {Object.entries(services).map(([key, value]) => (
                    <label key={key} className="checkbox-label">
                      <input type="checkbox" name={key} checked={value} onChange={handleServiceChange} /> 
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-btn">Get Recommendations</button>
            </form>
          </div>
        </div>
      )}

      {packages.length > 0 && (
        <div className="results fade-in">
          <h3>Top Packages for You:</h3>
          <div className="package-grids">
            {packages.map((pkg, index) => (
              <div className="package-cards scale-in" style={{animationDelay: `${index * 0.1}s`}} key={index}>
                <p><strong>Guide:</strong> {pkg.guide?.package_name || 'None'}</p>
                <p><strong>Hotel:</strong> {pkg.hotel?.package_name || 'None'}</p>
                <p><strong>Vehicle:</strong> {pkg.vehicle?.vehicle_model || 'None'}</p>
                <p><strong>Price/Day:</strong> ${pkg.total_price_per_day}</p>
                <p><strong>Total Trip:</strong> ${pkg.total_trip_price}</p>
                <button className="view-btn" onClick={() => handleViewDetails(pkg)}>View Details</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {viewPackage && (
        <div className="popup-overlay fade-in">
          <div className="popup-content slide-in">
            <button className="close-btn" onClick={() => setViewPackage(null)}>×</button>
            <h3>Package Details</h3>

            {viewPackage.guide && (
              <div className="detail-block fade-in-delay">
                <h4>Guide: {viewPackage.guide.packageName}</h4>
                <p><strong>Guide Name:</strong> {viewPackage.guide.guideName}</p>
                <p><strong>Price Per Day:</strong> ${viewPackage.guide.pricePerDay}</p>
                <p><strong>Available:</strong> {viewPackage.guide.available ? "Yes" : "No"}</p>
                <div className="image-gallery">
                  {viewPackage.guide.imagePaths?.map((img, idx) => (
                    <img key={idx} src={`http://localhost:8081${img}`} alt="Guide" className="preview-img" />
                  ))}
                </div>
              </div>
            )}

            {viewPackage.hotel && (
              <div className="detail-block fade-in-delay" style={{animationDelay: "0.2s"}}>
                <h4>Hotel: {viewPackage.hotel.hotelName}</h4>
                <p><strong>Package Name:</strong> {viewPackage.hotel.packageName}</p>
                <p><strong>Price Per Day:</strong> ${viewPackage.hotel.pricePerDay}</p>
                <p><strong>Bed Count:</strong> {viewPackage.hotel.bedCount}</p>
                <div className="image-gallery">
                  {viewPackage.hotel.imagePaths?.map((img, idx) => (
                    <img key={idx} src={`http://localhost:8081${img}`} alt="Hotel" className="preview-img" />
                  ))}
                </div>
              </div>
            )}

            {viewPackage.vehicle && (
              <div className="detail-block fade-in-delay" style={{animationDelay: "0.4s"}}>
                <h4>Vehicle: {viewPackage.vehicle.vehicleModel}</h4>
                <p><strong>Provider:</strong> {viewPackage.vehicle.providerName}</p>
                <p><strong>Type:</strong> {viewPackage.vehicle.vehicleType}</p>
                <p><strong>Fuel:</strong> {viewPackage.vehicle.fuelType}</p>
                <p><strong>Price Per Day:</strong> ${viewPackage.vehicle.pricePerDay}</p>
                <div className="image-gallery">
                  {viewPackage.vehicle.imagePaths?.map((img, idx) => (
                    <img key={idx} src={`http://localhost:8081${img}`} alt="Vehicle" className="preview-img" />
                  ))}
                </div>
              </div>
            )}
            
            <div className="booking-section">
              <div className="price-summary">
                <p><strong>Total Package Price:</strong> ${viewPackage.totalPrice}</p>
              </div>
              <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
            </div>
            
            {bookingSuccess && (
              <div className="success-message">
                <p>Booking successful! Thank you for choosing our service.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;