import rateLimit from "express-rate-limit";
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: "Too many request,  please try again in 15 minutes" },
  standardHeaders: true,
  legacyHeaders: false,
});
