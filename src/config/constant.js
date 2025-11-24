/**
 * constant.js
 * @description :: constants used in configuration
 */

import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "localhost";
export const IS_SECURE = process.env.IS_SECURE || false;
export const IS_PROXY = process.env.IS_PROXY || false;

export const DB_CONNECTION = process.env.DB_CONNECTION || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USERNAME = process.env.DB_USERNAME || (process.env.DB_CONNECTION === "mysql" ? "root" : "postgres");
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "todo_list_db";
export const DB_PORT = process.env.DB_PORT || (process.env.DB_CONNECTION === "mysql" ? 3306 : 5432);

export const baseUrl = (path = null) => {
  let url = '';
  if (IS_PROXY == "true") {
    url = `https://${HOST}`;
    return url + (path ? `/${path}` : "");
  }
  url = `http://${HOST}:${PORT}`;
  if (IS_SECURE == "true") {
    url = `https://${HOST}:${PORT}`;
  }
  return url + (path ? `/${path}` : "");
};

export const apiBaseUrl = (path = null) => {
  let url = '';
  if (IS_PROXY == "true") {
    url = `https://${HOST}/api`;
    return url + (path ? `/${path}` : "");
  }
  url = `http://${HOST}:${PORT}/api`;
  if (IS_SECURE == "true") {
    url = `https://${HOST}:${PORT}/api`;
  }
  return url + (path ? `/${path}` : "");
};

