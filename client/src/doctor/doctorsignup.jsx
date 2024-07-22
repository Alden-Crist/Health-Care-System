import React, { useState } from "react";
import './Doctor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../applogo.png';
import axios from 'axios';

const DoctorSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        city: '',
        specialization: '',
        qualifications: '',
        experience: '',
        licenseNumber: '',
        hospital: '',
        daysAvailable: '',
        timeSlots: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        // Prepare data to be sent to the database
        const dataToSend = {
            ...formData,
            dateOfBirth: new Date(formData.dateOfBirth).toISOString(),
            daysAvailable: formData.daysAvailable.split(',').map(day => day.trim()),
            timeSlots: formData.timeSlots.split(',').map(slot => slot.trim()),
            experience: Number(formData.experience)
        };
        delete dataToSend.confirmPassword;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/doctors`, dataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                // Extract doctorId from the response
                const doctorId = response.data.data.doctor._id; // Adjust according to your response structure
                // Store doctor ID in local storage
                localStorage.setItem('doctorId',doctorId);
                navigate('/DoctorDashboard');
            } else {
                setErrorMessage('Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Sign up failed. Please try again.');
        }
    };

    return (
        <div className="maindiv2">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/Home' className="nav-link">Back</NavLink>
                    <NavLink to='/DoctorSignUp' className="nav-link">Doctor Sign Up</NavLink>
                </div>
            </nav>
            <div className="container">
                <div className="breadcrumb">
                    <a href="/Home">Home</a>
                    <a href="/DoctorSignUp">Doctor Sign Up</a>
                </div>
                <h2>Doctor Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label htmlFor="name">
                            Doctor Name: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">
                            Date of Birth: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">
                            Gender: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">
                            City: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialization">
                            Specialization: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="qualifications">
                            Qualifications: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="qualifications"
                            name="qualifications"
                            value={formData.qualifications}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="experience">
                            Experience: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="number"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="licenseNumber">
                            License Number: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hospital">Hospital:</label>
                        <input
                            type="text"
                            id="hospital"
                            name="hospital"
                            value={formData.hospital}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="daysAvailable">
                            Days Available: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="daysAvailable"
                            name="daysAvailable"
                            value={formData.daysAvailable}
                            onChange={handleChange}
                            placeholder="e.g., Monday, Wednesday, Friday"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="timeSlots">
                            Time Slots: <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="timeSlots"
                            name="timeSlots"
                            value={formData.timeSlots}
                            onChange={handleChange}
                            placeholder="e.g., 09:00-11:00, 14:00-16:00"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
            <div style={{ padding: '20px', backgroundColor: 'black', textAlign: 'center', color: 'white' }}>
                copyright@symptomsdiseasepredictor2024
            </div>
        </div>
    );
};

export default DoctorSignUp;
