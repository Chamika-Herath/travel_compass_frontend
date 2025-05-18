

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import HeroSection from "./HeroSection"; // Background Hero Section
// import "../styles/login.css";

// const Login = ({ setUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const response = await axios.post(
//         "http://localhost:8081/auth/login",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (response.status === 200 && response.data) {
//         const { role } = response.data;
//         setUser(response.data); // ✅ Set logged-in user

//         // ✅ Redirect Based on Role
//         switch (role) {
//           case "ROLE_USER":
//             navigate("/user_profile");
//             break;
//           case "ROLE_GUIDE":
//             navigate("/guide_profile");
//             break;
//           case "ROLE_HOTEL_OWNER":
//             navigate("/hotel_owner_profile");
//             break;
//           case "ROLE_DRIVER":
//             navigate("/driver_profile");
//             break;
//           case "ROLE_ADMIN":
//             navigate("/admin");
//             break;
//           default:
//             navigate("/user_profile"); // Fallback
//         }
//       }
//     } catch (err) {
//       console.error("Login error:", err.response ? err.response.data : err.message);

//       if (err.response && err.response.status === 401) {
//         setError("Invalid email or password. Please try again.");
//       } else {
//         setError("Something went wrong. Please try again later.");
//       }
//     }
//   };

//   return (
//     <div className="login-page">
//       <HeroSection /> {/* Background Hero Section */}
      

//       <div className="login-container">
//         <div className="login-box">
//           <h2>Login</h2>
//           {error && <p className="error">{error}</p>}
//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button type="submit">Log In</button>
//           </form>
//           <p>
//             Don't have an account? <a href="/register">Sign Up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import HeroSection from "./HeroSection";
import "../styles/login.css";

// Initialize modal root (add to your main App.js)
Modal.setAppElement('#root');

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Forgot Password States
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // UI States
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentView, setCurrentView] = useState("login"); // login, request-otp, reset-password
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post(
        "http://localhost:8081/auth/login",
        {
          email: loginEmail,
          password: loginPassword
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(response.data);
        handleRoleRedirect(response.data.role);
      }
    } catch (err) {
      handleLoginError(err);
    }
  };

  // Handle Password Reset Request
  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await axios.post("http://localhost:8081/auth/forgot-password", {
        email: resetEmail
      });
      setSuccessMessage(`OTP sent to ${resetEmail}`);
      setCurrentView("reset-password");
      setIsModalOpen(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8081/auth/reset-password?email=${resetEmail}`,
        {
          otp,
          newPassword
        }
      );
      setSuccessMessage("Password reset successfully! Please login with your new password");
      resetAllStates();
      setIsModalOpen(true);
      setCurrentView("login");
    } catch (err) {
      setError(err.response?.data?.message || "Password reset failed");
    }
  };

  // Helper Functions
  const handleRoleRedirect = (role) => {
    const routes = {
      "ROLE_USER": "/user_profile",
      "ROLE_GUIDE": "/guide_profile",
      "ROLE_HOTEL_OWNER": "/hotel_owner_profile",
      "ROLE_DRIVER": "/driver_profile",
      "ROLE_ADMIN": "/admin"
    };
    navigate(routes[role] || "/");
  };

  const handleLoginError = (err) => {
    const errorMessage = err.response?.status === 401 
      ? "Invalid email or password" 
      : "Login failed. Please try again later.";
    setError(errorMessage);
  };

  const resetAllStates = () => {
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="login-page">
      <HeroSection />

      <div className="login-container">
        <div className="login-box">
          <h2>{currentView === "login" ? "Login" : "Reset Password"}</h2>
          
          {error && <div className="error-message">{error}</div>}

          {currentView === "login" ? (
            <LoginForm 
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
              handleLogin={handleLogin}
              switchView={() => setCurrentView("request-otp")}
            />
          ) : currentView === "request-otp" ? (
            <OtpRequestForm
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              handleSubmit={handlePasswordResetRequest}
              switchView={() => setCurrentView("login")}
            />
          ) : (
            <PasswordResetForm
              otp={otp}
              setOtp={setOtp}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              handleSubmit={handlePasswordReset}
              switchView={() => setCurrentView("login")}
              resetEmail={resetEmail}
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="modal-content">
          <h3>{successMessage}</h3>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

// Sub Components
const LoginForm = ({ 
  loginEmail, setLoginEmail,
  loginPassword, setLoginPassword,
  handleLogin, switchView
}) => (
  <>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
    <div className="login-links">
      <p>Don't have an account? <a href="/register">Register</a></p>
      <a href="#" onClick={(e) => { e.preventDefault(); switchView(); }} className="link-text">
      Forgot Password?
      </a>


    </div>
  </>
);

const OtpRequestForm = ({ 
  resetEmail, setResetEmail, 
  handleSubmit, switchView 
}) => (
  <form onSubmit={handleSubmit}>
    <p>Enter your registered email to receive an OTP</p>
    <input
      type="email"
      placeholder="Your email address"
      value={resetEmail}
      onChange={(e) => setResetEmail(e.target.value)}
      required
    />
    <div className="form-actions">
      <button type="submit">Send OTP</button>
      <button type="button" className="secondary" onClick={switchView}>
        Back to Login
      </button>
    </div>
  </form>
);

const PasswordResetForm = ({
  otp, setOtp,
  newPassword, setNewPassword,
  confirmPassword, setConfirmPassword,
  handleSubmit, switchView, resetEmail
}) => (
  <form onSubmit={handleSubmit}>
    <p>OTP sent to {resetEmail}</p>
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))} // Numbers only
      required
    />
    <input
      type="password"
      placeholder="New Password (min 6 characters)"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      minLength={6}
      required
    />
    <input
      type="password"
      placeholder="Confirm New Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      minLength={6}
      required
    />
    <div className="form-actions">
      <button type="submit">Reset Password</button>
      <button type="button" className="secondary" onClick={switchView}>
        Cancel
      </button>
    </div>
  </form>
);

export default Login;
