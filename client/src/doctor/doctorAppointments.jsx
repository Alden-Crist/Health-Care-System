import React, { useEffect, useState } from 'react';
import './Doctor.css';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';
import axios from 'axios';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            const doctorId = localStorage.getItem('doctorId'); // Retrieve doctor ID from local storage
            if (!doctorId) {
                console.error('Doctor ID not found in local storage');
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctors/${doctorId}`);
                const doctorData = response.data; // Access data directly

                if (doctorData.appointmentRequests) {
                    setAppointments(doctorData.appointmentRequests);
                } else {
                    setAppointments([]);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }

    const updateStatus = async (index, newStatus) => {
        try {
            const doctorId = localStorage.getItem('doctorId'); // Retrieve doctor ID from local storage
            if (!doctorId) {
                console.error('Doctor ID not found in local storage');
                return;
            }

            const updatedAppointments = [...appointments];
            updatedAppointments[index].status = newStatus;

            // Fetch doctor's data to get the doctor's name and time slots
            const doctorResponse = await axios.get(`${process.env.REACT_APP_API_URL}/doctors/${doctorId}`);
            const doctorData = doctorResponse.data;
            const doctorName = doctorData.name;
            const doctorTimeSlots = doctorData.timeSlots; // Get doctor's time slots

            // Find patient ID from the appointment
            const patientName = updatedAppointments[index].patientName;
            const userResponse = await axios.get(`${process.env.REACT_APP_API_URL}/users?name=${patientName}`);
            const users = userResponse.data;
            if (!users.length) {
                console.error('Patient not found');
                return;
            }
            const userId = users[0]._id;

            if (newStatus === 'Confirmed') {
                // Update doctor's appointment data with time slots
                updatedAppointments[index].timeSlots = doctorTimeSlots;
            } else if (newStatus === 'Cancelled') {
                // Remove time slots for cancelled appointments
                delete updatedAppointments[index].timeSlots;
            }

            await axios.patch(`${process.env.REACT_APP_API_URL}/doctors/${doctorId}`, {
                appointmentRequests: updatedAppointments
            });

            // Update patient's appointment data
            const patientAppointments = users[0].appointmentRequests.map(appointment => {
                const isSameDoctor = appointment.doctorName === doctorName; // Use doctorName from the fetched data
                const isSameDate = new Date(appointment.date).getTime() === new Date(updatedAppointments[index].date).getTime();
                if (isSameDoctor && isSameDate) {
                    if (newStatus === 'Confirmed') {
                        return { ...appointment, status: newStatus, timeSlots: doctorTimeSlots };
                    } else if (newStatus === 'Cancelled') {
                        const { timeSlots, ...rest } = appointment;
                        return { ...rest, status: newStatus };
                    }
                }
                return appointment;
            });

            await axios.patch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
                appointmentRequests: patientAppointments
            });

            setAppointments(updatedAppointments);
        } catch (error) {
            console.error('Error updating appointment status:', error);
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
                    <NavLink to='/DoctorDashBoard' className="nav-link">Back</NavLink>
                </div>
            </nav>
            <div className="appointments-table">
                <h1>Appointments Requests</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : appointments.length === 0 ? (
                    <p>No appointments found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Appointment Date</th>
                                <th>Status</th>
                                <th>Time Slots</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.patientName}</td>
                                    <td>{formatDate(appointment.date)}</td>
                                    <td>{appointment.status}</td>
                                    <td>{appointment.timeSlots ? appointment.timeSlots.join(', ') : 'N/A'}</td>
                                    <td>
                                        <button onClick={() => updateStatus(index, 'Confirmed')}>Confirm</button>
                                        <button onClick={() => updateStatus(index, 'Cancelled')}>Cancel</button>
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

export default DoctorAppointments;

