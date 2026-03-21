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
            throw new Error("invalid email");
        }
        }
    },
    googleId: {
        type: String,
    },
});

const User = mongoose.model("UserModel", userSchema);

export default User;