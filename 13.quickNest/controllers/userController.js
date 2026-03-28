import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

     const newUser = {
      name,
      email,
      password,
      phone,
    };

    const user = new User(newUser);

    const token = await user.generateAuthToken();

    
    res.status(201).json({
      success: true,
      user,
      token
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return next(new HttpError("unable to login", 400));
    }

     const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return next(new HttpError("unable to login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



export default { add, login, authLogin };