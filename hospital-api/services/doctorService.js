import Doctor from "../modals/doctor.js";
import bcrypt from "bcryptjs";
import APIError from "../utilities/APIError.js";

const createDoctor = async (data) => {
  const existing = await Doctor.findOne({ email: data.email });
  if (existing) throw new APIError(400, "Doctor with this email already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const doctor = await Doctor.create({ ...data, password: hashedPassword });
  return doctor;
};

const getDoctors = async () => {
  const doctors = await Doctor.find().select("-password");
  return doctors;
};

const getDoctorById = async (id) => {
  const doctor = await Doctor.findById(id).select("-password");
  if (!doctor) throw new APIError(404, "Doctor not found");
  return doctor;
};

// Update doctor info
const updateDoctor = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  const doctor = await Doctor.findByIdAndUpdate(id, data, { new: true }).select("-password");
  if (!doctor) throw new APIError(404, "Doctor not found");
  return doctor;
};

// Delete doctor
const deleteDoctor = async (id) => {
  const doctor = await Doctor.findByIdAndDelete(id);
  if (!doctor) throw new APIError(404, "Doctor not found");
  return doctor;
};

export default {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
