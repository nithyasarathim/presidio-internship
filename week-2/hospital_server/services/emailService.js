
import axios from 'axios';

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;

const sendWelcomeEmail = async (patientEmail, patientName) => {
  try {
    await axios.post(EMAIL_SERVICE_URL, {
      to: patientEmail,
      subject: 'Welcome to our Healthcare Portal!',
      text: `Hello ${patientName},\n\nWelcome! A doctor has added you as a new patient. We're here to help you with your healthcare needs.`,
    });
    console.log(`Requested welcome email to ${patientEmail}`);
  } catch (err) {
    console.error(`Failed to send welcome email to ${patientEmail}:`, err.message);
  }
};
