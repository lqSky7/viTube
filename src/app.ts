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

export { app };