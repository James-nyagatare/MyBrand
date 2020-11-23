const Joi = require("joi");
const joiResponse = require("../helpers/joiresponse");

class GeneralValidator {
  static queryValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(45).required(),
      email: Joi.string().email().required(),
      message: Joi.string().min(10).required(),
    });
    joiResponse(req, res, schema, next);
  }
  static blogValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(25).required(),
      content: Joi.string().min(10).required(),
    });
    joiResponse(req, res, schema, next);
  }

  static updateValidator(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().min(5).max(25),
      content: Joi.string().min(10),
    });
    joiResponse(req, res, schema, next);
  }

  static commentValidator(req, res, next) {
    const schema = Joi.object({
      comment: Joi.string().trim().min(5).required(),
    });
    joiResponse(req, res, schema, next);
  }
}

module.exports = GeneralValidator;
