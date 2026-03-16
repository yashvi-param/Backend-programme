
import express from "express";

import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", userController.add);

router.post("/login", userController.login);

router.get("/allUser", auth, userController.getAllUser);

router.get("/authLogin", auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

router.patch("/update", auth, userController.updateuser);

router.delete("/delete", auth, userController.deleteUser);
export default router;
