// Models

// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.

// const schema = new mongoose.Schema({ name: String, size: String });
// const Tank = mongoose.model('Tank', schema);
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: "./env"});

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    fullname:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    avatar:{
        type: String, // storing as a url
        required: false,
    },
    coverimage:{
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type: String,
        required: [true,'Password is req. bro'],
    },
    refreshToken:{
        type: String
    }

},{timestamps: true})

// idhar arrow function nhi lgta since it doesnt have access of userSchema by design
// data save krwane se pehle change karo, others like update, validate, delete etc. also available. do something to data before these actions.
userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 2);
    }
    next();
}) 

userSchema.methods.isPassCrct = async function (password) {
    return await bcrypt.compare(password, this.password);
}
    
userSchema.methods.genAccessToken = function() {
    return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username
    }, process.env.ACCESS_TOKEN_PRIV, {expiresIn: process.env.ACCESS_TOKEN_EXP});
  }
  
userSchema.methods.genRefreshToken = function() {
    return jwt.sign({
      _id: this._id,
    }, process.env.REF_TOKEN_PRIV, {expiresIn: process.env.REF_TOKEN_EXP});
  }

export const User = mongoose.model("User", userSchema);