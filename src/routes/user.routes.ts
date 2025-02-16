import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controllers";
import { upload } from "../middleware/multer.mid";
import { verifyJWT } from "../middleware/auth.mid";
const userRouter = Router();

userRouter.route("/register").post(upload.fields([{"name" : "avatar", maxCount : 1}, {"name" : "coverimage", maxCount : 1}]) , registerUser)
userRouter.route("/refreshCookie").post(refreshAccessToken)
userRouter.route("/login").post(loginUser)

// secured routes (only when user logged in):
userRouter.route("/logout").post(verifyJWT, logoutUser)
export default userRouter