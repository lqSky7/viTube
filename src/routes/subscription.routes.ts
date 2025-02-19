import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller"; 
const subRouter = Router();

// (Open routes 🔓)
subRouter.route("/getsub/:channel").get(getUserChannelSubscribers)

// (Secured Routes 🔐)
subRouter.route("/").post(verifyJWT, toggleSubscription)
subRouter.route("/MySubscriptions").get(verifyJWT, getSubscribedChannels)
export default subRouter
