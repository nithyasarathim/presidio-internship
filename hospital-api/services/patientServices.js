import Patient from "../modals/patient.js";
import APIError from "../utilities/APIError.js";
import { sendWelcomeEmail } from "./emailService.js";

const createPatient = async (data,doctorId) => {
  const patient = await Patient.create({...data,doctor:doctorId});
  await sendWelcomeEmail(patient);
  return patient;
};

const getPatients = async ({ page = 1, limit = 10, sort, filters }) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (filters.age) query.age = filters.age;
  if (filters.gender) query.gender = filters.gender;
  let sortOption = {};
  if (sort) {
    const [field, order] = sort.split("_");
    sortOption[field] = order === "desc" ? -1 : 1;
  }
  const patients = await Patient.find(query)
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .sort(sortOption);
  const total = await Patient.countDocuments(query);
  return {
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    patients,
  };
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

const getStats = async () => {
  const totalPatients = await Patient.countDocuments();
  return { totalPatients };
};

export default {
  createPatient,
  getPatientById,
  getPatients,
  updatePatient,
  deletePatient,
  getStats
};
