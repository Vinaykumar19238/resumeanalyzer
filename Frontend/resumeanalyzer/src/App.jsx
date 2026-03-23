import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import JobList from "./components/JobList";
import Recommendations from "./components/Recommendations";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import AIChatbot from "./components/AIChatbot";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('username');
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('username');
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

function App() {

    return (

        <Router>

            <Navbar />

            <Routes>

                <Route path="/" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                <Route path="/jobs" element={<ProtectedRoute><JobList /></ProtectedRoute>} />
                <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />

            </Routes>

            <AIChatbot />

        </Router>

    );

}

export default App;