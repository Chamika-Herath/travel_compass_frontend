
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
import Recommendations from './pages/Recommendations';
import ServiceRegistration from './pages/ServiceRegistration';
import VehicleRegistrationForm from './pages/VehicleRegistrationForm';
import VehiclePreview from "./pages/VehiclePreview";
import VehiclePage from "./pages/VehiclePage";

function App() {
  const [user, setUser] = useState(null);  // Store logged-in user
  const location = useLocation();

  // Check session on mount
  useEffect(() => {
    axios.get("http://localhost:8081/auth/session", { withCredentials: true })
      .then(response => {
        if (response.data && response.data.id) {
          setUser(response.data);
        }
      })
      .catch(() => setUser(null));
  }, []);

  const renderNavbar = () => {
    if (location.pathname === "/user_profile" || location.pathname === "/admin") {
      return <ProfileNavbar user={user} setUser={setUser} />;
    } else {
      return <Navbar user={user} setUser={setUser} />;
    }
  };

  return (
    <div>
      {renderNavbar()}
      <Routes>
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
        <Route path="/service-Registration" element={<ServiceRegistration />} />
        <Route path="/vehicle-registration" element={<VehicleRegistrationForm />} />
        <Route path="/vehicle-preview" element={<VehiclePreview/>}/>
        <Route path="/vehicle-page/:vehicleId" element={<VehiclePage/>}/>
        
      </Routes>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
