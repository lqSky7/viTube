// hamare server pr file aa chuki hai, now we pushing it to cloud. Why not directly to cloud? to allow better reupload contorl and stuff
import { v2 } from "cloudinary";
import fs from "fs"
import dotenv from 'dotenv';
dotenv.config({path: "./env"});

v2.config({
    cloud_name: process.env.CLOUDI_NAME,
    api_key: process.env.CLOUDI_KEY,
    api_secret: process.env.CLOUDI_SECRET,
})

const uppToCloudinary = async (localfilepath:string) => {
    try {
        if(!localfilepath){return null;}
        const res = await v2.uploader.upload(localfilepath, {resource_type: "auto"})
        console.log("file uploaded da, at url: ", res.url);
        
        return res;

    } catch (error) {
        fs.unlinkSync(localfilepath); //delete local file if not uploaded
        return null;
    }
}


export {uppToCloudinary};