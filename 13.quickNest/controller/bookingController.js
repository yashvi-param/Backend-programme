import HttpError from "../middleware/HttpError.js";
import Booking from "../model/Booking.js";
import Service from "../model/service.js";

const createBooking = async (req, res, next) => {
  try {
    const { serviceId, bookingDate, timeSlot, note } = req.body;

    const userId = req.user._id;

    const service = await Service.findById(serviceId);
    if (!service) {
      return next(new HttpError("Service not Founded", 404));
    }

    if (!service.isActive) {
      return next(
        new HttpError(
          "Service is currently not active please try again some time",
          400,
        ),
      );
    }

    const startOfDate = new Date(bookingDate);
    startOfDate.setHours(0, 0, 0, 0);

    const endOfDate = new Date(bookingDate);
    endOfDate.setHours(23, 59, 59, 999);

    const existingBooking = await Booking.findOne({
      serviceId,
      bookingDate: { $gte: startOfDate, $lt: endOfDate },
      status: { $in: ["pending", "confirm"] },
    });

    if (existingBooking) {
      return next(
        new HttpError("Service Already booked for this time slot", 409),
      );
    }

    const newBooking = new Booking({
      userId,
      serviceId,
      bookingDate: new Date(bookingDate),
      timeSlot,
      note,
      totalPrice: service.price,
    });

    await newBooking.save();

    await newBooking.populate("serviceId");
    await newBooking.populate("userId");

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllBooking = async (req, res, next) => {
  try {
    let bookings;

    let role = req.user.role;

    if (role === "admin" || role === "super_admin") {
      bookings = await Booking.find({}).populate([
        { path: "serviceId", select: "name price description duration -_id" },
        { path: "userId", select: "name email phone -_id" },
      ]);
    } else if (role === "customer") {
      bookings = await Booking.find({ userId: req.user._id });
    } else {
      return next(new HttpError("UnAuthorized", 401));
    }

    if (bookings.length == 0) {
      res.status(200).json({ success: true, message: "No Booking Data Found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking Data founded SuccessFully...",
      bookings,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const getByServiceId = async (req, res, next) => {
  try {
    let bookings;

    let role = req.user.role;

    const serviceId = req.params.id;

    if (role === "admin" || role === "super_admin") {
      bookings = await Booking.find({ serviceId }).populate([
        { path: "serviceId", select: "name price description duration -_id" },
        { path: "userId", select: "name email phone" },
      ]);
    } else if (role === "customer") {
      bookings = await Booking.find({
        userId: req.user._id,
        serviceId: serviceId,
      }).populate("serviceId", "name price description duration -_id");
    }

    if (bookings.length == 0) {
      res.status(200).json({ success: true, message: "No Booking Data Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "All Services....!", bookings });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const getBookingById = async (req, res, next) => {
  try {
    let booking;
    let userId = req.user._id;
    let bookingId = req.params.id;

    let role = req.user.role;

    if (role === "admin" || role === "super_admin") {
      booking = await Booking.findById(bookingId).populate([
        { path: "serviceId", select: "name price duration" },
        {
          path: "userId",
          select: "name email phone",
        },
      ]);
    }

    booking = await Booking.findById(bookingId).populate(
      "serviceId",
      "name price duration",
    );

    if (
      role === "customer" &&
      booking.userId.toString() !== userId.toString()
    ) {
      return next(new HttpError("UnAuthorized Access", 403));
    }

    if (!booking) {
      return next(new HttpError("No Booking data found", 404));
    }

    res.status(200).json({ success: true, message: "Bookings..!", booking });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const bookingByUserId = async (req, res, next) => {
  try {
    let booking;

    let userId = req.params.id || req.params._id;

    booking = await Booking.find({ userId }).populate(
      "serviceId",
      "name price description duration -_id",
    );

    if (!booking) {
      return next(new HttpError("No Booking Data Found", 404));
    }

    res.status(200).json({ success: true, booking });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const availableTimeSlot = async (req, res, next) => {
  try {
    const { serviceId, bookingDate } = req.query;

    const service = await Service.findById(serviceId);

    if (!service) {
      return next(new HttpError("Service Not Found...!", 404));
    }

    const startOfDate = new Date(bookingDate);
    startOfDate.setHours(0, 0, 0, 0);

    const endOfDate = new Date(bookingDate);
    endOfDate.setHours(23, 59, 59, 999);

    const existingBookings = await Booking.find({
      serviceId,
      bookingDate: { $gte: startOfDate, $lt: endOfDate },
      status: { $in: ["pending", "confirm"] },
    });

    const bookedTimeSlots = existingBookings.map((b) => b.timeSlot);

    const allTimeSlots = [
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
    ];

    const availableTimeSlots = allTimeSlots.filter(
      (b) => !bookedTimeSlots.includes(b),
    );

    if (!availableTimeSlot.length) {
      return res.status(200).json({
        success: true,
        message: "No Available time Slots",
        availableTimeSlot: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Available time Slots fetched successfully",
      availableTimeSlot,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const confirmBooking = async (req, res, next) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return next(new HttpError("No Booking Data Founded..!", 404));
    }

    if (booking.status === "confirm") {
      return next(new HttpError("Booking Already Confirmed...!", 400));
    }

    if (booking.status === "cancel") {
      return next(new HttpError("Booking Already Canceled...!", 400));
    }

    if (booking.status === "pending") {
      booking.status = "confirm";
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return next(new HttpError("No Booking Data Founded..!", 404));
    }

    if (booking.status === "cancel") {
      return next(new HttpError("Booking Already Canceled...!", 400));
    }

    if (booking.status === "completed") {
      return next(
        new HttpError("Booing already completed you can't cancel it", 404),
      );
    }

    if (booking === "pending" || booking === "confirmed") {
      booking.status = "cancel";
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancel Successfully...!",
      booking,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const completeBooking = async (req, res, next) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return next(new HttpError("No Booking Data Founded..!", 404));
    }

    if (booking.status === "complete") {
      return next(new HttpError("Booking already Completed", 400));
    }

    if (booking.status === "cancel") {
      return next(
        new HttpError("Booking Already cancelled you can't complete it", 400),
      );
    }

    if (booking.status === "pending" || booking.status === "confirm") {
      booking.status = "complete";
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Completed Successfully...!",
      booking,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

export default {
  createBooking,
  getAllBooking,
  getByServiceId,
  getBookingById,
  bookingByUserId,
  availableTimeSlot,
  confirmBooking,
  cancelBooking,
  completeBooking,
};