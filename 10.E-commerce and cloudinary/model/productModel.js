
import mongoose from "mongoose"


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String
    },
    cloudinary_id: {
       type:String,
       required:true,
    },

})

const Product = mongoose.model("product", productSchema)

export default Product;
