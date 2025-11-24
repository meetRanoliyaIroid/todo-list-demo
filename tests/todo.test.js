import request from "supertest";
import app from "../app.js";
import Todo from "../model/todo.js";
import sequelize from "../src/config/database.js";

// Set NODE_ENV to test
process.env.NODE_ENV = "test";

describe("Todo API Endpoints", () => {
  beforeAll(async () => {
    // Sync database before running tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close database connection after tests
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clean up todos before each test
    await Todo.destroy({ where: {}, truncate: true });
  });

  describe("POST /api/todos", () => {
    it("should create a new todo", async () => {
      const todoData = {
        text: "Test todo item",
      };

      const response = await request(app)
        .post("/api/todos")
        .send(todoData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.text).toBe(todoData.text);
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.id).toBeDefined();
    });

    it("should return validation error if text is missing", async () => {
      const response = await request(app)
        .post("/api/todos")
        .send({})
        .expect(422);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("required");
    });

    it("should return validation error if text is empty", async () => {
      const response = await request(app)
        .post("/api/todos")
        .send({ text: "" })
        .expect(422);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/todos", () => {
    it("should get all todos", async () => {
      // Create some test todos
      await Todo.create({ text: "Todo 1", completed: false });
      await Todo.create({ text: "Todo 2", completed: true });

      const response = await request(app)
        .get("/api/todos")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
    });

    it("should return empty array when no todos exist", async () => {
      const response = await request(app)
        .get("/api/todos")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
    });
  });

  describe("PUT /api/todos/:id", () => {
    it("should update todo completed status", async () => {
      const todo = await Todo.create({ text: "Test todo", completed: false });

      const response = await request(app)
        .put(`/api/todos/${todo.id}`)
        .send({ completed: true })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.completed).toBe(true);
    });

    it("should return 404 if todo not found", async () => {
      const response = await request(app)
        .put("/api/todos/99999")
        .send({ completed: true })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });

    it("should return validation error if completed is missing", async () => {
      const todo = await Todo.create({ text: "Test todo", completed: false });

      const response = await request(app)
        .put(`/api/todos/${todo.id}`)
        .send({})
        .expect(422);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/todos/:id", () => {
    it("should delete a todo", async () => {
      const todo = await Todo.create({ text: "Test todo", completed: false });

      const response = await request(app)
        .delete(`/api/todos/${todo.id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain("deleted successfully");
      expect(response.body.data).toBeNull();

      // Verify todo is actually deleted
      const deletedTodo = await Todo.findByPk(todo.id);
      expect(deletedTodo).toBeNull();
    });

    it("should return 404 if todo not found", async () => {
      const response = await request(app)
        .delete("/api/todos/99999")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });
  });
});

