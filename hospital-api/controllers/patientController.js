import patientService from "../services/patientServices.js";
import logger from "../utilities/logger.js";

const createPatient = async (req, res, next) => {
  const apiPath = req.originalUrl;
  const data=req.body;
  try {
    logger.log(apiPath, "Create patient request received");
    const patient = await patientService.createPatient(data);
    logger.log(apiPath, "Patient created successfully");
    res.status(201).json({ success: true, patient });
  } catch (err) {
    next(err);
  }
};

const getPatients = async (req, res, next) => {
  const apiPath = req.originalUrl;
  try {
    logger.log(apiPath, "Get all patients request received");
    const patients = await patientService.getPatients();
    logger.log(apiPath, "Patients retrieved successfully");
    res.json({ success: true, patients });
  } catch (err) {
    next(err);
  }
};

const getPatient = async (req, res, next) => {
  const apiPath = req.originalUrl;
  try {
    logger.log(apiPath, `Get patient request received for ID: ${req.params.id}`);
    const patient = await patientService.getPatientById(req.params.id);
    logger.log(apiPath, "Patient retrieved successfully");
    res.json({ success: true, patient });
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  const apiPath = req.originalUrl;
  try {
    logger.log(apiPath, `Update patient request received for ID: ${req.params.id}`);
    const updatedPatient = await patientService.updatePatient(req.params.id, req.body);
    logger.log(apiPath, "Patient updated successfully");
    res.json({ success: true, patient: updatedPatient });
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  const apiPath = req.originalUrl;
  try {
    logger.log(apiPath, `Delete patient request received for ID: ${req.params.id}`);
    await patientService.deletePatient(req.params.id);
    logger.log(apiPath, "Patient deleted successfully");
    res.json({ success: true, message: "Patient deleted" });
  } catch (err) {
    next(err);
  }
};

export default  {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient
};