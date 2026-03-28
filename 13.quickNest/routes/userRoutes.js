import express from "express";
import userController from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/registerSchema.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add", validate(registerSchema), userController.add);

router.post("/login", userController.login);

router.get("/authLogin", auth, userController.authLogin);

export default router;