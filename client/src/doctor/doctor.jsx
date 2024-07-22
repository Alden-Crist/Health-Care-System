import React, { useState } from "react";
import './Doctor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../applogo.png';
import axios from 'axios';

const Doctor = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/doctors/login`, {
                name,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('doctorId', response.data.doctorId); // Store doctor ID in local storage
                navigate('/DoctorDashboard');
            } else {
                setErrorMessage('Login failed. Please check your username and password.');
            }
        } catch (error) {
            setErrorMessage('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="maindiv2">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/Home' className="nav-link">Back</NavLink>
                    <NavLink to='/Doctor' className="nav-link">Doctor</NavLink>
                </div>
            </nav>
            <div className="container">
                <div className="breadcrumb">
                    <a href="/Home">Home</a>
                    <a href="/Doctor">Doctor Login</a>
                </div>
                <h2>Doctor</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Doctor Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p>Don't have an account? <NavLink to="/DoctorSignUp">Sign up here</NavLink></p>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@HealthCareSolutions2024
            </div>
        </div>
    );
};

export default Doctor;
