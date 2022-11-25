const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.productValidation = (req, res, next) => {
  const product = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
  });
  const { error } = product.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, {
    message: message,
  });
};