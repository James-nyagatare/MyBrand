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
    if (error)
      return Response.error(
        res,
        400,
        error.details[0].message.replace(/\"/g, "")
      );
    next();
  }
  static blogValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(25).required(),
      content: Joi.string().min(10).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return Response.error(
        res,
        400,
        error.details[0].message.replace(/\"/g, "")
      );
    next();
  }

  static updateValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(25),
      content: Joi.string().min(10),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return Response.error(
        res,
        400,
        error.details[0].message.replace(/\"/g, "")
      );
    next();
  }

  static commentValidator(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string().trim().min(5).required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return Response.error(
        res,
        400,
        error.details[0].message.replace(/\"/g, "")
      );
    next();
  }
}

module.exports = GeneralValidator;
