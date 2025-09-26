import jwt from "jsonwebtoken";
import APIError from "../utilities/APIError.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new APIError(401, "No token provided");

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    throw new APIError(401, "Invalid token");
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new APIError(403, "Forbidden: insufficient role");
    }
    next();
  };
};
