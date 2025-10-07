import 'dotenv/config';
import cors from 'cors';
import express from "express";
import connectDB from "./configs/db.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import patientsRoutes from "./routes/patientRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(cors());

app.use("/api/patients", patientsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/doctors",doctorRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital API",
      version: "1.0.0",
      description: "API documentation for Patient, Auth, and Analytics services",
    },
    servers: [{ url: "http://localhost:5000/api" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./controllers/*.js"], 
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
