import Patient from "../modals/patient.js";
import APIError from "../utilities/APIError.js";
import { sendWelcomeEmail } from "./emailService.js";

const createPatient = async (data, doctorId) => {
  const patient = await Patient.create({ ...data, doctor: doctorId });
  await sendWelcomeEmail(patient);
  return patient;
};

const getPatientById = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new APIError(404, "Patient not found");
  return patient;
};

const getPatients = async ({ doctorId, page = 1, limit = 5, sort = "createdAt_desc" }) => {
  const skip = (page - 1) * limit;
  const sortField = sort.split("_")[0];
  const sortOrder = sort.split("_")[1] === "desc" ? -1 : 1;

  const totalPatients = await Patient.countDocuments({ doctor: doctorId });
  const totalPages = Math.ceil(totalPatients / limit);

  const patients = await Patient.find({ doctor: doctorId })
    .sort({ [sortField]: sortOrder })
    .skip(Number(skip))
    .limit(Number(limit));

  return {
    doctorId,
    patients,
    page: Number(page),
    totalPages,
    totalPatients,
  };
};

const updatePatient = async (id, data) => {
  const patient = await Patient.findByIdAndUpdate(id, data, { new: true });
  if (!patient) throw new APIError(404, "Patient not found");
  return patient;
};

const deletePatient = async (id) => {
  const patient = await Patient.findByIdAndDelete(id);
  if (!patient) throw new APIError(404, "Patient not found");
};

export default {
  createPatient,
  getPatientById,
  getPatients,
  updatePatient,
  deletePatient,
};
