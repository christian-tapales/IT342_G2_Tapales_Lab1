import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('main');
    const [loading, setLoading] = useState(true);
    // 🕵️ ACTIVE SECURITY CHECK
    useEffect(() => {
        const verifySession = async () => {
            try {
                // This triggers the GET /api/auth/me request in your Network tab
                const response = await axios.get('http://localhost:8080/api/auth/me', {
                    withCredentials: true // CRITICAL: Sends the JSESSIONID cookie back to the server
                });
                
                // If successful, update localStorage with the most fresh data from the DB
                localStorage.setItem('user', JSON.stringify(response.data));
                setLoading(false);
            } catch (err) {
                // If the cookie is missing or session expired (401), kick them out
                console.error("Unauthorized: Session badge invalid.");
                localStorage.removeItem('user');
                navigate('/login');
            }
        };

        verifySession();
    }, [navigate]);

    const user = JSON.parse(localStorage.getItem('user')) || {
        firstName: 'Agent',
        lastName: 'Unknown',
        email: 'Classified'
    };

    // New handleLogout that talks to the server
const handleLogout = async () => {
    try {
        await axios.post('http://localhost:8080/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
        console.error("Logout failed on server");
    }
    localStorage.removeItem('user');
    navigate('/login');
};

    // CRITICAL: If still loading, don't show the dashboard content!
    if (loading) {
        return (
            <div style={{ backgroundColor: '#0b0d0f', color: '#d4af37', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>SCANNING AGENT CREDENTIALS...</h1>
            </div>
        );
    }

    if (!localStorage.getItem('user')) return null;

    return (
        <div className="dashboard-layout">
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