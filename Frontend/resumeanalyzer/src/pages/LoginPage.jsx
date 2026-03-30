import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

function LoginPage(){
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  return(
    <div className="login-page">
      <div className="auth-container">
        {showRegister ? (
          <Register onSuccess={handleRegisterSuccess} onSwitchToLogin={handleSwitchToLogin} />
        ) : (
          <Login onLogin={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;