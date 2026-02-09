import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validate matching passwords (FRS Requirement)
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            // 2. Payload matches your current DB columns
            const payload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password
            };

            const response = await axios.post('http://localhost:8080/api/auth/register', payload);
            
            if (response.status === 201 || response.status === 200) {
                alert("Registration Successful!");
                navigate('/login');
            }
        } catch (error) {
            // If this still says "Server Error", check your IntelliJ console for SQL errors
            alert("Registration Failed: " + (error.response?.data || "Server Error"));
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required style={inputStyle} />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required style={inputStyle} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={inputStyle} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={inputStyle} />
                
                {/* Additional Confirmation Password Text Box */}
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={inputStyle} />
                
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
};

const inputStyle = { display: 'block', width: '100%', marginBottom: '10px', padding: '10px', boxSizing: 'border-box' };
const buttonStyle = { width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default Register;