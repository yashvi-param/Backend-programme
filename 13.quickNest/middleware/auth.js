
import jwt from "jsonwebtoken";

import HttpError from "./HttpError.js";
import User from "../models/User.js";

const auth = async function (req, res, next) {
    try{
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return next(new HttpError("Auth header is required",400));
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user){
            return next(new HttpError("Authentication failed",401));
        }

        req.user = user;

        req.token = token;

        next();
    }catch(error){
     next(new HttpError("Please authenticate", 401));
    }
};

export default auth;
