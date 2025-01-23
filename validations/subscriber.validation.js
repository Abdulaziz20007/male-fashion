const Joi = require("joi");

const subscriberValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    status: Joi.boolean().default(true),
  });

  return schema.validate(data);
};

module.exports = { subscriberValidation };
