const Joi = require("joi");

module.exports = {
  contact_messagesValidation: (data) => {
    const contact_messagesSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "name nomi bo'sh bo'lishi mumkin emas",
        "any.required": "name nomi kiritilishi shart",
      }),
      email: Joi.string()
        .required()
        .messages({
          "string.empty": "email nomi bo'sh bo'lishi mumkin emas",
          "any.required": "email nomi kiritilishi shart",
        })
        .email(),
      message: Joi.string().required().messages({
        "string.empty": "message nomi bo'sh bo'lishi mumkin emas",
        "any.required": "message nomi kiritilishi shart",
      }),
      status: Joi.string(),
      resolved_at: Joi.data(),
    });

    return contact_messagesSchema.validate(data, { abortEarly: false });
  },
};
