import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import '../../styles/AdminHotelOwnerList.css';

const AdminHotelOwnerList = () => {
  const [hotelOwners, setHotelOwners] = useState([]);
  const [filteredHotelOwners, setFilteredHotelOwners] = useState([]);
  const [selectedHotelOwner, setSelectedHotelOwner] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all hotel owners
  useEffect(() => {
    const fetchHotelOwners = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8081/api/hotel-owners/all');
        if (!response.ok) {
          throw new Error('Failed to fetch hotel owners');
        }
        const data = await response.json();
        setHotelOwners(data);
        setFilteredHotelOwners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelOwners();
  }, []);

  // Filter hotel owners based on search term
  useEffect(() => {
    const filtered = hotelOwners.filter(owner => {
      const searchLower = searchTerm.toLowerCase();
      return (
        owner.id.toString().includes(searchLower) ||
        owner.userId.toString().includes(searchLower) ||
        (owner.hotelName && owner.hotelName.toLowerCase().includes(searchLower)) ||
        (owner.hotelAddress && owner.hotelAddress.toLowerCase().includes(searchLower)) ||
        (owner.businessLicense && owner.businessLicense.toLowerCase().includes(searchLower))
      );
    });
    setFilteredHotelOwners(filtered);
  }, [searchTerm, hotelOwners]);

  // Fetch packages for selected hotel owner
  const fetchHotelPackages = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/hotel-packages/hotel-owner/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      const data = await response.json();
      setPackages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelOwnerSelect = (owner) => {
    setSelectedHotelOwner(owner);
    fetchHotelPackages(owner.userId);
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this hotel package?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/hotel-packages/${packageId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete package');
        }
        // Refresh packages after deletion
        fetchHotelPackages(selectedHotelOwner.userId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAllPackages = async (hotelOwnerId) => {
    if (window.confirm('Are you sure you want to delete ALL packages for this hotel owner?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/hotel-owners/delete/${hotelOwnerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete all packages');
        }
        // Refresh packages after deletion
        fetchHotelPackages(selectedHotelOwner.userId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="hotel-owners-admin">
      <Sidebar />
      <div className="hotel-owners-admin__main-content">
        <h1 className="hotel-owners-admin__title">Hotel Owner Management</h1>
        
        {error && <div className="hotel-owners-admin__error">{error}</div>}
        {loading && <div className="hotel-owners-admin__loading">Loading...</div>}

        <div className="hotel-owners-admin__search-container">
          <input
            type="text"
            placeholder="Search hotel owners by ID, hotel name, address or license..."
            className="hotel-owners-admin__search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="hotel-owners-admin__search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="hotel-owners-admin__layout">
          <div className="hotel-owners-admin__owner-list">
            <h2 className="hotel-owners-admin__subtitle">All Hotel Owners</h2>
            <div className="hotel-owners-admin__cards">
              {filteredHotelOwners.length > 0 ? (
                filteredHotelOwners.map((owner) => (
                  <div 
                    key={owner.id} 
                    className={`hotel-owners-admin__card ${selectedHotelOwner?.id === owner.id ? 'hotel-owners-admin__card--selected' : ''}`}
                    onClick={() => handleHotelOwnerSelect(owner)}
                  >
                    <h3 className="hotel-owners-admin__card-title">Owner ID: {owner.id}</h3>
                    <p className="hotel-owners-admin__card-info"><strong>User ID:</strong> {owner.userId}</p>
                    <p className="hotel-owners-admin__card-info"><strong>Hotel Name:</strong> {owner.hotelName || 'N/A'}</p>
                    <p className="hotel-owners-admin__card-info"><strong>Address:</strong> {owner.hotelAddress || 'N/A'}</p>
                    <p className="hotel-owners-admin__card-info"><strong>License:</strong> {owner.businessLicense || 'N/A'}</p>
                    <p className="hotel-owners-admin__card-info"><strong>Rating:</strong> {owner.starRating || '0'} stars</p>
                  </div>
                ))
              ) : (
                <div className="hotel-owners-admin__no-results">
                  No hotel owners found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="hotel-owners-admin__package-section">
            <h2 className="hotel-owners-admin__subtitle">Hotel Packages</h2>
            {selectedHotelOwner ? (
              <>
                <div className="hotel-owners-admin__selected-owner">
                  <h3 className="hotel-owners-admin__selected-title">Selected Hotel: {selectedHotelOwner.hotelName || 'N/A'}</h3>
                  <button 
                    className="hotel-owners-admin__delete-all"
                    onClick={() => handleDeleteAllPackages(selectedHotelOwner.id)}
                  >
                    Delete All Packages
                  </button>
                </div>
                <div className="hotel-owners-admin__package-list">
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <div key={pkg.id} className="hotel-owners-admin__package-card">
                        <div className="hotel-owners-admin__package-header">
                          <h3 className="hotel-owners-admin__package-name">{pkg.packageName}</h3>
                          <button 
                            className="hotel-owners-admin__delete-btn"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <p className="hotel-owners-admin__package-info"><strong>Price per day:</strong> ${pkg.pricePerDay.toFixed(2)}</p>
                        <p className="hotel-owners-admin__package-info"><strong>Beds:</strong> {pkg.bedCount}</p>
                        <p className="hotel-owners-admin__package-info"><strong>Hotel:</strong> {pkg.hotelName}</p>
                        {pkg.imagePaths && pkg.imagePaths.length > 0 && (
                          <div className="hotel-owners-admin__package-images">
                            <img 
                              src={`http://localhost:8081${pkg.imagePaths[0]}`} 
                              alt={pkg.packageName} 
                              className="hotel-owners-admin__package-image"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="hotel-owners-admin__no-packages">No packages found for this hotel owner.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="hotel-owners-admin__select-owner">Select a hotel owner to view their packages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHotelOwnerList;