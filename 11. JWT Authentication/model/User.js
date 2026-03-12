
import mongoose from "mongoose";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { use } from "react";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Email must be gmail");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate: (value) => {
      if (!value.toLowerCase() === "password") {
        throw new Error("password can't contain password word as a password");
      }
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

userSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) {
      throw new Error("Unable To Login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable To Login");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
    );

    if (!token) {
      throw new Error("failed to generate auth token");
    }

    user.tokens = user.tokens.concat({ token });

    await user.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", userSchema);

export default User;
