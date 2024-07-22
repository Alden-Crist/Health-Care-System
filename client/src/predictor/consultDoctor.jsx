import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './predictor-css/ConsultDoctor.css';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';

const ConsultDoctor = () => {
    const navigate = useNavigate();
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Save the consultation data to the database
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/v1/consultdoctors`, {
                patientName,
                patientAge,
                gender,
                city,
            })
            .then(() => {
                // Navigate to the DoctorList page with the city parameter
                navigate('/DoctorList', { state: { city } });
            })
            .catch((error) => console.error('Error saving consultation:', error));
    };

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
            <div className="consult-doctor">
                <h1>Consult Doctor</h1>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Patient Name:</label>
                        <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="Enter Patient Name"
                            required
                        />
                    </div>
                    <div>
                        <label>Patient Age:</label>
                        <input
                            type="text"
                            value={patientAge}
                            onChange={(e) => setPatientAge(e.target.value)}
                            placeholder="Enter Patient Age"
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Current City:</label>
                        <select
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            <option value="">Select City</option>
                            <option value="Mangalore">Mangalore</option>
                            <option value="Kannkanady">Kannkanady</option>
                        </select>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ConsultDoctor;
