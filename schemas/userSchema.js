const Joi = require("joi");

const userRegisterationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().optional(),
}).required();

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();

module.exports = { userRegisterationSchema, userUpdateSchema, userLoginSchema };
