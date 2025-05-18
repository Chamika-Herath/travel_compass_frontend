import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import '../../styles/AdminGuideList.css';

const AdminGuideList = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all guides
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8081/api/guides/all');
        if (!response.ok) {
          throw new Error('Failed to fetch guides');
        }
        const data = await response.json();
        setGuides(data);
        setFilteredGuides(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  // Filter guides based on search term
  useEffect(() => {
    const filtered = guides.filter(guide => {
      const searchLower = searchTerm.toLowerCase();
      return (
        guide.id.toString().includes(searchLower) ||
        guide.userId.toString().includes(searchLower) ||
        guide.licenseNumber.toLowerCase().includes(searchLower) ||
        guide.areasOfExpertise.toLowerCase().includes(searchLower) ||
        guide.languagesSpoken.toLowerCase().includes(searchLower)
      );
    });
    setFilteredGuides(filtered);
  }, [searchTerm, guides]);

  // Fetch packages for selected guide
  const fetchGuidePackages = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/guide-packages/guide/user/${userId}`);
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

  const handleGuideSelect = (guide) => {
    setSelectedGuide(guide);
    fetchGuidePackages(guide.userId);
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/guide-packages/${packageId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete package');
        }
        // Refresh packages after deletion
        fetchGuidePackages(selectedGuide.userId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAllPackages = async (guideId) => {
    if (window.confirm('Are you sure you want to delete ALL packages for this guide?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/guides/delete/${guideId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete all packages');
        }
        // Refresh packages after deletion
        fetchGuidePackages(selectedGuide.userId);
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
    <div className="guide-packages-admin">
      <Sidebar />
      <div className="guide-packages-admin__main-content">
        <h1 className="guide-packages-admin__title">Guide Management</h1>
        
        {error && <div className="guide-packages-admin__error">{error}</div>}
        {loading && <div className="guide-packages-admin__loading">Loading...</div>}

        <div className="guide-packages-admin__search-container">
          <input
            type="text"
            placeholder="Search guides by ID, license, expertise or language..."
            className="guide-packages-admin__search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="guide-packages-admin__search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="guide-packages-admin__layout">
          <div className="guide-packages-admin__guide-list">
            <h2 className="guide-packages-admin__subtitle">All Guides</h2>
            <div className="guide-packages-admin__cards">
              {filteredGuides.length > 0 ? (
                filteredGuides.map((guide) => (
                  <div 
                    key={guide.id} 
                    className={`guide-packages-admin__card ${selectedGuide?.id === guide.id ? 'guide-packages-admin__card--selected' : ''}`}
                    onClick={() => handleGuideSelect(guide)}
                  >
                    <h3 className="guide-packages-admin__card-title">Guide ID: {guide.id}</h3>
                    <p className="guide-packages-admin__card-info"><strong>User ID:</strong> {guide.userId}</p>
                    <p className="guide-packages-admin__card-info"><strong>License:</strong> {guide.licenseNumber}</p>
                    <p className="guide-packages-admin__card-info"><strong>Verified:</strong> {guide.verified ? 'Yes' : 'No'}</p>
                    <div className="guide-packages-admin__expertise">
                      <strong>Expertise:</strong>
                      <p>{guide.areasOfExpertise.split('\n')[0]}</p>
                    </div>
                    <p className="guide-packages-admin__card-info"><strong>Languages:</strong> {guide.languagesSpoken}</p>
                  </div>
                ))
              ) : (
                <div className="guide-packages-admin__no-results">
                  No guides found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="guide-packages-admin__package-section">
            <h2 className="guide-packages-admin__subtitle">Packages</h2>
            {selectedGuide ? (
              <>
                <div className="guide-packages-admin__selected-guide">
                  <h3 className="guide-packages-admin__selected-title">Selected Guide: {selectedGuide.id}</h3>
                  <button 
                    className="guide-packages-admin__delete-all"
                    onClick={() => handleDeleteAllPackages(selectedGuide.id)}
                  >
                    Delete All Packages
                  </button>
                </div>
                <div className="guide-packages-admin__package-list">
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <div key={pkg.id} className="guide-packages-admin__package-card">
                        <div className="guide-packages-admin__package-header">
                          <h3 className="guide-packages-admin__package-name">{pkg.packageName}</h3>
                          <button 
                            className="guide-packages-admin__delete-btn"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <p className="guide-packages-admin__package-info"><strong>Price per day:</strong> ${pkg.pricePerDay.toFixed(2)}</p>
                        <p className="guide-packages-admin__package-info"><strong>Available:</strong> {pkg.available ? 'Yes' : 'No'}</p>
                        {pkg.imagePaths && pkg.imagePaths.length > 0 && (
                          <div className="guide-packages-admin__package-images">
                            <img 
                              src={`http://localhost:8081${pkg.imagePaths[0]}`} 
                              alt={pkg.packageName} 
                              className="guide-packages-admin__package-image"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="guide-packages-admin__no-packages">No packages found for this guide.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="guide-packages-admin__select-guide">Select a guide to view their packages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGuideList;