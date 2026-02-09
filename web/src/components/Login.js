import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
        
        // Check if response.data is an object containing firstName
        if (response.data && response.data.firstName) {
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/dashboard');
        } else {
            alert("Backend didn't send user details!");
        }
    } catch (err) {
        alert("Login Failed");
    }
};

    return (
        <div className="auth-container">
            <h2>Welcome to Mini App</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email Address" 
                    onChange={e => setCredentials({...credentials, email: e.target.value})} required />
                <input type="password" placeholder="Password" 
                    onChange={e => setCredentials({...credentials, password: e.target.value})} required />
                <button type="submit">Log In</button>
            </form>
            {/* Navigates to Register page */}
            <p className="link-text">
                Don't have an account? <Link to="/register">Create an account</Link>
            </p>
        </div>
    );
};
export default Login;