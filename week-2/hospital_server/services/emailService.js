import transporter from '../config/transporter.js';

const sendWelcomeEmail = async (patientEmail, patientName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: patientEmail,
    subject: 'Welcome to our Healthcare Portal!',
    text: `Hello ${patientName},\n\nWelcome! A doctor has added you as a new patient. We're here to help you with your healthcare needs.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${patientEmail}`);
  } catch (error) {
    console.error(`Failed to send welcome email to ${patientEmail}:`, error);
  }
};

export { sendWelcomeEmail };