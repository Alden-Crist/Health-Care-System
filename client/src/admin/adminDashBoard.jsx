// src/home/Home.jsx
import React from "react";
import './Admin.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        navigate('/Home'); // Navigate to Home after logout
    };

    return (
        <div className="maindiv">
           
           
        <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/PatientRecord" className="nav-link">Patients</NavLink></li>
            <li><NavLink to="/DoctorRecord" className="nav-link">Doctors</NavLink></li>
            <li><NavLink to="/MlRecord" className="nav-link">ML Evaluations</NavLink></li>
            <button className="nav-link" onClick={handleLogout}>Logout</button>
          </ul>
          </div>
        </nav>
        </header>
            <div >
                <h1>Helath Care System</h1>
            </div>
            <div className="dataa">
                {/* Display your dashboard content here */}
            </div>
            <div className="footer">copyright@HealthCareSolutions2024</div>
        </div>
    );
}

export default AdminDashboard;
