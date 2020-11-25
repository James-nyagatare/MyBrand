import Joi from "joi";
import { joiResponse } from "../helpers/joiresponse";

export class GeneralValidator {
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

  static userRegisterValidator(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().trim().min(3).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    joiResponse(req, res, schema, next);
  }

  static userLoginValidator(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });
    joiResponse(req, res, schema, next);
  }
}
