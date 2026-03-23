import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Resume Analyzer</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/admin">Admin</Link>
        {username && (
          <button 
            onClick={handleLogout} 
            className="logout-btn"
            style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: '#ef4444', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              padding: '0.4rem 0.8rem',
              fontSize: '0.9rem',
              width: 'auto',
              boxShadow: 'none',
              marginLeft: '0.5rem'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;