
import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { updateUserSchema,createUserSchema } from "../validation/UserSchema.js";
import userController from "../controller/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/addUser",upload.single("profilePic"),validate(createUserSchema),userController.addUser);
router.post("/login",userController.login);
router.get("/authLogin",auth,userController.authLogin);
router.post("/logOut",auth,userController.logOut);
router.post("/logOutAll",auth,userController.logOutAll);
router.get("/allUser",auth,userController.allUser);
router.patch("/update",auth,upload.single("image"),validate(updateUserSchema),userController.updateUser);
router.delete("/delete",auth,userController.deleteUser);

export default router;