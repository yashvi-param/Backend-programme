import HttpError from "../middleware/HttpError.js";
import User from "../model/UserModel.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    const user = new User(newUser);

    const token = await user.generateAuthToken();

    await user.save();

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpError("unable to login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }

    res.status(200).json({ success: true, users });
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

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    req.user.save();

    res.status(200).json({ message: "user log out successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    req.user.save();

    res
      .status(200)
      .json({ message: "user logout from all device successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { add, login, getAllUser, authLogin, logOut, logOutAll };