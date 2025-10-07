import express from "express";
const router = express.Router();

import doctorController from "../controllers/doctorController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: CRUD operations for doctors (Admin only)
 */

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Create a new doctor (Admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Doctor created successfully
 *       400:
 *         description: Doctor already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", authenticate, authorize("admin"), doctorController.createDoctor);

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Get all doctors (Admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticate, authorize("admin"), doctorController.getDoctors);

/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     summary: Get doctor by ID (Admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.get("/:id", authenticate, authorize("admin"), doctorController.getDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   put:
 *     summary: Update doctor by ID (Admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.put("/:id", authenticate, authorize("admin"), doctorController.updateDoctor);

/**
 * @swagger
 * /doctors/{id}:
 *   delete:
 *     summary: Delete doctor by ID (Admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Doctor not found
 */
router.delete("/:id", authenticate, authorize("admin"), doctorController.deleteDoctor);

export default router;
