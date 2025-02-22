import express from "express";
const app = express();
import cors from "cors";
import cookieparser from "cookie-parser";

//middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json({limit: "16kb"})) // server accept json files
app.use(express.static("public")) // store temp files in public dir
app.use(express.urlencoded({ extended: true, limit: "16kb" })) // server can read from url, extened means objects within objects in url
app.use(cookieparser()) // get cookies from browser into a more readble format

// we import routers here... 
import userRouter from "./routes/user.routes";
import  subRouter  from "./routes/subscription.routes";
import vidRouter  from "./routes/video.routes";
import tweetRouter from "./routes/tweet.routes";


app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscribe", subRouter);
app.use("/api/v1/video", vidRouter)
app.use("/api/v1/tweet", tweetRouter)



export { app };