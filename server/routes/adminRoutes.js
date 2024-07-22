const express = require('express');
const adminController = require('./../controllers/adminController'); 
const router = express.Router();

router
  .route('/')
  .get(adminController.getAllAdmins) 
  .post(adminController.createAdmin)

router.route('/login').post(adminController.loginAdmin)

router.route('/login/record').get(adminController.patientRecord)
router.route('/login/record/delete/:id').delete(adminController.deletePatient)
router.route('/login/doctors').get(adminController.doctorRecord)
router.route('/login/doctors/delete/:id').delete(adminController.deleteDoctor)
router.route('/login/records').get(adminController.mlRecord)
router.route('/login/records/delete/:id').delete(adminController.deleteRecord)


router
  .route('/:id')
  .get(adminController.getAdmin) 
  .patch(adminController.updateAdmin) 
  .delete(adminController.deleteAdmin); 

module.exports = router;
