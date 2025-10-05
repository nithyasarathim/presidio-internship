import authService from "../services/authService.js";
import logger from "../utilities/logger.js";

const register = async (req, res, next) => {
  try {
    const {body:data}=req;
    const doctor = await authService.register(data);
    const {email}=doctor;
    logger.log(req.originalUrl, `Doctor registered: ${email}`);
    res.status(201).json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { doctor, token } = await authService.login(req.body);
    logger.log(req.originalUrl, `Doctor logged in: ${doctor.email}`);
    res.json({ success: true, token, doctor });
  } catch (err) {
    next(err);
  }
};

const profile = async (req, res, next) => {
  try {
    const {user:{id:userId}}=req;
    const doctor = await authService.profile(userId);
    const {email}=doctor;
    logger.log(req.originalUrl, `Profile accessed: ${email}`);
    res.json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

export default { register, login, profile };
