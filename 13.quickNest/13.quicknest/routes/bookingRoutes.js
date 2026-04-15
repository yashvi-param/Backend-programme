import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);


router.get("/allBookings", auth, bookingController.getAllBookings);

router.get(
  "/allBookingByService/:id",
  auth,
  bookingController.getBookingByServiceId,
);

router.get("/loginUser", auth, bookingController.bookingByUserId);

router.post("/confirmBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.confirmBookingStatus);


router.post("/cancelBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.cancelBookingStatus);


router.post("/completeBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.completeBookingStatus);

router.get("/availableTimeSlots", auth, bookingController.availableTimeSlots);


router.get("/:id", auth, bookingController.getBookingById);

router.get(
  "/user/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.bookingByUserId,
);




export default router;
