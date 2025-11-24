import express from "express";
import router from "./routes/index.js";
import models from "./model/index.js";
import { PORT } from "./src/config/constant.js";
import errorHandler from "./src/middleware/errorHandler.js";
import swagger from "./src/config/swagger.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger documentation
app.use("/api/documentation", swagger);

app.use("/api", router);

app.use(errorHandler);

// Start server function
const startServer = async () => {
  try {
    // Test database connection
    await models.sequelize.authenticate();
    console.log("Database connection established successfully.");
    
    // Sync models (creates tables if they don't exist)
    await models.sequelize.sync({ alter: true });
    
    app.listen(PORT, () => {
      console.log(`Todo List API is running on http://localhost:${PORT}`);
      console.log(`API endpoints available at http://localhost:${PORT}/api/todos`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api/documentation`);
    });
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

