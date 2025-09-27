import axios from "axios";
import logger from "../utilities/logger.js";

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;

export const sendWelcomeEmail = async (patient) => {
  const { name, email, dob, phone } = patient;
  const apiPath = "EmailService/sendWelcomeEmail";

  try {
    logger.log(apiPath, `Preparing welcome email for patient: ${email}`);
    const response = await axios.post(EMAIL_SERVICE_URL, {
      to: email,
      subject: "Welcome to Our Clinic",
      body: `Hello ${name},
            Thank you for registering with us.
            We look forward to serving you.
            Best Regards,
            Team Hospital`,
    });
    logger.log(apiPath, `Email sent successfully to ${email}, id: ${response.data.id}`);
  } catch (error) {
    logger.log(apiPath, `Failed to send welcome email: ${error.message}`);
  }
};
