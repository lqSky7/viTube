import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

const healthCheckRouter = Router();

healthCheckRouter.route("/").get(healthCheck); // basically "/" here is added after what we've hit /api/v1/healthcheck

// u can chain methods like put post etc. inside one .route() instance
// healthCheckRouter.route("/test") this would mean we have to hit api/vi/healthCheck/test


export default healthCheckRouter;