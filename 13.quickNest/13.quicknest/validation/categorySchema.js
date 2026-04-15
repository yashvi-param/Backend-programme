import Joi from "joi";

const CategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).trim().label("Category Name").messages({
    "string.base": "Category name must be in string format",
    "string.empty": "Category name is required",
    "string.min": "Category name must be at least 2 characters long",
    "string.max": "Category name must not exceed 50 characters",
  }),
  description: Joi.string().max(500).trim().optional().label("Description").messages({
    "string.base": "Description must be in string format",
    "string.max": "Description must not exceed 500 characters",
  }),
});

export const createCategorySchema = CategorySchema.fork(
  ["name"],
  (fields) => fields.required(),
).messages({
  "any.required": "{#label} is required",
});

export const updateCategorySchema = CategorySchema.fork(
  ["name", "description"],
  (fields) => fields.optional(),
)
  .or("name", "description")
  .messages({
    "object.missing": "Name or description any of these field is required when updating",
  });

export default createCategorySchema;
