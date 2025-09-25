import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
