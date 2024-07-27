import React, { useState } from "react";
import './Doctor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';
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
            <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="applogo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/Home" className="nav-link">Back</NavLink></li>
            <li><NavLink to="/Doctor" className="nav-link">Doctor</NavLink></li>
            
          </ul>
          </div>
        </nav>
      </header>
            <div className="container">
                <div className="doctor-signup">
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
            </div>
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@HealthCareSolutions2024
            </div>
        </div>
    );
};

export default Doctor;
