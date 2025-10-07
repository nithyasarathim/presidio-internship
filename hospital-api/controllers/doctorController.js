import doctorService from "../services/doctorService.js";
import logger from "../utilities/logger.js";

// Create a doctor (Admin)
const createDoctor = async (req, res, next) => {
  const { originalUrl: apiPath, body } = req;
  try {
    logger.log(apiPath, "Create doctor request received");
    const doctor = await doctorService.createDoctor(body);
    logger.log(apiPath, "Doctor created successfully");
    res.status(201).json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

// Get all doctors
const getDoctors = async (req, res, next) => {
  const { originalUrl: apiPath } = req;
  try {
    logger.log(apiPath, "Get all doctors request received");
    const doctors = await doctorService.getDoctors();
    res.json({ success: true, doctors });
  } catch (err) {
    next(err);
  }
};

// Get doctor by ID
const getDoctor = async (req, res, next) => {
  const { originalUrl: apiPath, params: { id } } = req;
  try {
    logger.log(apiPath, `Get doctor request received for ID: ${id}`);
    const doctor = await doctorService.getDoctorById(id);
    res.json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

// Update doctor
const updateDoctor = async (req, res, next) => {
  const { originalUrl: apiPath, params: { id }, body } = req;
  try {
    logger.log(apiPath, `Update doctor request received for ID: ${id}`);
    const doctor = await doctorService.updateDoctor(id, body);
    res.json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

// Delete doctor
const deleteDoctor = async (req, res, next) => {
  const { originalUrl: apiPath, params: { id } } = req;
  try {
    logger.log(apiPath, `Delete doctor request received for ID: ${id}`);
    await doctorService.deleteDoctor(id);
    res.json({ success: true, message: "Doctor deleted" });
  } catch (err) {
    next(err);
  }
};

export default {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
