import BookModel from "../models/BookModel.js";
import HttpError from "../middleware/HttpError.js";

const createBook = async (req, res, next) => {
  try {

    const book = new BookModel(req.body);

    await book.save();

    res.status(201).json({
      message: "Book created successfully",
      book,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const allBooks = async (req, res, next) => {
  try {

    const books = await BookModel.find();

    res.status(200).json({
      message: "Books fetched successfully",
      books,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const bookById = async (req, res, next) => {
  try {

    const book = await BookModel.findById(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json({
      message: "Book found",
      book,
    });

  } catch (error) {
    next(new HttpError("Invalid book ID", 400));
  }
};


const updateBook = async (req, res, next) => {
  try {

    const book = await BookModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteBook = async (req, res, next) => {
  try {

    const book = await BookModel.findByIdAndDelete(req.params.id);

    if (!book) {
      return next(new HttpError("Book not found", 404));
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default {
  createBook,
  allBooks,
  bookById,
  updateBook,
  deleteBook,
};