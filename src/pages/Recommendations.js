// import React, { useState } from 'react';
// import axios from 'axios';
// import RecommendationForm from '../components/RecommendationForm';
// import RecommendationsList from '../components/RecommendationsList';

// const Recommendations = () => {
//     const [results, setResults] = useState([]);

//     const fetchRecommendations = async (budget, location) => {
//         try {
//             const response = await axios.get(`http://127.0.0.1:5000/recommend?budget=${budget}&location=${location}`);
//             setResults(response.data);
//         } catch (error) {
//             console.error("Error fetching recommendations:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Get Travel Recommendations</h2>
//             <RecommendationForm onSearch={fetchRecommendations} />
//             <RecommendationsList results={results} />
//         </div>
//     );
// };

// export default Recommendations;

import React, { useState } from 'react';
import axios from 'axios';
import "../styles/Recomendations.css";
import "../styles/RecommendationForm.css";
import "../styles/RecommendationList.css";

const Recommendations = () => {
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRecommendations = async () => {
        if (!budget || !location) return;
        
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:5000/recommend?user_id=1&budget=${budget}&location=${location}`);

            setResults(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="recommendations-container">
            <h2 className="recommendations-title">Find Your Perfect Travel Package</h2>
            
            <div className="search-form">
                <div className="search-row">
                    <input 
                        type="number" 
                        className="search-input" 
                        placeholder="Your Budget ($)" 
                        value={budget} 
                        onChange={(e) => setBudget(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Destination" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                    />
                </div>
                <button 
                    className="search-button" 
                    onClick={fetchRecommendations}
                    disabled={isLoading}
                >
                    {isLoading ? 'Searching...' : 'Find Packages'}
                </button>
            </div>

            {results.length > 0 ? (
                <ul className="packages-list">
                    {results.map((pkg, index) => (
                        <li 
                            key={index} 
                            className="package-card" 
                            style={{"--index": index}}
                        >
                            <div className="package-header">
                                <h3 className="package-title">Package {index + 1}</h3>
                                <div className="package-price">${pkg.total_price}</div>
                            </div>
                            <div className="package-details">
                                <div className="detail-item">
                                    <div className="detail-label">Hotel</div>
                                    <div className="detail-value">{pkg.hotel.name}</div>
                                    <div className="detail-price">${pkg.hotel.price}</div>
                                </div>
                                <div className="detail-item">
                                    <div className="detail-label">Guide</div>
                                    <div className="detail-value">{pkg.guide.name}</div>
                                    <div className="detail-price">${pkg.guide.price}</div>
                                </div>
                                <div className="detail-item">
                                    <div className="detail-label">Vehicle</div>
                                    <div className="detail-value">{pkg.vehicle.name}</div>
                                    <div className="detail-price">${pkg.vehicle.price}</div>
                                </div>
                            </div>
                            <button className="Recommendations button">Book Now</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-results">
                    {isLoading ? 'Searching for packages...' : 'Enter your budget and location to find packages.'}
                </p>
            )}
        </div>
    );
};

export default Recommendations;