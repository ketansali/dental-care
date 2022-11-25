const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.registerValidation = (req, res, next) => {
  const user = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    jobtitle: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = user.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, {
    message: message,
  });
};
exports.loginValidation = (req, res, next) => {
  const user = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = user.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, {
    message: message,
  });
};


