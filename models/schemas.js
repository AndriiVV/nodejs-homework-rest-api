const Joi = require("joi");

const createContactSchema = Joi.object({
	name: Joi.string().required().min(5),
	email: Joi.string().email().required(),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/)
		.required(),
});

const updateContactSchema = Joi.object({
	name: Joi.string().min(5),
	email: Joi.string().email(),
	phone: Joi.string()
		.length(10)
		.pattern(/^[0-9]+$/),
}).or("name", "email", "phone");

module.exports = {
	createContactSchema,
	updateContactSchema,
};
