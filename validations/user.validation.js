const Joi = require("joi");

module.exports = {
  userValidation: (data) => {
    const userSchema = Joi.object({
      name: Joi.string().required().trim(),
      surname: Joi.string().trim(),
      phone: Joi.string().required().trim(),
      email: Joi.string().email().required().trim(),
      password: Joi.string().required(),
    });

    return userSchema.validate(data, { abortEarly: false });
  },
};
