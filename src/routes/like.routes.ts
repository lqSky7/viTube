import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller";

const likeRouter = Router();

// (Secured Routes 🔐)
likeRouter.route("/video/:videoId").post(verifyJWT, toggleVideoLike)
likeRouter.route("/comment/:commentId").post(verifyJWT, toggleCommentLike)
likeRouter.route("/tweet/:tweetId").post(verifyJWT, toggleTweetLike)
likeRouter.route("/get/liked/video/:videoId").get(verifyJWT, getLikedVideos)

export default likeRouter