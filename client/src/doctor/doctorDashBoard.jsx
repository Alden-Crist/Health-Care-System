import React from "react";
import './Doctor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../appl.png';

const DoctorDashBoard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('doctorId'); // Remove doctorId from localStorage
        navigate('/Home'); 
    };

    return (
        <div className="maindiv">
            <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="applogo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/DoctorDashBoard" className="nav-link">Profile</NavLink></li>
            <li><NavLink to="/DoctorAppointments" className="nav-link">Appointments</NavLink></li>
            <button className="nav-link" onClick={handleLogout}>Logout</button>
          </ul>
          </div>
        </nav>
      </header>
            <div className="dataa">
                {/* Additional content for Doctor Dashboard */}
            </div>
            <div className="footer">copyright@healthcaresolutions2024</div>
        </div>
    );
}

export default DoctorDashBoard;

