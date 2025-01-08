const Joi = require("joi");

module.exports = {
  productValidation: (data) => {
    const productSchema = Joi.object({
      name: Joi.string().required().trim(),
      price: Joi.number().required(),
      description: Joi.string().required().trim(),
      category: Joi.string().required().trim(),
      images: Joi.array().items(Joi.string().trim()),
  });

    return productSchema.validate(data, { abortEarly: false });
  },
};
