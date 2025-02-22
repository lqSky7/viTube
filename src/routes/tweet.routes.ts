import { Router } from "express";
import { createTweet } from "../controllers/tweet.controller";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const tweetRouter = Router();

// (Secured Routes 🔐)
tweetRouter.route("/create").post(verifyJWT, createTweet);


export default tweetRouter;