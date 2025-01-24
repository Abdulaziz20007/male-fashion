const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminSchema = Joi.object({
    admin_name: Joi.string().required().messages({
      "string.empty": "Admin name can't be empty",
      "any.required": "You must write your admin name",
    }),
    admin_surename: Joi.string().required().messages({
      "string.empty": "Admin surename can't be empty",
      "any.required": "You must write your admin surename",
    }),
    admin_email: Joi.string().email().required().messages({
      "string.empty": "Admin email can't be empty",
      "string.email": "Admin email must be a valid email",
      "any.required": "You must write your admin email",
    }),
    admin_username: Joi.string().required().messages({
      "string.empty": "Admin username can't be empty",
      "any.required": "You must write your admin username",
    }),
    admin_password: Joi.string()
      .required()
      .messages({
        "string.empty": "admin_password nomi bo'sh bo'lishi mumkin emas",
        "any.required": "admin_password nomi kiritilishi shart",
      })
      .pattern(new RegExp("^[a-zA-Z0-9!@# ]{3,30}$")),
    confirm_password: Joi.ref("admin_password"),
    admin_is_creator: Joi.boolean().default(false),
  });

  return adminSchema.validate(data, { abortEarly: false });
};
