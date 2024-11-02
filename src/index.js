import {app} from "./app.js";
import dotenv from 'dotenv';
import db from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT;

const isRunning = async () => {
    const tempe = await db();
    if (tempe) {
        console.log("connection established....");
        
    }   // Not using else here since db else case will kill the process.
}

isRunning()