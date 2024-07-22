const Doctor = require('./../models/doctorModel');

exports.getAllDoctors = async (req, res) => {
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

    let query = Doctor.find(JSON.parse(queryStr));

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
      const numDoctors = await Doctor.countDocuments();
      if (skip >= numDoctors) throw new Error('This page does not exist');
    }

    //Execute query
    const doctors = await query;
   
    res.status(200).json(doctors);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})

    res.status(200).json(doctor);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.params);

};


exports.createDoctor = async (req, res) => {
  try {
    
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doctor: newDoctor,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


//to handle when bookappointments it stores the appointmentRequest in that particular doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });
    res.status(200).json(doctor
     );
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });s
  }
};


exports.updateDoctor = async (req, res) => {
  const { id } = req.params;
  const { appointmentId1, ...updateData } = req.body;

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // If appointmentId is provided, remove the corresponding appointment
    if (appointmentId1) {
      doctor.appointmentRequests = doctor.appointmentRequests.filter(
        appointment => appointment._id.toString() !== appointmentId1
      );
    }

    // Update user with any other provided data
    Object.assign(doctor, updateData);

    await doctor.save();
    res.status(200).json({ message: 'User updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
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

exports.loginDoctor = async (req, res) => {
  const { name, password } = req.body;
  console.log(name);
  try {
      const doctor = await Doctor.findOne({ name, password });
      if (doctor) {
          return res.status(200).json({ message: 'Login successful', doctorId: doctor._id });
      } else {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      return res.status(500).json({ message: 'Server error' });
  }
};