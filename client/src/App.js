import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home/home.jsx';

import Admin from './admin/admin.jsx';
import AdminDashBoard from './admin/adminDashBoard.jsx';
import PatientRecord from './admin/patientrecord.jsx';
import DoctorRecord from './admin/doctorrecord.jsx';
import MlRecord from './admin/mlrecord.jsx';

import Patient from './user/patient.jsx';
import PatientDashBoard from './user/patientDashBoard.jsx';
import Patientnew from './user/patientsignup.jsx';
import Appointments from './user/appointments.jsx';

import Doctor from './doctor/doctor.jsx';
import DoctorSignUp from './doctor/doctorsignup.jsx';
import DoctorDashBoard from './doctor/doctorDashBoard.jsx';
import DoctorAppointments from './doctor/doctorAppointments.jsx';

import Predictor from './predictor/predictor.jsx';
import ConsultDoctor from './predictor/consultDoctor.jsx';
import DoctorList from './predictor/doctorlist.jsx';
import BookAppointment from './predictor/bookAppointment.jsx';
import UserAppointments from './predictor/userAppointment.jsx';

function App() {
  return (
    <BrowserRouter>
       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='Home' element={<Home />} />
       <Route path='Admin' element={<Admin />} />
       <Route path ='AdminDashBoard' element={<AdminDashBoard/>}/>
       <Route path ='PatientRecord' element={<PatientRecord/>}/>
       <Route path ='DoctorRecord' element={<DoctorRecord/>}/>
       <Route path ='MlRecord' element={<MlRecord/>}/>
       <Route path='Patient' element={<Patient />} />
       <Route path ='PatientDashBoard' element={<PatientDashBoard/>}/>
       <Route path ='Appointments' element={<Appointments/>}/>
       <Route path='Patientnew' element={<Patientnew />} />
       <Route path='Doctor' element={<Doctor />} />
       <Route path='DoctorSignUp' element={<DoctorSignUp/>}/>
       <Route path ='DoctorDashBoard' element={<DoctorDashBoard/>}/>
       <Route path ='DoctorAppointments' element={<DoctorAppointments/>}/>
       <Route path='Predictor' element ={<Predictor/>}/>
       <Route path='ConsultDoctor' element ={<ConsultDoctor/>}/>
       <Route path='DoctorList' element ={<DoctorList/>}/>
       <Route path='BookAppointment' element={<BookAppointment/>}/>
       <Route path='UserAppointments' element={<UserAppointments/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
