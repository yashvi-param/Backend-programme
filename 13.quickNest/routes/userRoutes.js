import express from "express";

import userController from "../controller/userController.js";

import validate from "../middleware/validate.js";
import auth from "../middleware/auth.js";
import uploads from "../middleware/upload.js";
import checkRole from "../middleware/checkRole.js";

import { authLimiter } from "../middleware/rateLimit.js"

import {
  createUserSchema,

} from "../validation/userSchema.js";

const router = express.Router();

router.post(
  "/add",
  uploads.single("profilePic"),
  validate(createUserSchema),
  userController.add,
);

router.post("/login", authLimiter, userController.login);

router.get("/authLogin", authLimiter, auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);


router.get("/allUSer", auth, checkRole("admin", "super_admin"), userController.allUser);


router.patch(
  "/update",
  uploads.single("profilePic"),
  auth,
  userController.update,
);

router.delete("/delete", auth, userController.deleteUser);


router.post("/forgot-password", userController.forgotPassword);

router.post("/reset-password/:token", userController.resetPassword)

export default router;
