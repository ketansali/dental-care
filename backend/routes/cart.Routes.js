const router = require("express").Router()
const cartController = require('../controller/cart.Controller')



router.post('/addItemToCart',(req,res)=>{
    return cartController.Cart.addItemToCart(req,res)
})
router.post('/removeCartItem/:productId',(req,res)=>{
    return cartController.Cart.removeCartItem(req,res)
})
router.get('/getCartItem',(req,res)=>{
    return cartController.Cart.getCartItem(req,res)
})
module.exports = router