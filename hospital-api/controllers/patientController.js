import patientService from "../services/patientServices.js";
import logger from "../utilities/logger.js";

const createPatient = async (req, res, next) => {
  const {originalUrl:apiPath} = req;
  const {body:data} = req;
  const {user:{id:doctorId}}= req;
  try {
    logger.log(apiPath, "Create patient request received");
    const patient = await patientService.createPatient(data,doctorId);
    logger.log(apiPath, "Patient created successfully");
    res.status(201).json({ success: true, patient });
  } catch (err) {
    next(err);
  }
};

const getPatients = async (req, res, next) => {
  const {originalUrl:apiPath} = req;
  try {
    logger.log(apiPath, "Get all patients request received");
    const { page, limit, sort } = req.query;
    const result = await patientService.getPatients({ page, limit, sort });

    logger.log(apiPath, "Patients retrieved successfully");
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const getPatient = async (req, res, next) => {
  const {originalUrl:apiPath} = req;
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
  const {originalUrl:apiPath} = req;
  const {params:{id:patientId}}=req;
  const {body}=req;
  try {
    logger.log(apiPath, `Update patient request received for ID: ${patientId}`);
    const updatedPatient = await patientService.updatePatient(patientId,body);
    logger.log(apiPath, "Patient updated successfully");
    res.json({ success: true, patient: updatedPatient });
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  const {originalUrl:apiPath} = req;
  const {params:{id:patientId}}=req;
  try {
    logger.log(apiPath, `Delete patient request received for ID: ${patientId}`);
    await patientService.deletePatient(patientId);
    logger.log(apiPath, "Patient deleted successfully");
    res.json({ success: true, message: "Patient deleted" });
  } catch (err) {
    next(err);
  }
};


export default {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
