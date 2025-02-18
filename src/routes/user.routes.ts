import { Router } from "express";
import { getCurrentUserDetails, getUserChannelProfile, getWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updatePassword, updateUserAvatar, updateUserDetails } from "../controllers/user.controllers";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const userRouter = Router();

userRouter.route("/register").post(upload.fields([{"name" : "avatar", maxCount : 1}, {"name" : "coverimage", maxCount : 1}]) , registerUser)
userRouter.route("/refreshCookie").post(refreshAccessToken)
userRouter.route("/login").post(loginUser)

// (Secured Routes 🔐)
userRouter.route("/get/:username").get(verifyJWT,getUserChannelProfile)
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/update/password").post(verifyJWT, updatePassword)
userRouter.route("/update/data").post(verifyJWT, updateUserDetails)
userRouter.route("/me").get(verifyJWT, getCurrentUserDetails)
userRouter.route("/update/avatar").post(upload.fields([{"name": "avatar", maxCount: 1}]), verifyJWT, updateUserAvatar)
userRouter.route("/history/:username/").get(verifyJWT, getWatchHistory)

export default userRouter