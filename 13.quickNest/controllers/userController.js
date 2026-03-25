
import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      phone,
    });


    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return next(new HttpError("unable to login", 400));
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {
    next(new HttpError(error.message, 400));
  }
};
export default { add, login };
