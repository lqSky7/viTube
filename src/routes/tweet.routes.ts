import { Router } from "express";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const tweetRouter = Router();

tweetRouter.route("/get/:username").get(getUserTweets);
// (Secured Routes 🔐)
tweetRouter.route("/create").post(verifyJWT, createTweet);
tweetRouter.route("/update").post(verifyJWT, updateTweet);
tweetRouter.route("/delete").delete(verifyJWT, deleteTweet);
export default tweetRouter;