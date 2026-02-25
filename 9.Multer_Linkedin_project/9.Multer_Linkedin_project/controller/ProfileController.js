import fs from "fs";

import Profile from "../model/ProfileModel.js";
import HttpError from "../Middleware/HttpError.js";

// Create Profile
const createProfile = async (req, res, next) => {
  try {

    const { fullName, bio, headline } = req.body;

    const profileImage = req.files?.profileImage?.[0]?.path;
    const resume = req.files?.resume?.[0]?.path;
    const introVideo = req.files?.introVideo?.[0]?.path;
    const projectImages =
      req.files?.projectImages?.map((file) => file.path) || [];

    const newProfile = new Profile({
      fullName,
      bio,
      headline,
      profileImage,
      resume,
      introVideo,
      projectImages,
    });

    await newProfile.save();

    res.status(201).json({
      message: "Profile created successfully",
      data: newProfile,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get All Profiles
const getAllProfiles = async (req, res, next) => {
  try {

    const profileList = await Profile.find({});

    if (!profileList.length) {
      return next(new HttpError("No profile data found", 404));
    }

    res.status(200).json({
      message: "Profile data received successfully",
      profileList,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get Profile By ID
const getProfileById = async (req, res, next) => {
  try {

    const id = req.params.id;

    const profile = await Profile.findById(id);

    if (!profile) {
      return next(new HttpError("Profile not found with this id", 404));
    }

    res.status(200).json({
      message: "Profile found",
      profile,
    });
  } catch (error) {
    next(new HttpError("Invalid profile id", 400));
  }
};


export default {createProfile,getAllProfiles,getProfileById,deleteProfile};