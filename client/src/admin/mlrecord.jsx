import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo.png';

const MlRecord = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admins/login/records`);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching records data:', error);
            }
        };
        fetchRecords();
    }, []);

    const deleteRecord = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/admins/login/records/delete/${id}`);
            setRecords(records.filter(record => record._id !== id));
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <div className="maindiv">
            <div className="header">
                <h1>SYMPTOMS BASED DISEASE PREDICTOR</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/AdminDashBoard' className="nav-link">Home</NavLink>
                    <NavLink to='/DoctorRecord' className="nav-link">Doctors</NavLink>
                    <NavLink to='/PatientRecord' className="nav-link">Patients</NavLink>
                </div>
            </nav>

            <div className="patients-container">
                <h2>MLEvaluations List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Symptoms</th>
                            <th>Predicted Disease</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record._id}>
                                <td>{record.patientName}</td>
                                <td>{record.symptoms.join(', ')}</td>
                                <td>{record.predictedDisease}</td>
                                <td>
                                    <button 
                                        onClick={() => deleteRecord(record._id)} 
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

export default MlRecord;
