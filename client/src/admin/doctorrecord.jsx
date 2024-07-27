import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { NavLink } from 'react-router-dom';
import applogo from '../appl.png';

const DoctorRecord = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admins/login/doctors`);
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching doctors data:', error);
            }
        };

        fetchDoctors();
    }, []);

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admins/login/doctors/delete/${id}`);
            setDoctors(doctors.filter(doctor => doctor._id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    return (
        <div className="maindiv">
        <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/AdminDashBoard" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/PatientRecord" className="nav-link">Patients</NavLink></li>
            <li><NavLink to="/MlRecord" className="nav-link">ML Evaluations</NavLink></li>
          </ul>
          </div>
        </nav>
      </header>
            <div >
                <h1>Helath Care System</h1>
            </div>
            <div className="doctors-container">
                <h2>Doctor List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Qualifications</th>
                            <th>Specializations</th>
                            <th>City</th>
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
                                <td>{doctor.city}</td>
                                <td>{doctor.mobile}</td>
                                <td>
                                    <button 
                                        onClick={() => deleteDoctor(doctor._id)} 
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="footer">copyright@HealthCareSolutions2024</div>
        </div>
    );
}

export default DoctorRecord;
