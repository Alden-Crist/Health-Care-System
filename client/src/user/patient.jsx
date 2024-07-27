import React, { useState } from "react";
import './Patient.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';
import axios from 'axios';

const Patient = () => {
    const navigate = useNavigate();
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/login`, {
                name,
                password
            });

            if (response.status === 200) {
                // Extract userId from the response
                const userId = response.data.userId;

                // Store userId in localStorage
                localStorage.setItem('user_id', userId);

                // Navigate to PatientDashboard or any other route
                navigate('/PatientDashBoard');
            } else {
                console.error('Login failed:', response.data.message);
                setErrorMessage('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('Invalid username or password. Please try again.');
        }
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
            <li><NavLink to="/Home" className="nav-link">Back</NavLink></li>
            <li><NavLink to="/Patient" className="nav-link">User</NavLink></li>
           
          </ul>
          </div>
        </nav>
      </header>
            <div className="container2">
                <div className="breadcrumb">
                    <a href="/Home">Home</a>
                    <a href="/Patient">User Login</a>
                </div>
                <h2>User Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={name}
                            onChange={(e) => setUsername(e.target.value)}
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
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <p>
                    Don't have an account? <NavLink to='/Patientnew'>Sign Up</NavLink>
                </p>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@HealthCareSolutions2024
            </div>
        </div>
    );
};

export default Patient;

