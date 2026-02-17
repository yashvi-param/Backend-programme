import StudentModel from "../model/StudentModel.js";
import HttpError from "../Middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, course, isActive } =
      req.body;

    const newStudent = {
      firstName,
      lastName,
      email,
      phoneNumber,
      course,
      isActive,
    };

    const studentDetail = await new StudentModel(newStudent);

    await studentDetail.save();

    res.status(201).json({ message: "student detail saved", studentDetail });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default add;