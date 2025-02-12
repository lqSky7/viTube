import { User } from "../models/user.models";
import { errApi } from "../utils/errApi";
import { log } from "node:console";
import { asyncHandler } from "../utils/asyncHandler";
import { uppToCloudinary } from "../utils/cloudinary";
import { apiResponse } from "../utils/responseApi";
// take post request from user
// check if user already exist: email indexing
// if yes, take avatar image input. get it through middleware and push it to cloudinary
// if success, cloudinary will return image url string
// create user model from the schema, put all details, push it to DB
// DB returns all data when successfully pushed
// remove password and JWT token from the returned data, give it back to frontend. 

const registerUser = asyncHandler(async(req,res) => {
    const {Fullname, email, password, username} = req.body;
    if(Fullname == ""){
        throw new errApi(400, "Full name is required");
    }
    if(email == "" || !email.includes("@")){
        throw new errApi(400, "Email is required");
    }
    if(password == ""){
        throw new errApi(400, "Password is required");
    }
    if(username == ""){
        throw errApi(400, "Username is required");
    }
    const Userexists = await User.findOne({username});
    const mailexists = await User.findOne({email});
    if(Userexists || mailexists){
        throw new errApi(409, "User/Mail Already Exist!")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverLocalpath = req.files?.coverimage[0]?.path; // question mark so that it doesnt throw error if path doesnt exist. 

    if(!avatarLocalpath){
        throw new errApi(409,"Avatar Image not found on local sever: multer issue or user did not upload properly");
    }
    const avt = await uppToCloudinary(avatarLocalpath);
    const coverImg = await uppToCloudinary(coverLocalpath);

    if(!avt){
        throw new errApi(500,"Server side issue: Avatar Image not uploaded to cloudinary");
    }

    const user = await User.create(
        {
            Fullname,
            email,
            password,
            username,
            avatar: avt.url,
            coverimage: coverImg?.url || ""
        })
    createdUser = await User.findById(user._id).select("-password -refreshToken") //in select syntax, everything is selected by default, we just removed those 2. and createdUser jab aayega usme in dono ke alawa saare fields select hokr aayenge
    if(!createdUser){
        throw new errApi(500, "Server side issue: Couldn't register user")
    }

    return res.status(201).json(new apiResponse(200), createdUser, "User reg successful")
});

export { registerUser }