

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import "../styles/ServiceRequests.css"; // Ensure styles are included

// const ServiceRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);

//   // ✅ Fetch all pending service requests
//   useEffect(() => {
//     axios.get("http://localhost:8081/api/service-requests/pending", { withCredentials: true })
//       .then(response => setRequests(response.data))
//       .catch(error => console.error("Error fetching requests:", error));
//   }, []);

//   // ✅ Approve or Reject a service request
//   const handleAction = (id, action) => {
//     axios.put(`http://localhost:8081/service-requests/${id}/status/${action}`, {}, { withCredentials: true })
//       .then(() => {
//         setRequests(requests.filter(req => req.id !== id)); // Remove processed request
//       })
//       .catch(error => console.error(`Error updating status to ${action}:`, error));
//   };

//   // ✅ Open modal with request details
//   const handleView = (request) => {
//     setSelectedRequest(request);
//   };

//   // ✅ Close modal
//   const closeModal = () => {
//     setSelectedRequest(null);
//   };

//   return (
//     <div className="admin-container">
//       <Sidebar />
//       <div className="admin-content">
//         <h1>Pending Service Requests</h1>
//         <table className="requests-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Service Type</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((req) => (
//               <tr key={req.id}>
//                 <td>{req.fullName}</td>
//                 <td>{req.serviceType}</td>
//                 <td>{req.status}</td>
//                 <td>
//                   <button onClick={() => handleView(req)} className="view">View</button>
//                   <button onClick={() => handleAction(req.id, "APPROVED")} className="approve">Approve</button>
//                   <button onClick={() => handleAction(req.id, "REJECTED")} className="reject">Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Modal for Viewing Request Details */}
//       {selectedRequest && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Request Details</h2>
//             <p><strong>Name:</strong> {selectedRequest.fullName}</p>
//             <p><strong>Address:</strong> {selectedRequest.address}</p>
//             <p><strong>NIC:</strong> {selectedRequest.nic}</p>
//             <p><strong>Phone Number:</strong> {selectedRequest.phoneNumber}</p>
//             <p><strong>Service Type:</strong> {selectedRequest.serviceType}</p>
//             <p><strong>Description:</strong> {selectedRequest.description}</p>
//             <p><strong>Status:</strong> {selectedRequest.status}</p>
//             <button className="close-btn" onClick={closeModal}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceRequests;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/ServiceRequests.css";

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all pending service requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/service-requests/pending", 
          { withCredentials: true }
        );
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load service requests");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  // Approve or Reject a service request
  const handleAction = async (id, action) => {
    try {
      const endpoint = action === "APPROVED" 
        ? `http://localhost:8081/api/service-requests/${id}/approve`
        : `http://localhost:8081/api/service-requests/${id}/reject`;
      
      await axios.put(endpoint, {}, { withCredentials: true });
      
      // Update UI by removing the processed request
      setRequests(requests.filter(req => req.id !== id));
      
      // Close modal if open
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest(null);
      }
    } catch (err) {
      console.error(`Error ${action.toLowerCase()}ing request:`, err);
      setError(`Failed to ${action.toLowerCase()} request`);
    }
  };

  // Open modal with request details
  const handleView = (request) => {
    setSelectedRequest(request);
  };

  // Close modal
  const closeModal = () => {
    setSelectedRequest(null);
  };

  if (loading) {
    return (
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          <h1>Pending Service Requests</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-container">
        <Sidebar />
        <div className="admin-content">
          <h1>Pending Service Requests</h1>
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Pending Service Requests</h1>
        
        {requests.length === 0 ? (
          <p>No pending service requests</p>
        ) : (
          <div class="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service Type</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.fullName}</td>
                    <td className="service-type">
                      {request.serviceType.replace(/_/g, ' ')}
                    </td>
                    <td>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td className="actions">
                      <button 
                        onClick={() => handleView(request)} 
                        className="view-btn"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleAction(request.id, "APPROVED")}
                        className="approve-btn"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(request.id, "REJECTED")}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Request Details</h2>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Full Name:</span>
                <span>{selectedRequest.fullName}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Service Type:</span>
                <span>{selectedRequest.serviceType.replace(/_/g, ' ')}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Address:</span>
                <span>{selectedRequest.address}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">NIC:</span>
                <span>{selectedRequest.nic}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span>{selectedRequest.phoneNumber}</span>
              </div>
              
              {selectedRequest.businessName && (
                <div className="detail-row">
                  <span className="detail-label">Business:</span>
                  <span>{selectedRequest.businessName}</span>
                </div>
              )}
              
              {selectedRequest.licenseNumber && (
                <div className="detail-row">
                  <span className="detail-label">License:</span>
                  <span>{selectedRequest.licenseNumber}</span>
                </div>
              )}
              
              {selectedRequest.vehicleTypes && (
                <div className="detail-row">
                  <span className="detail-label">Vehicle Types:</span>
                  <span>{selectedRequest.vehicleTypes}</span>
                </div>
              )}
              
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <p className="description">{selectedRequest.description}</p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                onClick={() => handleAction(selectedRequest.id, "APPROVED")}
                className="approve-btn"
              >
                Approve
              </button>
              <button 
                onClick={() => handleAction(selectedRequest.id, "REJECTED")}
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;