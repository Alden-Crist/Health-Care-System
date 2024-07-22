//code to enter the symtoms in the predict component
import React, { useState } from 'react';
import axios from 'axios';
import './predictor-css/Predictor.css';
import { NavLink, useNavigate } from 'react-router-dom';
import applogo from '../applogo.png';

const Predictor = () => {
    const [inputSymptom, setInputSymptom] = useState('');
    const [predictedDisease, setPredictedDisease] = useState('');
    const [description, setDescription] = useState(''); // State to store the description
    const [specialists, setSpecialists] = useState(''); // State to store the specialists
    const [patientName, setPatientName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if form is submitted
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInputSymptom(event.target.value);
    };

    const handleNameChange = (event) => {
        setPatientName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${process.env.FLASK_APP_API_URL}/predict`, { symptoms: [inputSymptom] })
            .then((response) => {
                const { disease, description, specialists } = response.data; // Destructure to get disease, description, and specialists
                
                setPredictedDisease(disease);
                setDescription(description); // Set the description
                setSpecialists(specialists); // Set the specialists
                setIsSubmitted(true); // Set form as submitted

                // save in prediction in the records
                axios
                    .post(`${process.env.REACT_APP_API_URL}/api/v1/records`, {
                        patientName,
                        symptoms: inputSymptom.split(',').map(symptom => symptom.trim()),
                        predictedDisease: disease
                    })
                    .catch((error) => console.error('Error saving prediction:', error));
            })
            .catch((error) => console.error('Error predicting disease:', error));
    };

    const handleConsultDoctor = () => {
        navigate('/ConsultDoctor', { state: { predictedDisease, symptoms: inputSymptom, patientName } });
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
                    <NavLink to='/Predictor' className="nav-link">Predictor</NavLink>
                </div>
            </nav>
            <div className="adminlogin">
                <div className="login-box">
                    <h2>Add your Symptoms here</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="patientNameInput">Patient Name:</label>
                            <input 
                                type="text" 
                                id="patientNameInput" 
                                value={patientName} 
                                onChange={handleNameChange} 
                            />
                        </div>
                        <div>
                            <label htmlFor="symptomsInput">Symptoms (separated by commas):</label>
                            <input 
                                type="text" 
                                id="symptomsInput" 
                                value={inputSymptom} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <button 
                            type="submit" 
                            style={{
                                border: 'none',
                                backgroundColor: "green",
                                borderRadius: '10px',
                                color: 'white',
                                marginTop: '10px',
                                padding: '5px 35px'
                            }}
                        >
                            Enter
                        </button>
                    </form>
                    {isSubmitted && (
                        <div>
                            <div>
                                <label htmlFor="predictedDisease">Disease is:</label>
                                <input 
                                    type="text" 
                                    id="predictedDisease" 
                                    value={predictedDisease} 
                                    readOnly 
                                />
                            </div>
                            <div>
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    readOnly
                                    rows="4"
                                    cols="50"
                                />
                            </div>
                            <div>
                                <label htmlFor="specialists">Specialists:</label>
                                <input 
                                    type="text" 
                                    id="specialists" 
                                    value={specialists} 
                                    readOnly 
                                />
                            </div>
                            <button 
                                onClick={handleConsultDoctor}
                                style={{
                                    border: 'none',
                                    backgroundColor: "blue",
                                    borderRadius: '10px',
                                    color: 'white',
                                    marginTop: '10px',
                                    padding: '5px 35px'
                                }}
                            >
                                Consult Doctor
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Predictor;
