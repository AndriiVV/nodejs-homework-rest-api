const Joi = require("joi");

const signUpSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required(),
})

module.exports = {
  signUpSchema,
  loginSchema,
  emailSchema,
}