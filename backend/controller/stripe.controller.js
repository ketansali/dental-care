const mongoose = require("mongoose");
const errorResponse = require("../middleware/error-response");
const stripe = require('stripe')(process.env.stripeKey);
const {
  successResponse,
  badRequestResponse,
} = require("../middleware/response");
// const YOUR_DOMAIN = 'http://localhost:3000';
exports.stripe = {
    CreateCheckoutSession: async (req, res) => {
    try {
        // const customer = await stripe.customers.create({
        //     metadata: {
        //       userId: req.body.userId,
        //       cart: req.body.items,
        //     },
        //   });
        console.log(req.body);
          const lineItemData = JSON.parse(req.body.cartItems)
          const line_items = lineItemData.map((item) => {
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.productId.title,
                  images: [`http://localhost:7600/uploads/patients/${item.productId.image}`],
                  description: item.productId.description,
                  // metadata: {
                  //   id: item._id,
                  // },
                },
                unit_amount:item.total ,
              },
              quantity: item.quantity,
            };
          });
          
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            // customer: customer.id,
            success_url: `${process.env.domain}/checkout-success`,
            cancel_url: `${process.env.domain}/my-order`,
          });

          res.send({ session: session });
    } catch (error) {
      return errorResponse(error, req, res);
    }
  },  
};

