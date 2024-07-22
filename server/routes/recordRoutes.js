const express = require('express');
const recordController = require('./../controllers/recordController'); 
const router = express.Router();

router
  .route('/')
  .get(recordController.getAllRecords) 
  .post(recordController.createRecord)



  module.exports = router;