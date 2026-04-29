import User from "../model/User.js";
import HttpError from "../middleware/HttpError.js";
import Service from "../model/Services.js";
import Provider from "../model/Provider.js";

const registerProvider = async (req, res, next) => {
    try {
        const id = req.params._id;

        const user = await User.findById(userId)

        if (!user) {
            return next(new HttpError("user not found", 404))
        }

        const existingProvider = await Provider.findById(userId)

        if (existingProvider) {
            return next(new HttpError("already provider register with this is", 500))
        }

        const { Service, experience, documents } = req.body

        if (!services || !Array.isArray(services) || service.length === 0) {
            return next(new HttpError("service is required", 500))
        }

        const validService = await services({
            _id: { $in: services }
        }).select("_id")

        if (validService.length !== services.length) {
            return next(new HttpError("service are missing"))
        }


        const newProvider = new Provider({
            userId,
            services: validService,
            experience,
            documents
        })

        user.role = "provider"

        await new Provider.save();

        res.statu(201).json({ success: true, message: " provider account  registered  wait for admin approval", newProvider })

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}


const getProvider = async (req, res, next) => {

    try {

        let query = {};

        let { isVerified } = req.query;


        if (isVerified) {
            query.isVerified = isVerified === "true";
        }

        const provider = await Provider.find(query).populate([{ path: "userId", select: "name email phone" }, { path: "services", select: "name" }])

        if (!provider.length) {
            return next(new HttpError("no provider data found", 404))
        }

        res.status(200).json({ success: true, message: "provider details fetched successfully", length: providers.length, providers })
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}


const updateProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = req.user.role;
        const loginUserId = req.user._id;

        const provider = await Provider.findById(id);
        if (!provider) {
            return next(new HttpError("Provider not found", 404));
        }



        if (
            role !== "admin" &&
            role !== "super_admin" &&
            provider.userId.toString() !== loginUserId.toString()
        ) {
            return next(new HttpError("Unauthorized access", 403));
        }

        const updates = Object.keys(req.body);
        let allowedFields = ["service", "experience", "documents"];


        if (role === "admin" || role === "super_admin") {
            allowedFields.push("isVerified");
        }

        const isValid = updates.every((field) => allowedFields.includes(field));
        if (!isValid) {
            return next(new HttpError("Only allowed fields can be updated", 400));
        }


        if (req.body.service) {
            if (!Array.isArray(req.body.service) || req.body.service.length === 0) {
                return next(new HttpError("Service must be a non-empty array", 400));
            }
            const validServices = await Service.find({ _id: { $in: req.body.service } }).select("_id");
            if (validServices.length !== req.body.service.length) {
                return next(new HttpError("One or more services are invalid", 400));
            }
            provider.service = validServices.map((s) => s._id);
            updates.splice(updates.indexOf("service"), 1); // already handled
        }

        updates.forEach((field) => {
            if (field !== "service") provider[field] = req.body[field];
        });

        await provider.save();
        await provider.populate("userId", "name email phone role");
        await provider.populate("service", "name price duration");

        res.status(200).json({ success: true, message: "Provider updated successfully", provider });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

const deleteProvider = async (req, res, next) => {
    try {
        const { id } = req.params;
        const role = req.user.role;
        const loginUserId = req.user._id;

        const provider = await Provider.findById(id)

        if (!provider) {
            return next(new HttpError("Provider not found", 404))
        }

        if (
            role !== "admin" &&
            role !== "super_admin" &&
            provider.userId.toString() !== loginUserId.toString()
        ) {
            return next(new HttpError("Unauthorized access", 403))
        }

        await User.findByIdAndUpdate(provider.userId, { role: "customer" })

        await Provider.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Provider deleted successfully"
        })
    } catch (error) {
        next(new HttpError(error.message))
    }
}

const getProviderBooking = async (req, res, next) => {
    try {
        const userId = req.params.id || req.user._id;

        const user = await Provider.findById(userId)

        if (!user) {
            return next(new HttpError("user not found", 404))
        }

        const bookings = await Booking.find({ providerId: user.id })

        if (!bookings || bookings.length === 0) {
            return next("no booking data found", 404)
        }


        if (bookings[0].providerId.toString() !== req, user._id) {
            return next(
                new HttpError("you are not allowed to see this bookings", 400)
            )
        }

        res.status(200).json({
            success: true,
            message: "booking fetched successfully",
            bookings,
        })
    }catch(error){
        next(new HttpError(error.message, 500))
    }
}


export default { registerProvider, getProvider, updateProvider, deleteProvider, getProviderBooking }