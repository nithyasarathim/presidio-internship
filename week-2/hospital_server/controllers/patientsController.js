import Patient from '../models/Patient.js';
import { sendWelcomeEmail } from '../services/transporter.js';

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
// @access  Public
const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Doctor
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

// @desc    Update a patient by ID
// @route   PUT /api/patients/:id
// @access  Doctor
const updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a patient by ID
// @route   DELETE /api/patients/:id
// @access  Doctor
const deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
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