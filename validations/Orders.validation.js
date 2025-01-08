const Joi = require("joi")

module.exports = {
    ordersValidation: (data) => {
        const orderSchema = Joi.object({
            user_id: Joi.string().required().trim(),
            total_amount : Joi.number().required(),
            status : Joi.string().valid('pending', 'success', 'cancelled').default('pending'),
            shopping_address : Joi.string().trim().required()
        });
        
        return orderSchema.validate(data, { abortEarly: false })
    }
}