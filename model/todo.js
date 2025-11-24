/**
 * todo.js
 * @description :: sequelize model of database table todos
 */

import sequelize from "../src/config/database.js";
import { DataTypes } from "sequelize";

let Todo = sequelize.define(
  "todos",
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Todo;

