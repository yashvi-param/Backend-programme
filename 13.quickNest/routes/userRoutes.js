
import express from "express";

import userController from "../controllers/userController.js";

import registerSchema from "../validation/UserSchema.js";

import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import uploads from "../middleware/upload.js";


const router = express.Router();

// ADD USER
router.post("/add", validate(registerSchema),uploads.single("profilePic"), userController.add);

// LOGIN USER
router.post("/login", userController.login);


// PROTECTED
router.get("/authLogin", auth, userController.authLogin);


router.post("/logOut", auth, userController.logOut);


router.post("/logOutAll", auth, userController.logOutAll);


router.get(
  "/allUser",
  auth,
  checkRole("admin", "super_admin"),
  userController.allUser,
);


router.patch("/update", auth, userController.update);


router.delete("/delete", auth, userController.deleteUser);

export default router;
