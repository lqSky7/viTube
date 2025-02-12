import mongoose from "mongoose"; 
import { DB_NAME } from "../constants";
import dotenv from "dotenv";
dotenv.config();

 
const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.atlas_url}/${DB_NAME}`);
        console.log("connected", connectionInstance.connection.host);
        console.log("⚙️ Server is running at Port", connectionInstance.connection.port);
        
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

export default connectDB;