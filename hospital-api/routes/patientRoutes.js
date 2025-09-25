import express from "express";
const router = express.Router();
import patientController from "../controllers/patientController.js";

router.post("/", patientController.createPatient); 
router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient); 

export default router;
