const Record = require('./../models/recordModel');

exports.getAllRecords = async (req, res) => {
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
  
      let query = Record.find(JSON.parse(queryStr));
  
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
        const numDoctors = await Record.countDocuments();
        if (skip >= numDoctors) throw new Error('This page does not exist');
      }
  
      //Execute query
      const records = await query;
      //query.sort().select().skip().limit()
     
      res.status(200).json({
        status: 'success',
        // requestedAt: req.requestTime,
        results: records.length,
        data: {
          records: records,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  };


  exports.createRecord = async (req, res) => {
    try {
      
      const newRecord = await Record.create(req.body);
      console.log('records:', newRecord);
      res.status(201).json({
        status: 'success',
        data: {
          record: newRecord,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err,
      });
    }
  };

  exports.deleteRecord = async (req, res) => {
    try {
      await Record.findByIdAndDelete(req.params.id);
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