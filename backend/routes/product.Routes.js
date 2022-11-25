const router = require("express").Router()
const productController = require('../controller/product.Controller')
const { productValidation } = require("../validators/product.validator")


router.post('/add',productValidation,(req,res)=>{
    return productController.product.addProduct(req,res)
})
router.post('/update',(req,res)=>{
    return productController.product.updateProduct(req,res)
})
router.get('/get',(req,res)=>{
    return productController.product.getProduct(req,res)
})
router.delete('/delete',(req,res)=>{
    return productController.product.deleteProduct(req,res)
})
router.get('/get-product-by-id',(req,res)=>{
    return productController.product.getProductById(req,res)
})



module.exports = router