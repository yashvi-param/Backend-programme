import User from "../model/User.js";
import Bookings from "../model/Booking.js";
import Provider from "../model/Provider.js";
import Service from "../model/Services.js";

import HttpError from "../middleware/HttpError.js";

const dashBoardStatics = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalCustomer = await User.countDocuments({ role: "customer" });

    const totalProvider = await User.countDocuments({ role: "provider" });

    const totalIsApprovedProvider = await Provider.countDocuments({
      isVerified: true,
    });

    const totalIsRejectedProvider = await Provider.countDocuments({
      isVerified: false,
    });

    const totalBookings = await Bookings.countDocuments();
    const pendingBookings = await Bookings.countDocuments({
      status: "pending",
    });

    const completedBookings = await Bookings.countDocuments({
      status: "completed",
    });

    const cancelledBookings = await Bookings.countDocuments({
      status: "cancelled",
    });

    const confirmBookings = await Bookings.countDocuments({
      status: "confirmed",
    });

    const totalServices = await Service.countDocuments();

    const totalActiveServices = await Service.countDocuments({
      isActive: true,
    });

    const totalDeActiveServices = await Service.countDocuments({
      isActive: false,
    });

    const totalRevenue = await Bookings.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalBookingsAggregate = await Bookings.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "dashboard statics fetched successfully",
      totalUsers,
      totalCustomer,
      totalProvider,
      totalIsApprovedProvider,
      totalIsRejectedProvider,
      totalBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
      confirmBookings,
      totalServices,
      totalActiveServices,
      totalDeActiveServices,
      totalRevenue: totalRevenue[0]?.totalRevenue || 0,
      totalBookingsAggregate,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { dashBoardStatics };