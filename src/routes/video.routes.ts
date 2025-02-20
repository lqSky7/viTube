import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { upload } from "../middleware/multer.mid";
import { deleteVideo, uploadVideo } from "../controllers/video.controller";
const vidRouter = Router();

// (Secured Routes 🔐)
vidRouter.route("/upload").post(verifyJWT,upload.single("video"),uploadVideo)
vidRouter.route("/delete").post(verifyJWT, deleteVideo)

export default vidRouter