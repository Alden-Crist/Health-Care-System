const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A doctor must have a name'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'A doctor must have a password']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'A doctor must have a date of birth']
    },
    gender: {
        type: String,
        required: [true, 'A doctor must have a gender'],
        enum: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        required: [true, 'A doctor must have an email address'],
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        required: [true, 'A doctor must have a city'],
        trim: true
    },
    specialization: {
        type: String,
        required: [true, 'A doctor must have a specialization'],
        trim: true
    },
    qualifications: {
        type: String,
        required: [true, 'A doctor must have qualifications'],
        trim: true
    },
    experience: {
        type: Number,
        required: [true, 'A doctor must have experience']
    },
    licenseNumber: {
        type: String,
        required: [true, 'A doctor must have a license number'],
        unique: true
    },
    hospital: {
        type: String,
        trim: true
    },
    daysAvailable: {
        type: [String], // Array of strings representing days of the week
        required: [true, 'A doctor must specify days available']
    },
    timeSlots: {
        type: [String], // Array of strings representing time slots
        required: [true, 'A doctor must specify time slots']
    },
    appointmentRequests: [{
        patientName: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        timeSlots: {
            type: [String], // Array of strings representing time slots
            
        },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Cancelled'],
            default: 'Pending'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
