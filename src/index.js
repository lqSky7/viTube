import {app} from "./app.js";
import dotenv from 'dotenv';
import db from "./db/index.js";

dotenv.config();

const PORT = process.env.PORT;




const isRunning = async () => {
    await db();
        app.listen(process.env.PORT, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
            
        });
        
       // Not using else here since db else case will kill the process, thus never returning false.
}


isRunning()