
import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";
import { updateUserSchema } from "../validation/UserSchema.js";
import adminController from "../controller/adminController.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.patch("/update/:id", validate(updateUserSchema), auth, checkRole("admin", "super_admin"), adminController.updateUserData);
router.delete("/delete/:id", auth, checkRole("admin", "super_admin"), adminController.deleteUser);

export default router;