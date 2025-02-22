import { Router } from "express";
import { createcomment , updatecomment, deletecomment, getVideocomments} from "../controllers/comment.controller";
import { upload } from '../middleware/multer.mid';
import { verifyJWT } from "../middleware/auth.mid";
const commentRouter = Router();

commentRouter.route("/get/:video").get(getVideocomments);
// (Secured Routes 🔐)
commentRouter.route("/create").post(verifyJWT, createcomment);
commentRouter.route("/update").post(verifyJWT, updatecomment);
commentRouter.route("/delete").delete(verifyJWT, deletecomment);
export default commentRouter;