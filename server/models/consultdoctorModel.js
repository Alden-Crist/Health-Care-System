const mongoose = require('mongoose');

const consultdoctorSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
    },
    
    patientAge: {
        type: String,
        required: [true, 'A user must have a date of birth']
    },
    gender: {
        type: String,
        required: [true, 'A user must have a gender'],
        
    },
    city: {
        type: String,
        required: [true, 'A user must have a city'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const ConsultDoctor = mongoose.model('ConsultDoctor', consultdoctorSchema);

module.exports = ConsultDoctor;
