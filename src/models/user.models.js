import mongoose, { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// note 1: _id is a unique id added to every schema automatically by mongodb.
const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    email: {required: true,
        unique: true,
        index: true,
        trim: true,
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: false,
        trim: true,
    },
    avatar: {
        type: String, //url
    },

    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: "Videos",
    },
    password: {
        type: String, 
        required: [true, "password is a required field..."]
    }, 
    refreshToken:{
        type: String,
    }
    
}, {
    timestamps: true // automatically generates updatedAt and createdAt stamps.
})


// UserSchema.plugin(mongooseAggregatePaginate)
export const User = mongoose.model("User", UserSchema)