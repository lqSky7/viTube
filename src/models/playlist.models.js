import mongoose, {Schema} from "mongoose";

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

export const PlayList = mongoose.model("Playlist",PlayListSchema)