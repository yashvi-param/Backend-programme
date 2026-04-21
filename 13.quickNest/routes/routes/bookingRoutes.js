import express from "express";
import auth from "../middleware/auth.js"
import bookingController from "../controller/bookingController.js";


const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

// get all booking

router.get("/allBookings", auth, bookingController.getAllBooking);

router.get(
  "/allBookingByServiceId/:id",
  auth,
  bookingController.getAllService,
);

router.get("/user", auth, bookingController.getBookingsByUserId)

export default router;             