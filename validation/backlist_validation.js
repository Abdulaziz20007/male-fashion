const Joi = require("joi");

exports.blacklistValidation = (data) => {
  const blacklistSchema = Joi.object({
    user_id: Joi.number().integer().required().messages({
      "number.base": "User ID must be a number",
      "number.integer": "User ID must be an integer",
      "any.required": "User ID is required",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
    reason: Joi.string().required().messages({
      "string.empty": "Reason can't be empty",
      "any.required": "Reason is required",
    }),
    admin_id: Joi.number().integer().required().messages({
      "number.base": "Admin ID must be a number",
      "number.integer": "Admin ID must be an integer",
      "any.required": "Admin ID is required",
    }),
    created_at: Joi.date().required().messages({
      "date.base": "Created at must be a valid date",
      "any.required": "Created at is required",
    }),
  });

  return blacklistSchema.validate(data, { abortEarly: false });
};
