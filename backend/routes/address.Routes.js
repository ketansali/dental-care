const router = require("express").Router()
const addressController = require('../controller/address.Controller')
const { addressValidation } = require("../validators/address.Validator")


router.post('/add',addressValidation,(req,res)=>{
    return addressController.address.addAddress(req,res)
})
router.post('/update',(req,res)=>{
    return addressController.address.updateAddress(req,res)
})
router.get('/get',(req,res)=>{
    return addressController.address.getAddress(req,res)
})
router.delete('/delete',(req,res)=>{
    return addressController.address.deleteAddress(req,res)
})
router.get('/get-address-by-id',(req,res)=>{
    return addressController.address.getAddressById(req,res)
})



module.exports = router