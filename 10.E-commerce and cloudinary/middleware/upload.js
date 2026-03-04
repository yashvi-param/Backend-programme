
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "e-commerce-products",
        // format: "webp",
        allowed_formats: ["pdf", "jpg", "jpeg"],
        transformation: [
            { width: 500, height: 500, crop: "limit" }
        ]


    }
})

export default storage
