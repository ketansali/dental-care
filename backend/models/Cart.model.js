const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
        userId : {
            type: mongoose.Schema.Types.ObjectID,
            required : true,
            ref : `userMaster`
        },
        cartItems: [{
            productId: {type: mongoose.Schema.Types.ObjectID, ref: 'productMaster'},
            quantity: {type: Number, default: 1},
            total : {type:Number}
        }],
},{timestamps:true})

module.exports = mongoose.model('cartMaster',cartSchema)