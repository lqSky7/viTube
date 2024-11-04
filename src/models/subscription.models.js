import mongoose, {Schema} from "mongoose";

const subUserSchema = new Schema({
    subscriber: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    Channel: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subUserSchema)
 