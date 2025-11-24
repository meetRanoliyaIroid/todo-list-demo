/**
 * todoResource.js
 * @description :: resource for transforming todo data
 */

export default class TodoResource {
  constructor(data) {
    if (Array.isArray(data)) {
      // Handle array of todos
      return data.map(todo => this.transformTodo(todo));
    } else if (data && data.dataValues) {
      // Handle Sequelize model instance
      return this.transformTodo(data);
    } else if (data) {
      // Handle plain object
      return this.transformTodo(data);
    }
    return null;
  }

  transformTodo(todo) {
    // Get the data values if it's a Sequelize instance
    const todoData = todo.dataValues || todo;

    return {
      id: todoData.id,
      text: todoData.text,
      completed: todoData.completed || false,
      created_at: +todoData.created_at,
      updated_at: +todoData.updated_at,
    };
  }
}

