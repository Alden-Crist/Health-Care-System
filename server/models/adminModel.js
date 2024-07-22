const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'An admin must have a name'],
        trim: true,
        
    },
    password: {
        type: String,
        required: [true, 'An admin must have a password'],
        
    },
    gmail: {
        type: String,
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
