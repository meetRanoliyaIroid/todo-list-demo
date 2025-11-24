import express from "express";
import todoRoutes from "./todoRoute.js";

const router = express.Router();

router.use("/todos", todoRoutes);

export default router;

