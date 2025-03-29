
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ProfileNavbar from "./components/ProfileNavbar";
// import HeroSection from "./components/HeroSection";
// import SearchBar from "./components/SearchBar";
// import Destinations from "./components/Destinations";
// import Footer from "./components/Footer";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserProfile from "./pages/UserProfile";
// import Recommendations from './pages/Recommendations';
// import ServiceRegistration from './pages/ServiceRegistration';

// function App() {
//   const location = useLocation();

//   const renderNavbar = () => {
//     if (location.pathname === "/user_profile" || 
//       location.pathname === "/admin") {
//       return <ProfileNavbar />;
//     } else {
//       return <Navbar />;
//     }
//   };

//   return (
//     <div>
//       {renderNavbar()}
//       <Routes>
//         <Route path="/" element={
//           <>
//             <HeroSection />
//             <SearchBar />
//             <Destinations />
//           </>
//         } />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/user_profile" element={<UserProfile />} />
//         <Route path="/recommendations" element={<Recommendations />} />
//         <Route path="/service-Registration" element={<ServiceRegistration />} />
//       </Routes>
//       <Footer />
//     </div>
//   );
// }

// function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// export default AppWrapper;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import ProfileNavbar from "./components/ProfileNavbar";
import HeroSection from "./components/HeroSection";
import SearchBar from "./components/SearchBar";
import Destinations from "./components/Destinations";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./pages/UserProfile";
import Recommendations from "./pages/Recommendations";
import ServiceRegistration from "./pages/ServiceRegistration";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceRequests from "./pages/ServiceRequests";
import GuideProfile from "./pages/GuideProfile";
import HotelOwnerProfile from "./pages/HotelOwnerProfile";
import DriverProfile from "./pages/DriverProfile";

function App({ user, setUser }) {
  const location = useLocation();

  // ✅ Detect if user is in a profile route
  const isProfileRoute = ["/user_profile", "/guide_profile", "/hotel_owner_profile", "/driver_profile"].includes(location.pathname);

  // ✅ Check if the route is an admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* ✅ Change Navbar dynamically based on profile page */}
      {!isAdminRoute && (isProfileRoute ? <ProfileNavbar user={user} setUser={setUser} /> : <Navbar user={user} setUser={setUser} />)}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={
          <>
            <HeroSection />
            <SearchBar />
            <Destinations />
          </>
        } />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user_profile" element={<UserProfile user={user} />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/service-registration" element={<ServiceRegistration />} />

        {/* Profile Pages */}
        <Route path="/user_profile" element={<UserProfile user={user} />} />
        <Route path="/guide_profile" element={<GuideProfile user={user} />} />
        <Route path="/hotel_owner_profile" element={<HotelOwnerProfile user={user} />} />
        <Route path="/driver_profile" element={<DriverProfile user={user} />} />

        {/* Admin Routes - No Navbar & Footer */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/service-requests" element={<ServiceRequests />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function AppWrapper() {
  const [user, setUser] = useState(null);

  // ✅ Check session on mount and store user
  useEffect(() => {
    axios.get("http://localhost:8080/auth/session", { withCredentials: true })
      .then(response => {
        if (response.data && response.data.id) {
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
