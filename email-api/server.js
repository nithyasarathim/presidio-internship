import express from "express";
import dotenv from "dotenv";
import mailRoutes from "./routes/mailRoutes.js";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/mail", mailRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Email Service is running" });
});

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

app.listen(process.env.PORT, () => {
  logger.info(`Email service running on port ${process.env.PORT}`);
});
