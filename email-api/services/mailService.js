import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async ({ to, subject, body }) => {
  return await transporter.sendMail({
    from: `"Email Service" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: body,
  });
};
