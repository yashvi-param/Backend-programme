
import joi from "joi";

const UserSchema = joi.object({
    name: joi.string()
        .min(2)
        .pattern(/^[A-Za-z ]+$/)
        .trim()
        .strict()
        .messages({
            "string.base": "name must be string format",
            "string.empty": "name is required",
            "string.min": "name must be atLeast 2 character long",
        }),
    email: joi.string()
        .email()
        .messages({
            "string.empty": "email is required",
            "string.email": "please enter a valid email address"
        }),
    password: joi.string()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .messages({
            "string.empty": "password is required",
            "string.min": "password must be atLeast 6 character long",
        }),
    phone: joi.string()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "number.base": "phone must be a number",
        }),
    role: joi.string()
        .valid("customer", "provider", "admin", "super_admin")
        .optional()
        .messages({
            "string.empty": "role is required from any of these customer.",
        }),
});

export const createUserSchema = UserSchema.fork(["name", "email", "password", "phone"],
    (field) => field.required()
        .messages({ "any.required": "{#label} is required" }) //label is for dynamic value
);
export const updateUserSchema = UserSchema
    .fork(["name", "password", "phone"], (field) => field.optional())
    .or("name", "password", "phone")
    .messages({
        "object.missing": "At least one field (name, password, phone) is required for update"
    });

export default UserSchema;