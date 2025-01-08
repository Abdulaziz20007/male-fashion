const Joi = require("joi");

module.exports = {
  cartsValidation: (data) => {
    const cartsSchema = Joi.object({
      user_id: Joi.string()
        .alphanum()
        .message("user_id noto'g'ri")
        .required()
        .messages({
          "string.empty": "user_id nomi bo'sh bo'lishi mumkin emas",
          "any.required": "user_id nomi kiritilishi shart",
        })
        .trim(),
      total_amout: Joi.number().required().messages({
        "string.empty": "total_amout nomi bo'sh bo'lishi mumkin emas",
        "any.required": "total_amout nomi kiritilishi shart",
      }),
    });

    return cartsSchema.validate(data, { abortEarly: false });
  },
};
