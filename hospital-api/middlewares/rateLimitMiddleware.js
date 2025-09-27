import rateLimit from "express-rate-limit";

export const patientRateLimiter = rateLimit({
  windowMs:1*60*1000,
  max: 20,
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again after a minute."
    });
  }
});
