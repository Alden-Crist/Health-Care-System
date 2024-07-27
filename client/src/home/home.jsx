import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import applogo from './appl.png'; // Import the logo image
import './home.css';

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <header id="header">
        <nav>
          <div className="logo">
            <img src={applogo} alt="Appvila Logo" className="logo-img" />
          </div>
          <ul className="nav-links">
            <li><NavLink to="/Home" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/Admin" className="nav-link">Admin</NavLink></li>
            <li><NavLink to="/Patient" className="nav-link">Patient</NavLink></li>
            <li><NavLink to="/Doctor" className="nav-link">Doctor</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Overview</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Features</NavLink></li>
            <li><NavLink to="/Home" className="nav-link">Contact</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Health Care System</h1>
            <div className="head">
              <p>In the bio medical area, pattern detection and ML promises to improve the reliability of disease approach and detection. ML provides a respectable approach to make superior and automated algorithm for the study of high dimension and multi-modal bio medicals data</p>
            </div>
            <div className="app-buttons">
            <NavLink to="/contact" className="nav-link">Book An Appointment</NavLink>
            </div>
          </div>
        </section>
        <section className="extra-content">
          <div className="homeBg">
            <div className="content">
              <h2>Features</h2>
            
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
            <div className="content">
              <h2>Overview</h2>
             
              <p>Du aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
          
          </div>
        </section>
      </main>
      <footer>
        
          
        <div className="footer-bottom">
          <p>Designed and Developed by ACR</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
