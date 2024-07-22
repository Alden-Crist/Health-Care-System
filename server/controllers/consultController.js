const ConsultDoctor = require('./../models/consultdoctorModel');

exports.getAllConsult = async (req, res) => {
    try {
        console.log('Request received for consultations records');
        const crecords = await ConsultDoctor.find({});
        
        res.json(crecords);
    } catch (err) {
        console.error('Error fetching ml records:', err);
        res.status(500).json({ message: err.message });
    }
  };

  exports.createConsult = async (req, res) => {
    try {
        const newConsult = await ConsultDoctor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                consult: newConsult
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};