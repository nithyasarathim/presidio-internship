import express from "express";
const router = express.Router();

import patientController from "../controllers/patientController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { doctorRateLimiter } from "../middlewares/rateLimitMiddleware.js";

router.post("/", authenticate, authorize("doctor"), doctorRateLimiter, patientController.createPatient);
router.get("/", authenticate, authorize("doctor"), doctorRateLimiter, patientController.getPatients);
router.get("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.getPatient);
router.put("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.updatePatient);
router.delete("/:id", authenticate, authorize("doctor"), doctorRateLimiter, patientController.deletePatient);

export default router;
