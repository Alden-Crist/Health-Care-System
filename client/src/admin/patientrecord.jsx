import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { NavLink } from 'react-router-dom';
import applogo from '../appl.png';

const PatientRecord = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admins/login/record`);
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients data:', error);
            }
        };
        fetchPatients();
    }, []);

    const deletePatient = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admins/login/record/delete/${id}`);
            setPatients(patients.filter(patient => patient._id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      }

    return (
        <div className="maindiv">
           
        <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="applogo" className="logo-img" />
          </div>
          <div className ="admin-nav">
          <ul className="nav-links">
            <li><NavLink to="/AdminDashBoard" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/DoctorRecord" className="nav-link">Doctors</NavLink></li>
            <li><NavLink to="/MlRecord" className="nav-link">ML Evaluations</NavLink></li>
          </ul>
          </div>
        </nav>
      </header>
      <div >
                <h1>Helath Care System</h1>
            </div>
            <div className="patients-container">
                <h2>Patient List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>dateOfBirth</th>
                            <th>City</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient._id}>
                                <td>{patient.name}</td>
                                <td>{patient.gender}</td>
                                <td>{formatDate(patient.dateOfBirth)}</td>
                                <td>{patient.city}</td>
                                <td>{patient.mobile}</td>
                                <td>
                                    <button 
                                        onClick={() => deletePatient(patient._id)} 
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

export default PatientRecord;
