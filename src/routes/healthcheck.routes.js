import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller";

const Router = Router();

router.route("/")
.get(healthCheck);
// u can chain methods like put post etc. inside one .route() instance

export default Router;