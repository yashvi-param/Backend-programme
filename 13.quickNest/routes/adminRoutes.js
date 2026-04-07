
import express from "express";

import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

import adminController from "../controller/adminController.js";
import categoryController from "../controller/categoryController.js";
import serviceController from "../controller/serviceController.js";

import validate from "../middleware/validate.js";

import { createCategorySchema, updateCategorySchema } from "../validation/categorySchema.js";

const router = express.Router();

router.patch(
  "/update/:id",
  auth,
  checkRole("admin", "super_admin"),
  adminController.updateUserData,
);

router.delete(
  "/delete/:id",
  auth,
  checkRole("admin", "super_admin"),
  adminController.deleteUser,
);

router.post(
  "/addCategory",
  auth,
  validate(createCategorySchema),
  checkRole("admin", "super_admin"),
  categoryController.add,
);

router.get(
  "/categories",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.getAll,
);

router.get(
  "/category/:id",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.getById,
);

router.patch(
  "/updateCategory/:id",
  auth,
  validate(updateCategorySchema),
  checkRole("admin", "super_admin"),
  categoryController.update,
);

router.delete(
  "/deleteCategory/:id",
  auth,
  checkRole("admin", "super_admin"),
  categoryController.deleteCategory,
);

router.post(
  "/addService",
  auth,
  checkRole("admin", "super_admin"),
  serviceController.add,
);

export default router;
