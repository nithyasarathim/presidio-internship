
import 'dotenv/config';
import express from "express";
import connectDB from "./configs/db.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";

const app=express();

app.use(requestLogger);


app.use(errorHandler);

connectDB();

const PORT=process.env.PORT;
app.listen(PORT,()=>{console.log(`Server is listening on port ${PORT}`)});