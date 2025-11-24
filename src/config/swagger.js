import express from "express";
import { serve, setup } from "swagger-ui-express";
import { apiBaseUrl, PORT, HOST } from "./constant.js";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const swaggerDoc = YAML.load(path.join(__dirname, "../../swagger.yaml"));

router.use(
  "/",
  (req, res, next) => {
    swaggerDoc.info.title = "Todo List API";
    swaggerDoc.servers = [
      {
        url: apiBaseUrl(),
        description: "API Base URL",
      },
      {
        url: `http://${HOST}:${PORT}/api`,
        description: "Local Development Server",
      },
    ];
    req.swaggerDoc = swaggerDoc;
    next();
  },
  serve,
  setup(swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "list",
    },
  })
);

export default router;

