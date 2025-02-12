import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";
import { upload } from "../middleware/multer.mid";
const userRouter = Router();

userRouter.route("/register").post(upload.fields([{"name" : "avatar", maxCount : 1}, {"name" : "coverimage", maxCount : 1}]) , registerUser)


export default userRouter