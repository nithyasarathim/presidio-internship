import express from "express";
const router = express.Router();

import analyticsController from "../controllers/analyticsController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

router.get("/", authenticate, authorize("admin"),  analyticsController.getAnalytics);

export default router;
