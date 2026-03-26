
import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/)
    .required()
    .messages({
      "string.pattern.base":"Password must be at least 6 characters and include letters and numbers",
      "string.empty": "Password is required",
      "any.required": "Password is required"
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be exactly 10 digits",
      "string.empty": "Phone is required",
      "any.required": "Phone is required"
    }),

  role: Joi.string()
    .valid("user", "admin", "super admin")
    .default("user")
});


export default registerSchema;
