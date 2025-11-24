import express from "express";
import TodoController from "../src/controllers/todoController.js";
import asyncWrapper from "express-async-wrapper";
import validator from "../src/config/joiValidator.js";
import { createTodoSchema, updateTodoSchema } from "../src/dtos/todo.dto.js";

const router = express.Router();

router.get("/", asyncWrapper(TodoController.getAllTodos));
router.post("/", validator.body(createTodoSchema), asyncWrapper(TodoController.createTodo));
router.put("/:id", validator.body(updateTodoSchema), asyncWrapper(TodoController.updateTodo));

export default router;

