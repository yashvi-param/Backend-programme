import Provider from "../models/Provider.js";
import Service from "../models/Service.js";
import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";


const registerAsProvider = async (req, res, next) => {
  try {

    const userId = req.user._id;

    const { document, experience, services } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }

    const existingProvider = await Provider.findOne({ userId });
    if (existingProvider) {
      return next(
        new HttpError("You are already registered as a provider", 400)
      );
    }

    
    if (!services || !Array.isArray(services) || services.length === 0) {
      return next(new HttpError("At least one service is required", 400));
    }

    const validServices = await Service.find({
      _id: { $in: services },
    });

    if (validServices.length !== services.length) {
      return next(new HttpError("Invalid service IDs", 400));
    }

    
    const newProvider = new Provider({
      userId,
      document,
      experience,
      services,
    });

    await newProvider.save();

    res.status(201).json({
      success: true,
      message:
        "Registered as provider successfully. Wait for admin verification",
      provider: newProvider,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { registerAsProvider };