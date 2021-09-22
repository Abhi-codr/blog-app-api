const Joi = require("joi");

const postInsertSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  imageUrl: Joi.string().required(),
}).required();

const postUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  imageUrl: Joi.string().optional(),
}).required();

module.exports = { postInsertSchema, postUpdateSchema };
