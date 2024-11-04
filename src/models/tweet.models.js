import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommunityPost = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    content:{
        type: String,
        required: true,
        trim: true,
    },
},{
    timestamps: true,
})

CommunityPost.plugin(mongooseAggregatePaginate)
export  const Tweet = mongoose.model("Tweet", CommunityPost)