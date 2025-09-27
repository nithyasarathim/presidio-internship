import authService from "../services/authService.js";
import logger from "../utilities/logger.js";

const register = async (req, res, next) => {
  try {
    const doctor = await authService.register(req.body);
    logger.log(req.originalUrl, `Doctor registered: ${doctor.email}`);
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
    const doctor = await authService.profile(req.user.id);
    logger.log(req.originalUrl, `Profile accessed: ${doctor.email}`);
    res.json({ success: true, doctor });
  } catch (err) {
    next(err);
  }
};

export default { register, login, profile };
