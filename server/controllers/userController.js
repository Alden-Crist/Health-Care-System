const User = require('./../models/userModel');

exports.getAllUsers = async (req, res) => {

  try {
    console.log(req.query);
   
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
   
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let query = User.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);

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
      const numUsers = await User.countDocuments();
      if (skip >= numUsers) throw new Error('This page does not exist');
    }

    const users = await query;
    
    
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    //Tour.findOne({_id: req.params.id})

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.createUser = async (req, res) => {
  try {
    
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};



//to handle when bookappointments it stores the appointmentRequest in that particular user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });
    res.status(200).json(user
     );
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { appointmentId, ...updateData } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If appointmentId is provided, remove the corresponding appointment
    if (appointmentId) {
      user.appointmentRequests = user.appointmentRequests.filter(
        appointment => appointment._id.toString() !== appointmentId
      );
    }

    // Update user with any other provided data
    Object.assign(user, updateData);

    await user.save();
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
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


exports.loginUser = async (req, res) => {
  const { name, password } = req.body;
  console.log(name);
  try {
      const user = await User.findOne({ name, password });
      if (user) {
          return res.status(200).json({ message: 'Login successful', userId: user._id });
      } else {
          return res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (err) {
      return res.status(500).json({ message: 'Server error' });
  }
};

