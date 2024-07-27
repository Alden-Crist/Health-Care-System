import React, { useState } from "react";
import './Patient.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';
import axios from 'axios';

const Patientnew = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        passwordConfirm: '',
        dateOfBirth: '',
        gender: '',
        city: '',
        gmail: '',
        mobile: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.passwordConfirm) {
            setErrorMessage('Passwords do not match. Please re-enter.');
            return;
        }

        try {
            // Exclude passwordConfirm from data sent to backend
            const { passwordConfirm, ...postData } = formData;

            // Send data to backend API for registration
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users`, postData);

            if (response.status === 201) { // Assuming 201 Created for successful registration
                navigate('/PatientDashboard');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error messages or state here
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="maindiv2">
           
            <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/Patient" className="nav-link">Back</NavLink></li>
            <li><NavLink to="/Patientnew" className="nav-link">User Sign Up</NavLink></li>
           
          </ul>
          </div>
        </nav>
      </header>
            <div className="container">
                <div className="breadcrumb">
                    <a href="/Home">Home</a>
                    <a href="/Admin">User Login</a>
                </div>
                <h2>User Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password:</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={formData.passwordConfirm}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gmail">Email:</label>
                        <input
                            type="email"
                            id="gmail"
                            name="gmail"
                            value={formData.gmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </form>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@symptomsdiseasepredictor2024
            </div>
        </div>
    );
};

export default Patientnew;
