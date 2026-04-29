
import rateLimit from "express-rate-limit";


export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    message: "too many request from this IP,please try again later after 15 minutes"
})


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit:5,
    message:"too many request from this IP,please try again later after 15 minutes"
})