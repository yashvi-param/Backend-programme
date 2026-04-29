import express from "express";
import bookingController from "../controller/bookingController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

// get all booking

router.get("/allBookings", auth, bookingController.getAllBookings);

router.get(
  "/allBookingByService/:id",
  auth,
  bookingController.getBookingByServiceId,
);

// get booking by userId user Route

router.get("/loginUser", auth, bookingController.bookingByUserId);



// get booking byId

router.get("/my/:id", auth, bookingController.getBookingById);

router.get(
  "/user/:id",
  auth,
  checkRole("admin", "super_admin"),
  bookingController.bookingByUserId,
);


// available time slots 


router.get("/timeSlots", auth, bookingController.availableTimeSlots)

// confirm booking

router.post("/confirmBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.confirmBooking);


// cancelled booking 


router.post("/cancelledBooking/:id", auth, checkRole("admin", "super_admin"), bookingController.cancelledBooking);




export default router;
