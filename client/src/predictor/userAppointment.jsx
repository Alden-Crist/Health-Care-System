import React from 'react';
import { useLocation } from 'react-router-dom';
import './predictor-css/UserAppointments.css';
import { NavLink } from 'react-router-dom';
import applogo from '../appl.png';

const UserAppointments = () => {
    const location = useLocation();
    const { state } = location;
    const appointments = state ? [state] : [];

    return (
        <div className="maindiv1">
        <header id="header">
                <nav>
                    <div className="logo">
                        <img src={applogo} alt="applogo" className="logo-img" />
                    </div>
                    <div className ="admin-nav">
                        <ul className="nav-links">
                            <li><NavLink to="/PatientDashBoard" className="nav-link">DashBoard</NavLink></li>
                            <li><NavLink to="/Prdictor" className="nav-link">Predictor</NavLink></li>
                            
                        </ul>
                    </div>
                </nav>
            </header>
        <div className="appointments-table">
            <h1>Your Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        
                        <th>Appointment Date</th>
                        <th>Status</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.doctorName}</td>
                      
                            <td>{appointment.date}</td>
                            <td>{appointment.status}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default UserAppointments;
