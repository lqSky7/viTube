import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema({
    thumbnail:{
        type: String, // link
        required: false
    },
    videoFile: {
        type: String, // link
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: false,
        trim: true
    },
    views: {
        type: Number,
        default: 0,
    },
    description: {
        type: Boolean,
        default: true,
    },

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps:true
})

export const Videos = mongoose.model("Videos", VideoSchema)