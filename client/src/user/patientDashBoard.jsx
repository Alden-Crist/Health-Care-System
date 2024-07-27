import React from "react";
import './Patient.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import applogo from '../appl.png';

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
           
            
            <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/PatientDashBoard" className="nav-link">Profile</NavLink></li>
            <li><NavLink to="/Predictor" className="nav-link">Predictor</NavLink></li>
            <button onClick={handleConsultDoctor} className="nav-link">ConsultDoctor</button>
            <li><NavLink to="/Appointments" className="nav-link">Appointments</NavLink></li>
            <button onClick={handleLogout} className="nav-link_logout-button">Logout</button>
           
          </ul>
          </div>
        </nav>
      </header>
            <div className="dataa">
                <h2>Welcome, {patientName}</h2>
            </div>
            <div className="footer">copyright@HealthCareSolutions2024</div>
        </div>
    );
};

export default PatientDashBoard;
