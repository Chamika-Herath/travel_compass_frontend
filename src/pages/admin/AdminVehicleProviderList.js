import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/Sidebar";
import '../../styles/AdminVehicleProviderList.css';

const AdminVehicleProviderList = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all vehicle providers
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8081/api/vehicle-providers/all');
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle providers');
        }
        const data = await response.json();
        setProviders(data);
        setFilteredProviders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  // Filter providers based on search term
  useEffect(() => {
    const filtered = providers.filter(provider => {
      const searchLower = searchTerm.toLowerCase();
      return (
        provider.id.toString().includes(searchLower) ||
        provider.userId.toString().includes(searchLower) ||
        (provider.companyName && provider.companyName.toLowerCase().includes(searchLower)) ||
        (provider.licenseNumber && provider.licenseNumber.toLowerCase().includes(searchLower)) ||
        (provider.vehicleTypes && provider.vehicleTypes.toLowerCase().includes(searchLower))
      );
    });
    setFilteredProviders(filtered);
  }, [searchTerm, providers]);

  // Fetch packages for selected provider
  const fetchVehiclePackages = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8081/api/vehicle-packages/user/${userId}`);
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

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    fetchVehiclePackages(provider.userId);
  };

  const handleDeletePackage = async (packageId) => {
    if (window.confirm('Are you sure you want to delete this vehicle package?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/vehicle-packages/${packageId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete package');
        }
        // Refresh packages after deletion
        fetchVehiclePackages(selectedProvider.userId);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAllPackages = async (providerId) => {
    if (window.confirm('Are you sure you want to delete ALL packages for this vehicle provider?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8081/api/vehicle-providers/delete/${providerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete all packages');
        }
        // Refresh packages after deletion
        fetchVehiclePackages(selectedProvider.userId);
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
    <div className="vehicle-providers-admin">
      <Sidebar />
      <div className="vehicle-providers-admin__main-content">
        <h1 className="vehicle-providers-admin__title">Vehicle Provider Management</h1>
        
        {error && <div className="vehicle-providers-admin__error">{error}</div>}
        {loading && <div className="vehicle-providers-admin__loading">Loading...</div>}

        <div className="vehicle-providers-admin__search-container">
          <input
            type="text"
            placeholder="Search providers by ID, company name, license or vehicle types..."
            className="vehicle-providers-admin__search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="vehicle-providers-admin__search-icon">
            <i className="fas fa-search"></i>
          </span>
        </div>

        <div className="vehicle-providers-admin__layout">
          <div className="vehicle-providers-admin__provider-list">
            <h2 className="vehicle-providers-admin__subtitle">All Vehicle Providers</h2>
            <div className="vehicle-providers-admin__cards">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <div 
                    key={provider.id} 
                    className={`vehicle-providers-admin__card ${selectedProvider?.id === provider.id ? 'vehicle-providers-admin__card--selected' : ''}`}
                    onClick={() => handleProviderSelect(provider)}
                  >
                    <h3 className="vehicle-providers-admin__card-title">Provider ID: {provider.id}</h3>
                    <p className="vehicle-providers-admin__card-info"><strong>User ID:</strong> {provider.userId}</p>
                    <p className="vehicle-providers-admin__card-info"><strong>Company:</strong> {provider.companyName || 'N/A'}</p>
                    <p className="vehicle-providers-admin__card-info"><strong>License:</strong> {provider.licenseNumber || 'N/A'}</p>
                    <p className="vehicle-providers-admin__card-info"><strong>Vehicle Types:</strong> {provider.vehicleTypes || 'N/A'}</p>
                    <p className="vehicle-providers-admin__card-info"><strong>Fleet Size:</strong> {provider.fleetSize || '0'}</p>
                  </div>
                ))
              ) : (
                <div className="vehicle-providers-admin__no-results">
                  No vehicle providers found matching your search criteria.
                </div>
              )}
            </div>
          </div>

          <div className="vehicle-providers-admin__package-section">
            <h2 className="vehicle-providers-admin__subtitle">Vehicle Packages</h2>
            {selectedProvider ? (
              <>
                <div className="vehicle-providers-admin__selected-provider">
                  <h3 className="vehicle-providers-admin__selected-title">Selected Provider: {selectedProvider.companyName || 'N/A'}</h3>
                  <button 
                    className="vehicle-providers-admin__delete-all"
                    onClick={() => handleDeleteAllPackages(selectedProvider.id)}
                  >
                    Delete All Packages
                  </button>
                </div>
                <div className="vehicle-providers-admin__package-list">
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <div key={pkg.id} className="vehicle-providers-admin__package-card">
                        <div className="vehicle-providers-admin__package-header">
                          <h3 className="vehicle-providers-admin__package-name">{pkg.vehicleModel}</h3>
                          <button 
                            className="vehicle-providers-admin__delete-btn"
                            onClick={() => handleDeletePackage(pkg.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <p className="vehicle-providers-admin__package-info"><strong>Type:</strong> {pkg.vehicleType}</p>
                        <p className="vehicle-providers-admin__package-info"><strong>Price per day:</strong> ${pkg.pricePerDay.toFixed(2)}</p>
                        <p className="vehicle-providers-admin__package-info"><strong>Price per km:</strong> ${pkg.pricePerKm.toFixed(2)}</p>
                        <p className="vehicle-providers-admin__package-info"><strong>Fuel Type:</strong> {pkg.fuelType}</p>
                        <p className="vehicle-providers-admin__package-info"><strong>Provider:</strong> {pkg.providerName}</p>
                        {pkg.imagePaths && pkg.imagePaths.length > 0 && (
                          <div className="vehicle-providers-admin__package-images">
                            <img 
                              src={`http://localhost:8081${pkg.imagePaths[0]}`} 
                              alt={pkg.vehicleModel} 
                              className="vehicle-providers-admin__package-image"
                            />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="vehicle-providers-admin__no-packages">No packages found for this vehicle provider.</p>
                  )}
                </div>
              </>
            ) : (
              <p className="vehicle-providers-admin__select-provider">Select a vehicle provider to view their packages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVehicleProviderList;