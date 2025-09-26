import express from "express";
const router = express.Router();

import patientController from "../controllers/patientController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

router.post("/", authenticate, authorize("doctor"), patientController.createPatient);
router.get("/", authenticate, authorize("doctor"), patientController.getPatients);
router.get("/:id", authenticate, authorize("doctor"), patientController.getPatient);
router.put("/:id", authenticate, authorize("doctor"), patientController.updatePatient);
router.delete("/:id", authenticate, authorize("doctor"), patientController.deletePatient);

router.get("/analytics/stats", authenticate, authorize("admin"), patientController.getStats);


export default router;
