import express from "express";
import upload from "../Middleware/upload.js";
import { createProfile } from "../controller/ProfileController.js";

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "projectImage", maxCount: 3 },
    { name: "introVideo", maxCount: 1 },
  ]),
  createProfile
);

export default router;