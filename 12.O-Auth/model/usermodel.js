import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: (value) => {
        if (!value.endswith("@gmail.com")) {
            throw new Error("Email must be gmail");
        }
        }
    },
    googleId: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);

export default User;