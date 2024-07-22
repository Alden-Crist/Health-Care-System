const express = require('express');
const doctorController = require('./../controllers/doctorController');


const router = express.Router();



router
  .route('/')
  .get(doctorController.getAllDoctors)
  .post(doctorController.createDoctor);
  
router.route('/login').post(doctorController.loginDoctor)

// router.route('/:named').patch(doctorController.updateDoctor)


router
  .route('/:id')
  .get(doctorController.getDoctor)
  .patch(doctorController.updateDoctor)
  .delete(doctorController.deleteDoctor);

module.exports = router;