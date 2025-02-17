import { Router } from "express";
import { getCurrentUserDetails, loginUser, logoutUser, refreshAccessToken, registerUser, updatePassword, updateUserAvatar, updateUserDetails } from "../controllers/user.controllers";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const userRouter = Router();

userRouter.route("/register").post(upload.fields([{"name" : "avatar", maxCount : 1}, {"name" : "coverimage", maxCount : 1}]) , registerUser)
userRouter.route("/refreshCookie").post(refreshAccessToken)
userRouter.route("/login").post(loginUser)

// secured routes (only when user logged in):
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route("/update/password").post(verifyJWT, updatePassword)
userRouter.route("/update/data").post(verifyJWT, updateUserDetails)
userRouter.route("/getme").get(verifyJWT, getCurrentUserDetails)
userRouter.route("/update/avatar").post(upload.fields([{"name": "avatar", maxCount: 1}]), verifyJWT, updateUserAvatar)

export default userRouter