const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.patientValidation = (req, res, next) => {
  const patient = Joi.object().keys({
    patientType: Joi.string().required(),
    orthodontist: Joi.string().required(),
    invisalingType: Joi.string().required(),
    images : Joi.optional(),
    reference : Joi.optional(),
    intraoral: Joi.string().required(),
    treatment: Joi.string().required(),
    name: Joi.string().required(),
    
  });
  const { error } = patient.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, {
    message: message,
  });
};