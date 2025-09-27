import express from "express";
const router = express.Router();

import analyticsController from "../controllers/analyticsController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Analytics
 *   description: Admin-only analytics endpoints
 */

/**
 * @swagger
 * /analytics:
 *   get:
 *     summary: Get system analytics (Admin only)
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: recent
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of recent patients to return
 *     responses:
 *       200:
 *         description: Analytics data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticate, authorize("admin"), analyticsController.getAnalytics);

export default router;
