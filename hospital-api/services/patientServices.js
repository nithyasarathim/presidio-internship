import Patient from "../modals/patient.js";
import APIError from "../utilities/APIError.js";
// const { sendWelcomeEmail } = require("./emailService");

const createPatient = async (data) => {
  const patient = await Patient.create(data);
//   await sendWelcomeEmail(patient);
  return patient;
};

const getPatients = async () => {
  return await Patient.find();
};

const getPatientById = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new APIError(404, "Patient not found");
  return patient;
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
    deletePatient
}