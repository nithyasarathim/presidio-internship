import Patient from '../models/Patient.js';
import { sendWelcomeEmail } from '../services/emailService.js';
import ApiError from '../utils/ApiError.js';
import logRequest from '../utils/logger.js';

const getAllPatients = async (req, res, next) => {
  try {
    logRequest(req, res);
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    logRequest(req, res);
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

const createPatient = async (req, res, next) => {
  try {
    logRequest(req, res);
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    await sendWelcomeEmail(savedPatient.email, savedPatient.name);
    res.status(201).json(savedPatient);
  } catch (err) {
    next(err);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    logRequest(req, res);
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    logRequest(req, res);
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
