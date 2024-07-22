const express = require('express');
const consultController = require('./../controllers/consultController'); 
const router = express.Router();


router
  .route('/')
  .get(consultController.getAllConsult)
  .post(consultController.createConsult);



module.exports = router;