import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const PlayListSchema = new Schema({
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videosinIt:{
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "Videos"
            }
        ]
    }
},{
    timestamps: true
})

PlayListSchema.plugin(mongooseAggregatePaginate)
export const PlayList = mongoose.model("Playlist",PlayListSchema)