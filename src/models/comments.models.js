import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const CommentsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true,
        trim: true
    } 
},{
    timestamps: true,
})
CommentsSchema.plugin(mongooseAggregatePaginate)
export const Comments = mongoose.model("Comments", CommentsSchema)