import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import patientRoutes from './routers/patientsRouter.js';
import errorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(logger); // Logs all incoming requests

// Mount Router
app.use('/api/patients', patientRoutes);

// Error Handling Middleware
// This must be the last middleware in the stack
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));