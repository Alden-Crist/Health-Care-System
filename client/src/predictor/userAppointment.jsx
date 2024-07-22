import React from 'react';
import { useLocation } from 'react-router-dom';
import './predictor-css/UserAppointments.css';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';

const UserAppointments = () => {
    const location = useLocation();
    const { state } = location;
    const appointments = state ? [state] : [];

    return (
        <div className="maindiv1">
        <div className="header">
            <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
        </div>
        <nav>
            <img src={applogo} alt="applogo" />
            <div className="navbar">
                <NavLink to='/PatientDashBoard' className="nav-link">DashBoard</NavLink>
                <NavLink to='/Predictor' className="nav-link">Predictor</NavLink>
            </div>
        </nav>
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
