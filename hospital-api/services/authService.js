import Doctor from "../modals/doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import APIError from "../utilities/APIError.js";

const register = async (data) => {
  const hashed = await bcrypt.hash(data.password,10);
  const doctor = await Doctor.create({ ...data,password:hashed});
  return doctor;
};

const login = async ({ email, password }) => {
  const doctor = await Doctor.findOne({email});
  if (!doctor) throw new APIError(401,"Invalid email or password");

  const match = await bcrypt.compare(password,doctor.password);
  if (!match) throw new APIError(401,"Invalid email or password");

  const token = jwt.sign(
    { id: doctor._id, role: doctor.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { doctor, token };
};

const profile = async (id) => {
  const doctor = await Doctor.findById(id).select("-password");
  if (!doctor) throw new APIError(404, "Doctor not found");
  return doctor;
};

export default { register, login, profile };
