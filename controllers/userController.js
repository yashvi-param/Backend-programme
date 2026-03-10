import User from "../model/User.js";
import HttpError from "../middleware/httpError.js";

// CREATE USER
const createUser = async (req, res, next) => {
  try {

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};

export default createUser;