const router = require("express").Router()
const patientController = require('../controller/patient.Controller')
const { patientValidation } = require("../validators/patient.Validator")



router.post('/add',(req,res)=>{
    return patientController.patient.addPatient(req,res)
})
router.post('/update',(req,res)=>{
    return patientController.patient.updatePatient(req,res)
})
router.get('/get',(req,res)=>{
    return patientController.patient.getPatient(req,res)
})
router.delete('/delete',(req,res)=>{
    return patientController.patient.deletePatient(req,res)
})
router.get('/get-patient-by-id',(req,res)=>{
    return patientController.patient.getPatientById(req,res)
})



module.exports = router