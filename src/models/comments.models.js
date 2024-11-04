import mongoose, {Schema} from "mongoose";

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

export const Comments = mongoose.model("Comments", CommentsSchema)