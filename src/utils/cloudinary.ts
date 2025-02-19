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
        fs.unlinkSync(localfilepath); // del local file after it's uploaded
        return res;

    } catch (error) {
        fs.unlinkSync(localfilepath); //delete local file if not uploaded
        return null;
    }
}

// const delFromCloudinary = async(cloudiURL) => {
//     try {
//         // TODO1: make the entire cloudinary storing thing more secure and add support to delete which is currently impossible because we just store links in user model.
//     } catch (e) {
//         throw new Error("File doesnt exist on Cloudinary server");
//     }
// }
export {uppToCloudinary};