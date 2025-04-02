

// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import SearchBar from "./components/SearchBar";
// import Destinations from "./components/Destinations";
// import Footer from "./components/Footer";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserProfile from "./pages/UserProfile";
// import Recommendations from "./pages/Recommendations";
// import ServiceRegistration from "./pages/ServiceRegistration";
// import AdminDashboard from "./pages/AdminDashboard";
// import ServiceRequests from "./pages/ServiceRequests";
// import GuideProfile from "./pages/GuideProfile";
// import HotelOwnerProfile from "./pages/HotelOwnerProfile";
// import DriverProfile from "./pages/DriverProfile";

// function App({ user, setUser }) {
//   const location = useLocation();

//   // Profile route mapping based on backend roles
//   const profileRoutes = {
//     ROLE_GUIDE: "/guide_profile",
//     ROLE_HOTEL_OWNER: "/hotel_owner_profile",
//     ROLE_DRIVER: "/driver_profile",
//     USER: "/user_profile"
//   };

//   // Get correct profile route
//   const userProfileRoute = profileRoutes[user?.role] || "/user_profile";
//   const isProfilePage = location.pathname === userProfileRoute;

//   return (
//     <div>
//       <Navbar 
//         user={user} 
//         setUser={setUser} 
//         isProfilePage={isProfilePage}
//         userProfileRoute={userProfileRoute}
//       />

//       <Routes>
//         <Route path="/" element={<><HeroSection /><SearchBar /><Destinations /></>} />
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/recommendations" element={<Recommendations />} />
//         <Route path="/service-registration" element={<ServiceRegistration />} />

//         {/* Profile Pages */}
//         <Route path="/user_profile" element={<UserProfile user={user} />} />
//         <Route path="/guide_profile" element={<GuideProfile user={user} />} />
//         <Route path="/hotel_owner_profile" element={<HotelOwnerProfile user={user} />} />
//         <Route path="/driver_profile" element={<DriverProfile user={user} />} />

//         {/* Admin Routes */}
//         <Route path="/admin" element={<AdminDashboard />} />
//         <Route path="/admin/service-requests" element={<ServiceRequests />} />

//         {/* Redirect legacy profile route */}
//         <Route path="/profile" element={<Navigate to={userProfileRoute} />} />
//       </Routes>

//       <Footer />
//     </div>
//   );
// }

// function AppWrapper() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:8080/auth/session", { withCredentials: true })
//       .then(response => {
//         if (response.data?.id) {
//           console.log("User role:", response.data.role); // Verify role in console
//           setUser(response.data);
//         }
//       })
//       .catch(() => setUser(null));
//   }, []);

//   return (
//     <Router>
//       <App user={user} setUser={setUser} />
//     </Router>
//   );
// }

// export default AppWrapper;



import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./pages/UserProfile";

import Recommendations from './pages/Recommendations';
import ServiceRegistration from './pages/ServiceRegistration';
import VehicleRegistrationForm from './pages/VehicleRegistrationForm';
import VehiclePreview from "./pages/VehiclePreview";
import VehiclePage from "./pages/VehiclePage";



import AdminDashboard from "./pages/AdminDashboard";
import ServiceRequests from "./pages/ServiceRequests";
import GuideProfile from "./pages/GuideProfile";
import HotelOwnerProfile from "./pages/HotelOwnerProfile";
import DriverProfile from "./pages/DriverProfile";
import PlacesManagement from './pages/admin/PlacesManagement';
import EditPlace from './pages/admin/EditPlace';


function App({ user, setUser }) {
  const location = useLocation();

  
  // Check if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Profile route mapping
  const profileRoutes = {
    ROLE_GUIDE: "/guide_profile",
    ROLE_HOTEL_OWNER: "/hotel_owner_profile",
    ROLE_DRIVER: "/driver_profile",
    USER: "/user_profile"

  };

  const userProfileRoute = profileRoutes[user?.role] || "/user_profile";
  const isProfilePage = location.pathname === userProfileRoute;

  return (
    <div>
      {/* Conditionally render navbar */}
      {!isAdminRoute && (
        <Navbar 
          user={user} 
          setUser={setUser} 
          isProfilePage={isProfilePage}
          userProfileRoute={userProfileRoute}
        />
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><HeroSection /><SearchBar /><Destinations /></>} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommendations" element={<Recommendations />} />

       
        <Route path="/vehicle-registration" element={<VehicleRegistrationForm />} />
        <Route path="/vehicle-preview" element={<VehiclePreview/>}/>
        <Route path="/vehicle-page/:vehicleId" element={<VehiclePage/>}/>
        

        <Route path="/service-registration" element={<ServiceRegistration />} />

        {/* Profile Routes */}
        <Route path="/user_profile" element={<UserProfile user={user} />} />
        <Route path="/guide_profile" element={<GuideProfile user={user} />} />
        <Route path="/hotel_owner_profile" element={<HotelOwnerProfile user={user} />} />
        <Route path="/driver_profile" element={<DriverProfile user={user} />} />

        {/* Admin Routes (no navbar) */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/service-requests" element={<ServiceRequests />} />

        {/* Redirects */}
        <Route path="/profile" element={<Navigate to={userProfileRoute} />} />


        {/*place_manage*/}
        <Route path="/admin/places" element={<PlacesManagement />} />
        <Route path="/admin/places/edit/:id" element={<EditPlace />} />


      </Routes>

      {/* Conditionally render footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppWrapper() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8080/auth/session", { withCredentials: true })
      .then(response => {
        if (response.data?.id) {
          setUser(response.data);
        }
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <App user={user} setUser={setUser} />
    </Router>
  );
}

export default AppWrapper;