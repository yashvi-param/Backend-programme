import Joi from "joi";

const UserSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .messages({
      "string.base": "Name must be in string format",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
    }),

  email: Joi.string()
    .trim()
    .email()
    .messages({
      "string.email": "Enter a valid email",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/)
    .messages({
      "string.pattern.base":"Password must be at least 6 characters and include letters and numbers",
      "string.empty": "Password is required",
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone must be exactly 10 digits",
      "string.empty": "Phone is required",
    }),

  role: Joi.string()
    .valid("user", "admin", "super admin")
    .default("user")
});


export const createUserSchema = UserSchema.fork(
  ["name", "email", "password", "phone"],
    (field) => field.required()
        .messages({ "any.required": "{#label} is required" }) 
);

export const updateUserSchema = UserSchema.fork(
  ["name", "password", "phone"],
  (fields) =>
    fields.optional().messages({
      "object.missing":
        "name or password or phone any of these field is required when updating",
    }),
);



export default UserSchema;