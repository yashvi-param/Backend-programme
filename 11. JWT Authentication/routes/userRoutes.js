import express from "express";
import createUser from "../controllers/userController.js";

const router = express.Router();

// ADD USER
router.post("/add", createUser);

export default router;