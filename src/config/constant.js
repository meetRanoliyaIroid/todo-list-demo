/**
 * constant.js
 * @description :: constants used in configuration
 */

import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "localhost";

export const DB_CONNECTION = process.env.DB_CONNECTION || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || (process.env.DB_CONNECTION === "mysql" ? "root" : "postgres");
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "todo_list_db";
export const DB_PORT = process.env.DB_PORT || (process.env.DB_CONNECTION === "mysql" ? 3306 : 5432);

export const baseUrl = (path = null) => {
  const url = `http://${HOST}:${PORT}`;
  return url + (path ? `/${path}` : "");
};

export const apiBaseUrl = (path = null) => {
  const url = `http://${HOST}:${PORT}/api`;
  return url + (path ? `/${path}` : "");
};

