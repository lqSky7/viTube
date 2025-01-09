// Models

// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

// When you call mongoose.model() on a schema, Mongoose compiles a model for you.

// const schema = new mongoose.Schema({ name: String, size: String });
// const Tank = mongoose.model('Tank', schema);
// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Tank is for the tanks collection in the database.

import mongoose, { Schema, SchemaType } from 'mongoose';
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
    avtar:{
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
        required: [true,'Password is req. bro'],
    },
    refreshToken:{
        type: String
    }

},{timestamps: true})

export const User = mongoose.model("User", userSchema);