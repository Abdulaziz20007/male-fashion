const Joi = require("joi");

module.exports = {
  cart_itemsValidation: (data) => {
    const orderItemsSchema = Joi.object({
      cart_id: Joi.string()
        .alphanum()
        .message("cart_id noto'g'ri")
        .required()
        .messages({
          "string.empty": "cart_id nomi bo'sh bo'lishi mumkin emas",
          "any.required": "cart_id nomi kiritilishi shart",
        })
        .trim(),
      product_id: Joi.string()
        .alphanum()
        .message("product_id noto'g'ri")
        .required()
        .messages({
          "string.empty": "product_id nomi bo'sh bo'lishi mumkin emas",
          "any.required": "product_id nomi kiritilishi shart",
        })
        .trim(),
      quantity: Joi.number().required().messages({
        "string.empty": "quantity nomi bo'sh bo'lishi mumkin emas",
        "any.required": "quantity nomi kiritilishi shart",
      }),
    });

    return orderItemsSchema.validate(data, { abortEarly: false });
  },
};
