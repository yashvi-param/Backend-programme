import express from "express";
import providerController from "../controller/providerController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router();

router.post(
  "/register", 
  auth, 
  providerController.registerAsProvider
);


router.get(
  "/providers",
  auth,
  checkRole("admin", "super_admin"),
  providerController.getProviders
);



export default router;