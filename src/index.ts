import connectDB from "./db/connect";
import dotenv from 'dotenv';
dotenv.config({path: "./env"});
connectDB()