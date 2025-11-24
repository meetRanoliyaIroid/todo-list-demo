import express from "express";
import router from "./routes/index.js";
import models from "./model/index.js";
import { PORT, IS_SECURE, HOST } from "./src/config/constant.js";
import errorHandler from "./src/middleware/errorHandler.js";
import swagger from "./src/config/swagger.js";
import fs from "fs";
import http from "http";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger documentation
app.use("/api/documentation", swagger);

app.use("/api", router);

app.use(errorHandler);

// Create HTTP server
const server = http.Server(app);

// Start server function
const startServer = async () => {
  try {
    // Test database connection
    await models.sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    // Sync models (creates tables if they don't exist)
    await models.sequelize.sync({ alter: true });
    
    if (IS_SECURE == "true") {
      // HTTPS configuration
      const options = {
        key: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`),
        cert: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
        ca: [
          fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
          fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`),
        ],
      };
      const httpsServer = https.Server(options, app);

      httpsServer.listen(PORT, () => {
        console.log(`HTTPS server is running on https://${HOST}:${PORT}`);
        console.log(`API endpoints available at https://${HOST}:${PORT}/api/todos`);
        console.log(`Swagger documentation available at https://${HOST}:${PORT}/api/documentation`);
      });
    } else {
      // HTTP server
      server.listen(PORT, () => {
        console.log(`HTTP server is running on http://${HOST}:${PORT}`);
        console.log(`API endpoints available at http://${HOST}:${PORT}/api/todos`);
        console.log(`Swagger documentation available at http://${HOST}:${PORT}/api/documentation`);
      });
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;

