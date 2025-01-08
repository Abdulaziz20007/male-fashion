const Joi = require("joi")

module.exports = {
    orderItemsValidation: (data) => {
        const orderItemsSchema = Joi.object({
            order_id: Joi.string().required().trim(),
            product_id: Joi.string().required().trim(),
            quantity: Joi.number().required(),
            unit_price: Joi.number().required(),
        });

        return orderItemsSchema.validate(data, { abortEarly: false })
    }
}