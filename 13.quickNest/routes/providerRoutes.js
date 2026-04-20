import express from "express";
import providerController from "../controllers/providerController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/register", 
  auth, 
  providerController.registerAsProvider
);

export default router;