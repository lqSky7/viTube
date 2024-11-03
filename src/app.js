import express from "express";
const app = express();
import cors from "cors"; // Its purpose is to decide who should be able to access backend, for example it can be made such that only some particular frontend is able to hit endpoints. 

// import healthcheck routes
import healthCheckRouter from "./routes/healthcheck.routes.js";



// only allow urls mentioned in .env to hit server
app.use(
    cors({
        origin: process.env.CORSVAR,
        credentials: true
    })
)
// common middleware: intercepts requests before they hit server.
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

// implement healthcheck
app.use("/api/v1/healthcheck", healthCheckRouter)


export {app};