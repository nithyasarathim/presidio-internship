import rateLimit,{ipKeyGenerator} from "express-rate-limit";

export const patientRateLimiter = rateLimit({
  windowMs:1*60*1000,
  max: 20,
  keyGenerator: (req) => {
    if(req.user?.id) return req.user.id;
    return ipKeyGenerator(req);
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests, please try again after a minute."
    });
  }
});
