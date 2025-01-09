const Joi = require("joi");

const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(500),
  });

  return schema.validate(data);
};

module.exports = { categoryValidation };
