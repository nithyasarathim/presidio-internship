import express from "express";
const router = express.Router();

import patientController from "../controllers/patientController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { patientRateLimiter } from "../middlewares/rateLimitMiddleware.js";

router.post("/", authenticate, authorize("doctor"), patientRateLimiter, patientController.createPatient);
router.get("/", authenticate, authorize("doctor"), patientRateLimiter, patientController.getPatients);
router.get("/:id", authenticate, authorize("doctor"), patientRateLimiter, patientController.getPatient);
router.put("/:id", authenticate, authorize("doctor"), patientRateLimiter, patientController.updatePatient);
router.delete("/:id", authenticate, authorize("doctor"), patientRateLimiter, patientController.deletePatient);

export default router;
