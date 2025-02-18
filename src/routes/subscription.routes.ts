import { Router } from "express";
import { verifyJWT } from "../middleware/auth.mid";
import { createSubscription } from "../controllers/user.controllers"; 
const subRouter = Router();

// (Secured Routes 🔐)
subRouter.route("/").post(verifyJWT, createSubscription)
export default subRouter
