import React, { useState } from "react";
import './Admin.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';
import axios from 'axios';

const Admin = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admins/login`, {
                name,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('adminId', response.data.adminId); 
                navigate('/AdminDashboard');
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
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/Home" className="nav-link">Back</NavLink></li>
            <li><NavLink to="/Admin" className="nav-link">Admin</NavLink></li>
           
          </ul>
          </div>
        </nav>
      </header>
            <div >
                <h1>Helath Care System</h1>
            </div>
            <div className="container1">
                <div className="breadcrumb">
                    <a href="/Home">Home</a>
                    <a href="/Admin">Admin Login</a>
                </div>
                <h2>Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Admin Name:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={name}
                            onChange={(e) => setUsername(e.target.value)}
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
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
           
           
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@HealthCareSolutions2024
            </div>
        </div>
    );
};

export default Admin;





