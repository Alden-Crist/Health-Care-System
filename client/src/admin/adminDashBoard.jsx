// src/home/Home.jsx
import React from "react";
import './Admin.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../applogo.png';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        navigate('/Home'); // Navigate to Home after logout
    };

    return (
        <div className="maindiv">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/PatientRecord' className="nav-link">Patients</NavLink>
                    <NavLink to='/DoctorRecord' className="nav-link">Doctors</NavLink>
                    <NavLink to='/MlRecord' className="nav-link">ML Evaluations</NavLink>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="dataa">
                {/* Display your dashboard content here */}
            </div>
            <div className="footer">copyright@HealthCareSolutions2024</div>
        </div>
    );
}

export default AdminDashboard;
