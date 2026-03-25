
import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/add", userController.add);

router.post("/login", userController.login);

export default router;
