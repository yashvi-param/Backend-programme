import express from "express";
import auth from "../middleware/auth.js";
import bookingController from "../controller/bookingController.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

router.get("/getallBookings", auth, bookingController.getAllBooking);
router.get("/getByServiceId/:id", auth, bookingController.getByServiceId);

router.get("/getByUserId/:id", auth, bookingController.getBookingById);

//Booking Status

router.post(
  "/confirmBooking/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.confirmBooking,
);
router.post(
  "/cancelBooking/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.cancelBooking,
);
router.post(
  "/completeBooking/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.completeBooking,
);

router.get("/timeSlot", auth, bookingController.availableTimeSlot);

router.get("/user", auth, bookingController.bookingByUserId);

router.get(
  "/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.bookingByUserId,
);

export default router;