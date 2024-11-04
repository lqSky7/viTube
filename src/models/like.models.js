import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
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

    User: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true,
}) 

likeschema.plugin(mongooseAggregatePaginate)
export const Like = mongoose.model("Like", likeschema)