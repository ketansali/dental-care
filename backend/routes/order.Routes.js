const router = require("express").Router()
const orderController = require('../controller/order.Controller')



router.post('/add',(req,res)=>{
    return orderController.order.addOrder(req,res)
})
router.post('/updatePaymentStatus',(req,res)=>{
    return orderController.order.updatePaymentStatus(req,res)
})
router.get('/get',(req,res)=>{
    return orderController.order.getOrder(req,res)
})
// router.delete('/delete',(req,res)=>{
//     return orderController.order.deleteAddress(req,res)
// })
router.get('/get-order-by-id',(req,res)=>{
    return orderController.order.getOrderById(req,res)
})



module.exports = router