
import express from "express";
import BookController from "../controller/BookController.js";

const router = express.Router();

router.post("/", BookController.createBook);

router.get("/", BookController.allBooks);

router.get("/:id", BookController.bookById);

router.patch("/:id", BookController.updateBook);

router.delete("/:id", BookController.deleteBook);

export default router;
