import mongoose, {Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

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
// subUserSchema.plugin(mongooseAggregatePaginate)
export const Subscription = mongoose.model("Subscription", subUserSchema)
