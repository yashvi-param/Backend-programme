import HttpError from "./HttpError";

const checkRoll = (...roll) => async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new HttpError(401, "please authentication"));
    }
    if (!roll.includes(user.roll)) {
      return next(new HttpError(403, "Forbidden access denied"));
    }
    next();
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default checkRoll;