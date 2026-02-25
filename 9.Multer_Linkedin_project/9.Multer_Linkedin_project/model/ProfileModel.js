import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  bio: String,
  headline: String,
  profileImage: String,
  resume: String,
  introVideo: String,
  projectImages: [String],
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;