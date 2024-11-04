import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// Prehook means performing action on data before saving to db. never use arrow functions here.
UserSchema.pre(password, async function(next){
    if(!this.modified("password")){return next()} // exit when password is not changed. 
    this.password = bcrypt.hash(this.password, 10);
    next() // Always pass next parameter to function and write this to pass request to the next middleware. basic snippet for prehook.
})


// prototype
UserSchema.methods.isCorrect = async function(newPassSentByUser){
    return await bcrypt.compare(newPassSentByUser, this.password);
    // we always wait since this can take some time.
}


// UserSchema.plugin(mongooseAggregatePaginate)
export const User = mongoose.model("User", UserSchema)