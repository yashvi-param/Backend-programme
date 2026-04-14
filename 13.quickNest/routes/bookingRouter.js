import express from "express";
import auth from "../middleware/auth.js";
import bookingController from "../controller/bookingController.js";

const router = express.Router();

router.post("/create", auth, bookingController.createBooking);

router.get("/getallBookings", auth, bookingController.getAllBooking);
router.get("/getByServiceId/:id", auth, bookingController.getByServiceId);

export default router;