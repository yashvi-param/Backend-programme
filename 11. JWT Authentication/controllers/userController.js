
import HttpsError from "../middleware/HttpError.js";

import User from "../model/User.js";

const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = await user.generateAuthToken();

    res.status(201).json({ success: true, user, token });
  } catch (error) {
    next(new HttpsError(error.message));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      next(new HttpsError("Enable To Login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpsError(error.message));
  }
};

const getAllUser = async (req, res, next) => {
  const users = await User.find({});

  if (users.length === 0) {
    next(new HttpsError("User not found"));
  }

  res.status(200).json({ success: true, users });
};

export default { addUser, login, getAllUser };
