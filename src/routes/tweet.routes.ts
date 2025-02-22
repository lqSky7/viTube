import { Router } from "express";
import { createTweet, getUserTweets } from "../controllers/tweet.controller";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const tweetRouter = Router();

tweetRouter.route("/get/:username").get(getUserTweets);
// (Secured Routes 🔐)
tweetRouter.route("/create").post(verifyJWT, createTweet);

export default tweetRouter;