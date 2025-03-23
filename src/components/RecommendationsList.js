import React from 'react';
import "../styles/Recomendations.css";
import "../styles/RecommendationForm.css";
import "../styles/RecommendationList.css";

const RecommendationsList = ({ results }) => {
    return (
        <div>
            <h3>Recommendations</h3>
            {results.length === 0 ? <p>No recommendations found.</p> : (
                <ul>
                    {results.map((item, index) => (
                        <li key={index}>
                            <strong>{item.name}</strong> - ${item.price} <br />
                            {item.service_type} | {item.location} <br />
                            {item.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RecommendationsList;
