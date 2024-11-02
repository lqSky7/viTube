// there's a chance of it not connecting. DataBase is always in another continent.
import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "src/.env" });

const db = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DB_URL}`);
        console.log("Mongodb connected",connectionInstance.model ,connectionInstance.connection.port);
        return true;
        
    } catch (error) {
        console.log("Could not connect", error);
        process.exit(1);

        
    }
}

export default db;