import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';
import './Patient.css';

const fetchUserAppointments = async (userId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`);
    const userData = await response.json();
    return userData.appointmentRequests || [];
};

const fetchDoctorDetails = async (doctorName) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/doctors?name=${doctorName}`);
    const doctorData = await response.json();
    if (doctorData.length) {
        const doctor = doctorData[0];
        return { 
            address: doctor.city, 
            specialization: doctor.specialization,
            doctorId: doctor._id,
            appointmentRequests: doctor.appointmentRequests || []
        };
    }
    return { address: 'Unknown', specialization: 'Unknown' };
};

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }

        const loadAppointments = async () => {
            try {
                setLoading(true);
                const appointments = await fetchUserAppointments(userId);
                const formattedAppointments = await Promise.all(appointments.map(async appointment => {
                    const { address, specialization } = await fetchDoctorDetails(appointment.doctorName);
                    return {
                        ...appointment,
                        date: new Date(appointment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }),
                        address,
                        specialization
                    };
                }));
                setAppointments(formattedAppointments);
            } catch (error) {
                setError('Failed to load appointments.');
                console.error('Error fetching user appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAppointments();
    }, []);

    const handleDelete = async (appointmentId, doctorName, appointmentDate,status) => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            console.error('User ID not found in local storage');
            return;
        }

        try {
            setLoading(true);

            // Remove the appointment from the user's appointmentRequests
            await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ doctorName, appointmentId, appointmentDate })
            });
            

            function formatDate(dateString) {
                const date = new Date(dateString);
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                return date.toLocaleDateString('en-US', options);
              }

              const { doctorId, appointmentRequests } = await fetchDoctorDetails(doctorName);
              const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`);
              const userData = await userResponse.json();
              const patientName = userData.name;
              console.log(patientName);
             
            console.log(appointmentDate)
            console.log(status)
            console.log(appointmentRequests)
            console.log(doctorId)
            // Find the appointment that matches the patientName, appointmentDate, and status appointment1.patientName === patientName &&
            const matchingAppointment = appointmentRequests.find(
                appointment1 => appointment1.patientName === patientName &&
                    formatDate(appointment1.date) === formatDate(appointmentDate) &&
                    appointment1.status === status // Adjust based on your status condition
            );

            if (!matchingAppointment) {
                throw new Error('Confirmed appointment not found');
            }

            const appointmentId1 = matchingAppointment._id;
            console.log(appointmentId1);
            console.log(typeof appointmentId1);
            // Remove the appointment from the doctor's appointmentRequests
            await fetch(`${process.env.REACT_APP_API_URL}/doctors/${doctorId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( { patientName,appointmentId1, appointmentDate})
            });

            // Remove the appointment from the local state
            setAppointments(appointments.filter(appointment => appointment._id !== appointmentId));
        } catch (error) {
            setError('Failed to delete appointment.');
            console.error('Error deleting appointment:', error);
        } finally {
            setLoading(false);
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
                    <NavLink to='/PatientDashBoard' className="nav-link">Back</NavLink>
                    <NavLink to='/Appointments' className="nav-link">Appointments</NavLink>
                </div>
            </nav>
            <div className="appointments-table">
                <h1>Your Appointments</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Doctor Name</th>
                                <th>Appointment Date</th>
                                <th>Status</th>
                                <th>Time Slots</th>
                                <th>Address</th>
                                <th>Specialization</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.doctorName}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        {appointment.status === 'Confirmed' && appointment.timeSlots
                                            ? appointment.timeSlots.join(', ')
                                            : 'N/A'}
                                    </td>
                                    <td>{appointment.address}</td>
                                    <td>{appointment.specialization}</td>
                                    <td>
                                        <button onClick={() => handleDelete(appointment._id, appointment.doctorName, appointment.date,appointment.status)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Appointments;
