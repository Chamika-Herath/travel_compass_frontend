// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import SearchBar from "./components/SearchBar";
// import Destinations from "./components/Destinations";
// import Footer from "./components/Footer";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import UserProfile from "./pages/UserProfile";
// import Recommendations from './pages/Recommendations';
// //import Packages from "./components/Packages";
// //import SpecialOffers from "./components/SpecialOffers";
// //import About from "./components/About";
// //import Contact from "./components/Contact";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={
//             <>
//               <HeroSection />
//               <SearchBar />
//               <Destinations />
//             </>
//           } />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/user_profile" element={<UserProfile />} />
//           <Route path="/recommendations" element={<Recommendations />} />
          
//         </Routes>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();

  const renderNavbar = () => {
    if (location.pathname === "/user_profile" || 
      location.pathname === "/admin") {
      return <ProfileNavbar />;
    } else {
      return <Navbar />;
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/recommendations" element={<Recommendations />} />
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