import mongoose, { mongo, Schema } from "mongoose";

const likeschema = new Schema({
    video:{
        type: mongoose.Types.ObjectId,
        ref: "Videos"
    },
    Comment:{
        type: mongoose.Types.ObjectId,
        ref: "Comments"
    },
    Tweet:{
        type: mongoose.Types.ObjectId,
        ref: "Tweet"
    },
}) 


export const Like = mongoose.model("Like", likeschema)