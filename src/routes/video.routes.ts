import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { upload } from "../middleware/multer.mid";
import { deleteVideo, getVideoById, uploadVideo } from "../controllers/video.controller";
const vidRouter = Router();


vidRouter.route("/get/:videoId").get(getVideoById)
// (Secured Routes 🔐)
vidRouter.route("/upload").post(verifyJWT,upload.single("video"),uploadVideo)
vidRouter.route("/delete").post(verifyJWT, deleteVideo)


export default vidRouter