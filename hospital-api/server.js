
import 'dotenv/config';
import express from "express";
import connectDB from "./configs/db.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import patientsRoutes from "./routes/patientRoutes.js";

const app=express();

app.use(express.json());

app.use(requestLogger);
app.use("/api/patients",patientsRoutes);
app.use(errorHandler);

connectDB();

const PORT=process.env.PORT;
app.listen(PORT,()=>{console.log(`Server is listening on port ${PORT}`)});