import React from "react";
import './home.css';
import { NavLink } from 'react-router-dom';
import applogo from '../applogo2.png';

const Home = () => {
    return (
        <div className="maindiv1">
            <div className="header">
                <h1>Health Care System</h1>
            </div>
            <nav>
                <img src={applogo} alt="applogo" />
                <div className="navbar">
                    <NavLink to='/Home' className="nav-link">Home</NavLink>
                    <NavLink to='/Admin' className="nav-link">Admin</NavLink>
                    <NavLink to='/Patient' className="nav-link">Patient</NavLink>
                   
                    <NavLink to='/Doctor' className="nav-link">Doctor</NavLink>
                </div>
            </nav>
            <div className="homeBg">
                <h1>Symptoms Based Disease Prediction Using Machine Learning Techniques</h1>
                <h2>In the bio medical area, pattern detection and ML promises to improve the reliability of disease approach and detection. ML provides a respectable approach to make superior and automated algorithm for the study of high dimension and multi-modal bio medicals data</h2>
                <button>Book an appointment</button>         
            </div>
            <div style={{padding:'20px',backgroundColor:'black',textAlign:'center',color:'white'}}>copyright@HealthCareSolutions2024</div>
        </div>
    );
}

export default Home;
