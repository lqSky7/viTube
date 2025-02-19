import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller"; 
const subRouter = Router();

// (Secured Routes 🔐)
subRouter.route("/").post(verifyJWT, toggleSubscription)
subRouter.route("/getsub/:channel").get(getUserChannelSubscribers)
export default subRouter
