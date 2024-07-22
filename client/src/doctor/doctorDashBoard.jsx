import React from "react";
import './Doctor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../applogo.png';

const DoctorDashBoard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('doctorId'); // Remove doctorId from localStorage
        navigate('/Home'); 
    };

    return (
        <div className="maindiv">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/DoctorDashBoard' className="nav-link">Profile</NavLink>
                    <NavLink to='/DoctorAppointments' className="nav-link">Appointments</NavLink>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="dataa">
                {/* Additional content for Doctor Dashboard */}
            </div>
            <div className="footer">copyright@healthcaresolutions2024</div>
        </div>
    );
}

export default DoctorDashBoard;

