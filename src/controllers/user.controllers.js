import { User } from "../models/user.models";
import { errApi } from "../utils/errApi";
import { asyncHandler } from "../utils/asyncHandler";
import { uppToCloudinary } from "../utils/cloudinary";
import { apiResponse } from "../utils/responseApi";
import jwt from "jsonwebtoken";
import { options } from "../constants";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

const getCurrentUserDetails = asyncHandler(async (req,res) => {
  try {
    const user = await User.findById(req.user123._id).select("-refreshToken -password");
    
    return res.status(200).json(new apiResponse(200, user, "User details fetched successfully"));
  
  } catch (error) {
    throw new errApi(500, "Server side issue: Couldn't fetch user details");
  }});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // take refresh token from cookies
  // decode it and verifiy against ref token in db
  // if true assign gen + save new accesstoken in db
  // return that acc and current ref token back to user
  const incomingReftkn =
    req.body?.refreshToken ||
    req.cookies?.refreshToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!incomingReftkn) {
    throw new errApi(
      401,
      "User did not provide cookies(Reftoken) properly ❌",
      [],
      incomingReftkn
    );
  }

  try {
    const decodedReftoken = jwt.verify(
      incomingReftkn,
      process.env.REF_TOKEN_PRIV
    ); // this will throw error if incoming token is expired!

    const user = await User.findById(decodedReftoken?._id);

    if (user.refreshToken !== incomingReftkn) {
      throw new errApi(401, "Refresh token expired!");
    }

    const { acctkn, reftkn } = await genAcc_and_RefToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", acctkn, options)
      .cookie("refreshToken", reftkn, options)
      .json(
        new apiResponse(
          200,
          { acctkn, reftkn },
          true,
          "Here's ur new ref/acc tokens!"
        )
      );
  } catch (err) {
    throw new errApi(500, "server issue: could not update refresh token 🥺");
  }
});

const genAcc_and_RefToken = async (userID) => {
  try {
    const user = await User.findById(userID);
    const acctkn = user.genAccessToken();
    const reftkn = user.genRefreshToken();

    user.refreshToken = reftkn;
    await user.save({ validateBeforeSave: false }); // we are saving only ref token in user model, but since model has requried fields like pass and username, it wont allow us to save just ref token. this validate before save = false flag.

    return { acctkn, reftkn };
  } catch (error) {
    log(error);
    throw new errApi(500, "server issue: could not generate ref/acc tokens 😭");
  }
};

const logoutUser = asyncHandler(async (req, res) => {
  // middleware will verify if user is logged in
  // nuke ref token from db
  // delete all cookies

  await User.findByIdAndUpdate(
    req.user123._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "user logged out.... 😶"));
});

const loginUser = asyncHandler(async (req, res) => {
  // take email + username
  // check if user gave wrong
  // take passsword
  // find the user
  // check pass
  // assign refresh and access token
  // send secure cookie back to the user

  const { username, email, password } = req.body;
  if (!(username || email)) {
    throw new errApi(400, "email/username not provided by the frontend");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }], //find either username or email
  });

  if (!user) {
    throw new errApi(404, "User doesn't exist on db");
  }

  const passreturn = await user.isPassCrct(password);
  if (!passreturn) {
    throw new errApi(401, "Wrong password!");
  }

  const { acctkn, reftkn } = await genAcc_and_RefToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", acctkn, options)
    .cookie("refreshToken", reftkn, options)
    .json(
      new apiResponse(
        200,
        { user: loggedInUser, reftkn, acctkn },
        "User logged in successfully"
      )
    );
});

const registerUser = asyncHandler(async (req, res) => {
  // take post request from user
  // check if user already exist: email indexing
  // if yes, take avatar image input. get it through middleware and push it to cloudinary
  // if success, cloudinary will return image url string
  // create user model from the schema, put all details, push it to DB
  // DB returns all data when successfully pushed
  // remove password and JWT token from the returned data, give it back to frontend.
  const { fullname, email, password, username } = req.body;
  if (fullname == "") {
    throw new errApi(400, "Full name is required");
  }
  if (email == "" || !email.includes("@")) {
    throw new errApi(400, "Email is required");
  }
  if (password == "") {
    throw new errApi(400, "Password is required");
  }
  if (username == "") {
    throw errApi(400, "Username is required");
  }
  const Userexists = await User.findOne({ username });
  const mailexists = await User.findOne({ email });
  if (Userexists || mailexists) {
    throw new errApi(409, "User/Mail Already Exist!");
  }

  if (req.files?.avatar == undefined) {
    throw new errApi(400, "Avatar Image is required");
  }
  const avatarLocalpath = req.files.avatar[0].path;
  const coverLocalpath = req.files?.coverimage?.[0]?.path; // question mark so that it doesnt throw error if path doesnt exist.

  if (!avatarLocalpath) {
    throw new errApi(
      409,
      "Avatar Image not found on local sever: multer issue or user did not upload properly"
    );
  }
  const avt = await uppToCloudinary(avatarLocalpath);
  const coverImg = await uppToCloudinary(coverLocalpath);

  if (!avt) {
    throw new errApi(
      500,
      "Server side issue: Avatar Image not uploaded to cloudinary"
    );
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username,
    avatar: avt || "",
    coverimage: coverImg?.url || "",
  });
  let createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  ); //in select syntax, everything is selected by default, we just removed those 2. and createdUser jab aayega usme in dono ke alawa saare fields select hokr aayenge
  if (!createdUser) {
    throw new errApi(500, "Server side issue: Couldn't register user");
  }

  // Updated response construction with proper apiResponse usage:
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User reg successful"));
});

const updatePassword = asyncHandler(async (req, res) => {
  // we'll be using auth middleware here, so req.user123 is our user extracted from cookies by that middleware.
  const { newPass, oldPass } = req.body;
  // match old pass against user
  // if correct hash and update

  const user = await User.findById(req.user123._id);

  const passreturn = await user.isPassCrct(oldPass);
  if (!passreturn) {
    throw new errApi(401, "Wrong password!");
  }
  user.password = newPass; // pre hook in  model will automatically hash it!
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, true, "Password updated Successfully!"));
});

export {
  registerUser,
  logoutUser,
  loginUser,
  refreshAccessToken,
  updatePassword,
  getCurrentUserDetails
};
