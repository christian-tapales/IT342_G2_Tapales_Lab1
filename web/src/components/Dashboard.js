import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('main'); // State to toggle views

    const user = JSON.parse(localStorage.getItem('user')) || {
        firstName: 'Agent',
        lastName: 'Unknown',
        email: 'Classified'
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">
            {/* LEFT SIDEBAR */}
            <div className="sidebar">
                <h2 style={{ fontSize: '1.2rem', padding: '0 25px' }}>MINI APP</h2>
                <button 
                    className={`sidebar-btn ${activeTab === 'main' ? 'active' : ''}`}
                    onClick={() => setActiveTab('main')}
                >
                    MAIN DASHBOARD
                </button>
                <button 
                    className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    PROFILE
                </button>
                
                <button 
                    className="sidebar-btn" 
                    style={{ marginTop: 'auto', color: '#ff4d4d' }} 
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="main-content">
                {activeTab === 'main' ? (
                    <div className="fade-in">
                        <h1>WELCOME, AGENT {user.lastName.toUpperCase()}</h1>
                        <hr style={{ borderColor: '#333' }} />
                        <div style={{ background: '#1a1d21', padding: '20px', marginTop: '20px', border: '1px solid #d4af37' }}>
                            <h3 style={{ color: '#1be836' }}>CURRENT STATUS: ACTIVE</h3>
                            <p>System integration with <strong>MySQL userauth_db</strong> is stable.</p>
                            <p>Security Protocols: <strong>BCrypt Encryption</strong> engaged.</p>
                        </div>
                    </div>
                ) : (
                    <div className="fade-in">
                        <h1>IDENTIFICATION CARD</h1>
                        <hr style={{ borderColor: '#333' }} />
                        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                            <div style={{ width: '150px', height: '180px', background: '#333', border: '2px solid #d4af37' }}>
                                {/* Placeholder for Agent Photo */}
                                <p style={{ fontSize: '10px', textAlign: 'center', marginTop: '70px' }}>PHOTO CLASSIFIED</p>
                            </div>
                            <div>
                                <p><strong>CODE NAME:</strong> {user.firstName} {user.lastName}</p>
                                <p><strong>CONTACT:</strong> {user.email}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;