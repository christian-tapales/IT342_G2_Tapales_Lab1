import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    const navigate = useNavigate();
    // Retrieve the user data we saved during login
    const user = JSON.parse(localStorage.getItem('user')) || {
        firstName: 'Guest',
        lastName: 'User',
        email: 'Not available'
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear data on logout
        navigate('/login');
    };

    return (
        <div className="auth-container" style={{ maxWidth: '500px' }}>
            <h2>Mini App Dashboard</h2>
            
            {/* User Profile Section - Matches FRS Entity Fields */}
            <div style={sectionStyle}>
                <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>User Profile</h3>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            {/* System Status Section */}
            <div style={{ ...sectionStyle, background: '#eef9f1', border: '1px solid #c3e6cb' }}>
                <p><strong>Status:</strong> Authentication Verified ✅</p>
                <p><strong>Security:</strong> BCrypt Hashing Active</p>
            </div>

            <button style={{ marginTop: '20px', backgroundColor: '#dc3545' }} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

const sectionStyle = { 
    textAlign: 'left', 
    background: '#f9f9f9', 
    padding: '20px', 
    borderRadius: '8px', 
    marginBottom: '15px' 
};

export default Dashboard;