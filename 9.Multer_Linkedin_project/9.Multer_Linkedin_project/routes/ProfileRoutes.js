import express from "express";
import upload from "../Middleware/upload.js";
import ProfileController from "../controller/ProfileController.js";

const router = express.Router();

// Add Profile
router.post(
  "/add",
  upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "introVideo", maxCount: 1 },
  { name: "projectImages", maxCount: 5 }, 
  ]),
  ProfileController.createProfile
);


// Get All Profiles
router.get("/allProfiles", ProfileController.getAllProfiles);

// Get Profile By ID
router.get("/:id", ProfileController.getProfileById);

export default router;