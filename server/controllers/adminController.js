const Admin = require('./../models/adminModel');
const User = require('./../models/userModel');
const Doctor = require('./../models/doctorModel');
const Record =require('./../models/recordModel')


exports.getAllAdmins = async (req, res) => {
  // console.log(req.requestTime);
  try {
    console.log(req.query);
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);
    //1b)Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));

    let query = Admin.find(JSON.parse(queryStr));

    //2)Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // console.log(sortBy);
      query = query.sort(sortBy);
      //sort('price ratingsAverage')
    } else {
      query = query.sort('-createdAt _id');
    }

    //3)Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      //this is called query projecting
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    //4)pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    //page =2 &limit =10,1-10 ,page 1, 11-20,page 2,21-30 page 3
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numDoctors = await Admin.countDocuments();
      if (skip >= numDoctors) throw new Error('This page does not exist');
    }
    //Execute query
    const admins = await query;
  
    res.status(200).json({data:admins});
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
  
exports.getAdmin = async (req, res) => {
    
    try {
      const admin = await Admin.findById(req.params.id);
      //Tour.findOne({_id: req.params.id})
      res.status(200).json({
        status: 'success',
        data: {
          admin,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };
  
  
exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = await Admin.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                admin: newAdmin
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
  
exports.updateAdmin = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined',
    });
};

exports.deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};



exports.loginAdmin = async (req, res) => {
  const { name, password } = req.body;
  console.log(name);
  try {
      const admin = await Admin.findOne({ name, password });
      if (admin) {
          return res.status(200).json({ message: 'Login successful', adminId: admin._id });
      } else {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      return res.status(500).json({ message: 'Server error' });
  }
};


exports.patientRecord = async (req, res) => {
  try {
      console.log('Request received for patient records');
      const patients = await User.find({}, 'name gender dateOfBirth city mobile');
      //console.log('Fetched patients:', patients);
      res.json(patients);
  } catch (err) {
      console.error('Error fetching patient records:', err);
      res.status(500).json({ message: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    console.log("Deleted patient record")
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.doctorRecord = async (req, res) => {
  
  try {
    console.log('Request received for Doctors records');
      const doctors = await Doctor.find({}, 'name gender qualifications specialization city mobile');
      res.json(doctors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    console.log("Deleted Doctor record")
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.mlRecord = async (req, res) => {
  try {
      console.log('Request received for ml records');
      const records = await Record.find({});
      
      res.json(records);
  } catch (err) {
      console.error('Error fetching ml records:', err);
      res.status(500).json({ message: err.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    console.log("Deleted ml record")
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};