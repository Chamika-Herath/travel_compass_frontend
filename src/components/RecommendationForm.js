import React, { useState } from 'react';
import "../styles/RecommendationForm.css";

const RecommendationForm = ({ onSearch }) => {
    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (budget && location) {
            onSearch(budget, location);
        }
    };

    return (
        <div className="recommendation-form">
            <h3 className="form-title">Find Your Perfect Destination</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <div className="input-container">
                        <input 
                            type="number" 
                            placeholder="Enter your budget" 
                            value={budget} 
                            onChange={(e) => setBudget(e.target.value)} 
                            required 
                        />
                        <span className="input-label">Budget</span>
                    </div>
                    <div className="input-container">
                        <input 
                            type="text" 
                            placeholder="Where do you want to go?" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            required 
                        />
                        <span className="input-label">Location</span>
                    </div>
                </div>
                <button className="submit-button" type="submit">Get Recommendations</button>
            </form>
        </div>
    );
};

export default RecommendationForm;
