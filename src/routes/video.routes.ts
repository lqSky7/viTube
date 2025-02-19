import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { upload } from "../middleware/multer.mid";
import { uploadVideo } from "../controllers/video.controller";
const vidRouter = Router();

vidRouter.route("/upload").post(verifyJWT,upload.single("video"),uploadVideo)

export default vidRouter