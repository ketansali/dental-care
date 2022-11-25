const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.addressValidation = (req, res, next) => {
  const address = Joi.object().keys({
    clinicName: Joi.string().required(),
    type: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.optional(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    contact: Joi.optional(),
    zipcode: Joi.number().required(),
    GSTNumber: Joi.number().required(),
    instraction: Joi.optional(),
  });
  const { error } = address.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, {
    message: message,
  });
};