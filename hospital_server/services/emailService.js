const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL;

const sendWelcomeEmail = async (patientEmail, patientName) => {
  try {
    console.log('Sending email request to:', EMAIL_SERVICE_URL); 

    const response = await fetch(EMAIL_SERVICE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: patientEmail,
        subject: 'Welcome to our Healthcare Portal!',
        text: `Hello ${patientName},\n\nWelcome! A doctor has added you as a new patient. We're here to help you with your healthcare needs.`,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Email server responded with ${response.status}: ${errorText}`);
    }

    console.log(`Requested welcome email to ${patientEmail}`);
  } catch (err) {
    console.error('Failed to send welcome email: Full error object ->', err);
    console.error('Failed to send welcome email: Error message ->', err.message);
    console.error('Failed to send welcome email: Stack trace ->', err.stack);
  }
};

export { sendWelcomeEmail };
