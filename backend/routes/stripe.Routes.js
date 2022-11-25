const express = require("express");
const router = express.Router();

const stripeController = require("../controller/stripe.controller");

router.post("/create-checkout-session", function (req, res) {
  return stripeController.stripe.CreateCheckoutSession(req, res);
});
router.get("/paymentStatus", function (req, res) {
  return stripeController.stripe.paymentStatus(req, res);
});





module.exports = router;
