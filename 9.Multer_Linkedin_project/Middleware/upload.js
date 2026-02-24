import multer from "multer";
import HttpError from "./HttpError.js";

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  const allowedFiles = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/heic",
    "application/pdf",
    "video/mp4",
  ];

  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new HttpError("Unsupported file type", 400));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 },
});

export default upload;