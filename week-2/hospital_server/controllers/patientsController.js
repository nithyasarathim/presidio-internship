import Patient from '../models/Patient.js';
import { sendWelcomeEmail } from '../services/emailService.js';
import ApiError from '../utils/ApiError.js';

// @desc   Get all patients
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

// @desc   Get a single patient by ID
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

// @desc   Create a new patient
const createPatient = async (req, res, next) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    await sendWelcomeEmail(savedPatient.email, savedPatient.name);
    res.status(201).json(savedPatient);
  } catch (err) {
    next(err);
  }
};

// @desc   Update a patient by ID
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

// @desc   Delete a patient by ID
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};
