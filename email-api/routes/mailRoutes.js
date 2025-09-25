import express from "express";
import { sendMailHandler } from "../controllers/mailController.js";


const router = express.Router();
router.post("/send", sendMailHandler);

export default router;
