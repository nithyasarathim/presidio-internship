import express from "express";
const router = express.Router();

import patientController from "../controllers/patientController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { doctorRateLimiter } from "../middlewares/rateLimitMiddleware.js";

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: CRUD operations for patients
 */

/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create a new patient (Doctor only)
 *     tags: [Patients]
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
 *               - age
 *               - email
 *               - phone
 *               - dob
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Patient created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", authenticate, authorize("doctor"), doctorRateLimiter, patientController.createPatient);

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients (Doctor only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of patients per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: createdAt_desc
 *         description: Sorting field and order
 *       - in: query
 *         name: age
 *         schema:
 *           type: integer
 *         description: Filter by age
 *     responses:
 *       200:
 *         description: List of patients
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get("/", authenticate, authorize("doctor"), doctorRateLimiter, patientController.getPatients);

/**
 * @swagger
 * /patients/{id}:
 *   get:
 *     summary: Get patient by ID (Doctor only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.get("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.getPatient);

/**
 * @swagger
 * /patients/{id}:
 *   put:
 *     summary: Update patient by ID (Doctor only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.put("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.updatePatient);

/**
 * @swagger
 * /patients/{id}:
 *   delete:
 *     summary: Delete patient by ID (Doctor only)
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Patient not found
 */
router.delete("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.deletePatient);

export default router;
