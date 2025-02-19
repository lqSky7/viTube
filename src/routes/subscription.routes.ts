import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { toggleSubscription } from "../controllers/subscription.controller"; 
const subRouter = Router();

// (Secured Routes 🔐)
subRouter.route("/").post(verifyJWT, toggleSubscription)
export default subRouter
