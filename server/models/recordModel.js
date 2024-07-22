const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'A record must have a patient name'],
        trim: true
    },
    predictedDisease: {
        type: String,
        required: [true, 'A record must have a predicted disease'],
        trim: true
    },
    symptoms: {
        type: [String],
        required: [true, 'A record must have symptoms']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
