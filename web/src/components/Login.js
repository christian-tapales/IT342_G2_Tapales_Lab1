import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css'; // Import the new styles

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
            if (response.status === 200) { navigate('/dashboard'); }
        } catch (err) { alert("Invalid Credentials"); }
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email Address" 
                    onChange={e => setCredentials({...credentials, email: e.target.value})} required />
                <input type="password" placeholder="Password" 
                    onChange={e => setCredentials({...credentials, password: e.target.value})} required />
                <button type="submit">Log In</button>
            </form>
            <p className="link-text">New here? <Link to="/register">Create an account</Link></p>
        </div>
    );
};
export default Login;