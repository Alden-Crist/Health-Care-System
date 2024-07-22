const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A user must have a password']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'A user must have a date of birth']
    },
    gender: {
        type: String,
        required: [true, 'A user must have a gender'],
        enum: ['Male', 'Female', 'Other']
    },
    city: {
        type: String,
        required: [true, 'A user must have a city'],
        trim: true
    },
    gmail: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true,
        required: [true,'a user must have a moblie no']
    },
    appointmentRequests: [{
        doctorName: {
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

const User = mongoose.model('User', userSchema);

module.exports = User;
