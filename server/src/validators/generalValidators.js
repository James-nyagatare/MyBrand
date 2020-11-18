const Joi = require("joi");
const Response = require("../helpers/response");
class GeneralValidator {
  static queryValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(45).required(),
      email: Joi.string().email().required(),
      message: Joi.string().min(10).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return Response.error(res, 400, error.details[0].message);
    next();
  }
}

module.exports = GeneralValidator;
