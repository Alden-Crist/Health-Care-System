import React from "react";
import './Patient.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import applogo from '../applogo.png';

const PatientDashBoard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { patientName } = location.state || {};

    const handleLogout = () => {
        // Remove the user ID from localStorage
        localStorage.removeItem('user_id');
        
        // Navigate to the Home page
        navigate('/Home');
    };

    const handleConsultDoctor = () => {
        // Navigate to ConsultDoctor and pass patientName
        navigate('/ConsultDoctor', { state: { patientName } });
    };

    return (
        <div className="maindiv">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/PatientDashBoard' className="nav-link">Profile</NavLink>
                    <NavLink to='/Predictor' className="nav-link">Predictor</NavLink>
                    <button onClick={handleConsultDoctor} className="nav-link">ConsultDoctor</button>
                    <NavLink to='/Appointments' className="nav-link">Appointments</NavLink>
                    <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                </div>
            </nav>
            <div className="dataa">
                <h2>Welcome, {patientName}</h2>
            </div>
            <div className="footer">copyright@HealthCareSolutions2024</div>
        </div>
    );
};

export default PatientDashBoard;
