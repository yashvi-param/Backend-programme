import mongoose from "mongoose";
// const StudentModel = mongoose.model("Students", {
//   firstName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//   },
//   phoneNumber: {
//     type: Number,
//     required: true,
//     trim: true,
//     min: 10,
//   },
//   course: {
//     type: String,
//     required: true,
//     enum: ["Fullstack Development", "Graphic Design", "Video Editing", "Ui/UX"],
//   },

//   isActive: {
//     default: "Active",
//     enum: ["pending", "terminate", "active", "suspend"],
//   },
//  });

//  export default StudentModel;

// using another method with explicit schema define

// statics

// methods

// studentSchema.pre()

// studentSchema.post()

const studentSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
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
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      min: 10,
    },
    course: {
      type: String,
      required: true,
      enum: [
        "Fullstack Development",
        "Graphic Design",
        "Video Editing",
        "Ui/UX",
      ],
    },

    isActive: {
      enum: ["pending", "terminate", "active", "suspend"],
    },
  },
  {
    timestamps: true,
  },
);

const StudentModel = mongoose.model("Students", studentSchema);

export default StudentModel;