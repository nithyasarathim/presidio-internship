import { sendMail } from "../services/mailService.js";
import logger from "../utils/logger.js";

export const sendMailHandler = async (req, res, next) => {
  const { to, subject, body } = req.body;
  if (!to||!subject||!body) {
    return res.status(400).json({ success: false, message: "to, subject and body are required" });
  }
  try {
    const info = await sendMail({ to, subject, body });
    logger.info(`Mail sent to ${to} | Subject: "${subject}"`);
    res.json({
      success: true,
      message: "Mail sent successfully",
      id: info.messageId,
    });
  } catch (err) {
    logger.error(`Mail sending failed for ${to} | Error: ${err.message}`);
    next(err);
  }
};
