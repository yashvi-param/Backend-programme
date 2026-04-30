import Provider from "../model/provider.js";
import HttpError from "../middleware/HttpError.js";
import User from "../model/UserModel.js";
import Service from "../model/service.js";

import services from "../services/emailTemplet.js";
import Booking from "../model/Booking.js";

const registerAsProvider = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return next(new HttpError("User not Found", 404));
    }

    const existingProvider = await Provider.findOne({ userId });

    if (existingProvider) {
      user.role = "provider";
      await user.save();

      return next(
        new HttpError("Already provider Registered with this id", 500),
      );
    }

    const { services, experience, documents } = req.body;

    if (!services || !Array.isArray(services) || services.length === 0) {
      return next(new HttpError("Services is Required", 500));
    }

    const validService = await Service.find({
      _id: { $in: services },
    }).select("_id");

    if (validService.length !== services.length) {
      return next(new HttpError("Service are missing"));
    }

    const newProvider = new Provider({
      userId,
      services: validService,
      experience,
      documents,
    });

    user.role = "provider";

    await newProvider.save();

    await user.save();

    res.status(201).json({
      success: true,
      message: "Provider Account registered wait for Admin approval",
      newProvider,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const getProvider = async (req, res, next) => {
  try {
    let { isValid } = req.query;

    let query = {};

    if (!isValid) {
      query.isValid = isValid === "true";
    }

    const providers = await Provider.find(query).populate([
      { path: "userId", select: "name email password" },
      { path: "services", select: "name" },
    ]);

    if (!providers.length) {
      return next(new HttpError("No Provider Data Found..", 404));
    }

    res.status(200).json({
      success: true,
      message: "Provider Details fetch SuccessFully..!",
      length: providers.length,
      providers,
    });
  } catch (error) {
    next(new HttpError(error.message));
  }
};

const getProviderBooking = async (req, res, next) => {
  try {
    const userId = req.params.id || req.User._id;

    const user = await Provider.findById(userId);

    if (!user) {
      return next(new HttpError("User not Founded..!"));
    }

    const bookings = await Booking.find({ ProviderId: User._id });

    if (!bookings || bookings.length === 0) {
      return next(new HttpError("No Booking Data Founded...!"));
    }

    if (bookings[0].ProviderId.toString() !== req.User._id) {
      return next(
        new HttpError("You are not allowed to see this Booking", 400),
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Booking fetched Successfully..!" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
export default { registerAsProvider, getProvider, getProviderBooking };