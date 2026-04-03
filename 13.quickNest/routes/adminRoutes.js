

import express from "express";

import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";

import adminController from "../controllers/adminController.js";


const router = express.Router();

router.patch(
    "/update/:id", 
    auth, 
    checkRole("admin", "super_admin"), 
    adminController.updateUserData);

    
router.delete(
    "/delete/:id", 
    auth, 
    checkRole("admin", "super_admin"), 
    adminController.deleteUser);


export default router;
