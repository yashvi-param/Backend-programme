import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "provider", "admin", "super-admin"],
      default: "customer",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    
    tokens:[
      {
        token:{
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);


// Hash Password
UserSchema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
   user.password = await bcrypt.hash(user.password, 8);
  }
});


// Login Logic
UserSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Generate Token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    user.tokens = user.tokens.concat({ token });

    await user.save();
    
    return token; 
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = mongoose.model("User", UserSchema);

export default User;