import HttpError from "./HttpError.js";

const checkauth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(new HttpError("Please login", 401));
  }
  next();
};

export default checkauth;