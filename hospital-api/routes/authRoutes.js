import express from "express";
import authController from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authenticate, authController.profile);

export default router;
