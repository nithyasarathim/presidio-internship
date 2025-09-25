import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
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
