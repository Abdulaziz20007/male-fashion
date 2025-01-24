const Joi = require("joi")
module.exports ={
    adminValidation : (data)=> {
        const adminSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(), 
            surname: Joi.string().min(3).max(30).required(),
            email:Joi.string().email().required(),
            username: Joi.string().min(5).max(20).required(),
            password: Joi.string().min(5).max(50).required(),
            is_creator: Joi.boolean().default(false) 
        })
        return adminSchema.validate(data, {abortEarly: false})
    }
}