// import React from "react";
// import "../styles/footer.css"; 

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>© 2025 TravelCOMPASS. All Rights Reserved.</p>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import "../styles/footer.css"; 
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="logo">
            Travel<span>COMPASS</span>
          </h2>
          <p>Best Travel Agency</p>
        </div>

        <div className="footer-links">
          <h3>Link</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Special Offers</a></li>
            <li><a href="#">About US</a></li>
            <li><a href="#">Contacts</a></li>
          </ul>
        </div>

        <div className="footer-destinations">
          <h3>Popular Destination</h3>
          <ul>
            <li>Colombo</li>
            <li>Kandy</li>
            <li>Galle</li>
            <li>Anuradhapura</li>
            <li>Jaffna</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contacts</h3>
          <p>+94 (77) 1234 654</p>
          <p>Info@travelcompass.Com</p>
          <p>Koswatta,Battaramulla</p>
          <p>Colombo,Sri Lanka</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" className="facebook"><FaFacebookF /></a>
          <a href="#" className="twitter"><FaTwitter /></a>
          <a href="#" className="instagram"><FaInstagram /></a>
        </div>
        <p>© 2025 <a href="#">TravelCOMPASS</a>. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
