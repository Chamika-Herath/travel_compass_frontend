// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import "../styles/ServiceRequests.css"; // Ensure styles are included

// const ServiceRequests = () => {
//   const [requests, setRequests] = useState([]);

//   // ✅ Fetch all pending service requests
//   useEffect(() => {
//     axios.get("http://localhost:8080/service-requests/pending", { withCredentials: true })
//       .then(response => setRequests(response.data))
//       .catch(error => console.error("Error fetching requests:", error));
//   }, []);

//   // ✅ Approve or Reject a service request
//   const handleAction = (id, action) => {
//     axios.put(`http://localhost:8080/service-requests/${id}/status/${action}`, {}, { withCredentials: true })
//       .then(() => {
//         setRequests(requests.filter(req => req.id !== id)); // Remove processed request
//       })
//       .catch(error => console.error(`Error updating status to ${action}:`, error));
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
//                   <button onClick={() => handleAction(req.id, "APPROVED")} className="approve">Approve</button>
//                   <button onClick={() => handleAction(req.id, "REJECTED")} className="reject">Reject</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ServiceRequests;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/ServiceRequests.css"; // Ensure styles are included

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // ✅ Fetch all pending service requests
  useEffect(() => {
    axios.get("http://localhost:8081/service-requests/pending", { withCredentials: true })
      .then(response => setRequests(response.data))
      .catch(error => console.error("Error fetching requests:", error));
  }, []);

  // ✅ Approve or Reject a service request
  const handleAction = (id, action) => {
    axios.put(`http://localhost:8081/service-requests/${id}/status/${action}`, {}, { withCredentials: true })
      .then(() => {
        setRequests(requests.filter(req => req.id !== id)); // Remove processed request
      })
      .catch(error => console.error(`Error updating status to ${action}:`, error));
  };

  // ✅ Open modal with request details
  const handleView = (request) => {
    setSelectedRequest(request);
  };

  // ✅ Close modal
  const closeModal = () => {
    setSelectedRequest(null);
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <h1>Pending Service Requests</h1>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Service Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.fullName}</td>
                <td>{req.serviceType}</td>
                <td>{req.status}</td>
                <td>
                  <button onClick={() => handleView(req)} className="view">View</button>
                  <button onClick={() => handleAction(req.id, "APPROVED")} className="approve">Approve</button>
                  <button onClick={() => handleAction(req.id, "REJECTED")} className="reject">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for Viewing Request Details */}
      {selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Request Details</h2>
            <p><strong>Name:</strong> {selectedRequest.fullName}</p>
            <p><strong>Address:</strong> {selectedRequest.address}</p>
            <p><strong>NIC:</strong> {selectedRequest.nic}</p>
            <p><strong>Phone Number:</strong> {selectedRequest.phoneNumber}</p>
            <p><strong>Service Type:</strong> {selectedRequest.serviceType}</p>
            <p><strong>Description:</strong> {selectedRequest.description}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <button className="close-btn" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceRequests;

