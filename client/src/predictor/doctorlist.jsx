import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './predictor-css/Doctorlist.css';
import { NavLink } from 'react-router-dom';
import applogo from '../appl.png';
import { useNavigate } from 'react-router-dom';
const DoctorList = () => {
    const location = useLocation();
    const { city } = location.state;
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/v1/doctors?city=${city}`)
            .then((response) => {
                console.log('Full API Response:', response);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data);
                } else {
                    console.error('Response data format:', response.data);
                    setError('Invalid response format');
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching doctors:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [city]);


    const navigate = useNavigate();

        const handleBookAppointment = (doctor) => {
            navigate('/BookAppointment', { state: { doctor } });
        };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
            <div className="doctor-list">
                <h1>Doctors in {city}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Qualifications</th>
                            <th>Specialization</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor._id}>
                                <td>{doctor.name}</td>
                                <td>{doctor.gender}</td>
                                <td>{doctor.qualifications}</td>
                                <td>{doctor.specialization}</td>
                                <td>{doctor.mobile}</td>
                                <td>
                                    <button onClick={() => handleBookAppointment(doctor)}>
                                        Book Appointment
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorList;
