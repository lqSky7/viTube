import mongoose from "mongoose";



const videoschema = new mongoose.Schema({
    videoFile:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    duration:{
        type: Number, //we fetch time from where we're uploading our video
        required: true
    },
    views:{
        type: Number,
        default: 0
    },
    isPublished:{
        type: Boolean,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{timestamps:true})

export const Video = mongoose.model("Video", videoschema);