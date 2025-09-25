
import 'dotenv/config';
import express from "express";
import connectDB from "./configs/db.js";
import requestLogger from "./middlewares/requestLogger.js";

const app=express();

app.use(requestLogger);

connectDB();

app.listen(5000,()=>{console.log("Server is listening on port 5000")});