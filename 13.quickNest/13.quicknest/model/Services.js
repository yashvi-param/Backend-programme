import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Service = mongoose.model("Services", serviceSchema);

export default Service;
