import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';
import './predictor-css/BookAppointment.css';

const BookAppointment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctor } = location.state || {};
    const [patientName, setPatientName] = useState('');
  
  
    useEffect(() => {
        const fetchPatientName = async () => {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`);
                    const user = await response.json();
                    if (user && user.name) {
                        setPatientName(user.name);
                    }
                } catch (error) {
                    console.error('Error fetching patient data:', error);
                }
            }
        };

        fetchPatientName();
    }, []);

    if (!doctor) {
        return <div>No doctor selected</div>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentDate = event.target.appointmentDate.value;

        try {
            // Fetch user data by patient name
            const userId = localStorage.getItem('user_id');
            

            const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`);
            const user = await userResponse.json();
            if (!user) {
                console.error('Patient not found');
                return;
            }

            const doctorResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/doctors?name=${doctor.name}`);
            const doctors = await doctorResponse.json();
            if (!doctors.length) {
                console.error('Doctor not found');
                return;
            }

            const newAppointment = {
                doctorName: doctor.name,
                date: appointmentDate,
                status: 'Pending',
            };

            const newAppointment1 = {
                patientName: user.name,
                date: appointmentDate,
                status: 'Pending',
            };

            let updatedAppointments;
            if (user.appointmentRequests) {
                updatedAppointments = [...user.appointmentRequests, newAppointment];
            } else {
                updatedAppointments = [newAppointment];
            }

            let updatedAppointments1;
            if (doctor.appointmentRequests) {
                updatedAppointments1 = [...doctor.appointmentRequests, newAppointment1];
            } else {
                updatedAppointments1 = [newAppointment1];
            }

            // Update the user's appointment data
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentRequests: updatedAppointments,
                }),
            });

            const updateResponse1 = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/doctors/${doctor._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentRequests: updatedAppointments1,
                }),
            });

            if (updateResponse.ok && updateResponse1.ok) {
                // Navigate to the user's appointments page with appointment details
                navigate('/UserAppointments', { state: newAppointment });
            } else {
                console.error('Failed to update appointment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="maindiv1">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/PatientDashBoard' className="nav-link">PatientDashBoard</NavLink>
                    <NavLink to='/Predictor' className="nav-link">Predictor</NavLink>
                </div>
            </nav>
            <div className="appointment-form">
                <h1>Book Appointment with Dr. {doctor.name}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Patient Name:
                        <input type="text" name="patientName" value={patientName} readOnly />
                    </label>
                    <br />
                    <label>
                        Doctor Name:
                        <input type="text" name="doctorName" value={doctor.name} readOnly />
                    </label>
                    <br />
                    <label>
                        Specialization:
                        <input type="text" name="specialization" value={doctor.specialization} readOnly />
                    </label>
                    <br />
                    <label>
                        Appointment Date:
                        <input type="date" name="appointmentDate" required />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
