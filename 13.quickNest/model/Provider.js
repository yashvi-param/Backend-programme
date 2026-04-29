import mongoose from "mongoose";



const ProviderSchema = new mongoose.Schema({

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    providerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Provider",
        required: true,

    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Services",
            required: true,
        }
    ],
    experience: {

        type: Number,
        default: 0

    },
    documents: [
        {
            type: String,
        }
    ],

    isVerified: {
        type: Boolean,
        default: false,
    }
})

const Provider = mongoose.model("Provider", ProviderSchema)


export default Provider;