import Todo from "../../model/todo.js";
import TodoResource from "../resources/todoResource.js";

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const todos = await Todo.findAll({
        order: [["created_at", "DESC"]],
      });

      const todoResource = new TodoResource(todos);

      return res.status(200).json({
        success: true,
        message: "Todos fetched successfully",
        data: todoResource,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch todos",
      });
    }
  }

  static async createTodo(req, res) {
    try {
      const { text } = req.body;

      const todo = await Todo.create({
        text,
        completed: false,
      });

      const todoResource = new TodoResource(todo);

      return res.status(201).json({
        success: true,
        message: "Todo created successfully",
        data: todoResource,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create todo",
      });
    }
  }

  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { completed } = req.body;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      todo.completed = completed;
      await todo.save();

      const todoResource = new TodoResource(todo);

      return res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: todoResource,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to update todo",
      });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;

      const todo = await Todo.findByPk(id);

      if (!todo) {
        return res.status(404).json({
          success: false,
          message: "Todo not found",
        });
      }

      await todo.destroy();

      return res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to delete todo",
      });
    }
  }
}

export default TodoController;

