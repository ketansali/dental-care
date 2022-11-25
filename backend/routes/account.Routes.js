const express = require("express");
const router = express.Router();

const accountController = require("../controller/account.Controller");
const { loginValidation,registerValidation } = require("../validators/account.Validator");

router.post("/login",loginValidation, function (req, res) {
  return accountController.account.login(req, res);
});

router.post("/register",registerValidation, function (req, res) {
  return accountController.account.ragister(req,res)
});



module.exports = router;
