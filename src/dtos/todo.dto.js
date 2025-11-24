import Joi from "joi";

export const createTodoSchema = Joi.object({
  text: Joi.string().required().min(1).max(500).messages({
    "string.empty": "Todo text is required",
    "string.min": "Todo text must be at least 1 character long",
    "string.max": "Todo text must not exceed 500 characters",
    "any.required": "Todo text is required",
  }),
});

export const updateTodoSchema = Joi.object({
  completed: Joi.boolean().required().messages({
    "boolean.base": "Completed must be a boolean value",
    "any.required": "Completed status is required",
  }),
});

