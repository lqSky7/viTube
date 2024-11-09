import { error } from "console";
import connectDB from "./db/connect";
import dotenv from 'dotenv';
dotenv.config({path: "./env"});
import { app } from "./app";
import cors from "cors";

app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))

connectDB().then(() => {app.listen(process.env.port || 3001, () => {console.log("mongoconnect.then -> server is listening");
})}).catch(error => {console.log("atlas connect catch error: ",error);
})