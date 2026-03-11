import HttpsError from "../middleware/httpError.js";

import User from "../model/User.js";


const addUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ success: true, user });
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

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpsError(error.message));
  }
};

export default { addUser, login };