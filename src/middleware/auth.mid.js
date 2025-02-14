import { asyncHandler } from "../utils/asyncHandler";
import { errApi } from "../utils/errApi";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
// we verify if user has correct access refresh token
export const verifyJWT = asyncHandler(async(req, _ , next) => {
    try {
        const tokenFromUser = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!tokenFromUser) {
            throw new errApi(401, "no cookies passed from user");
        }
    
        const deCodedToken = jwt.verify(tokenFromUser, process.env.ACCESS_TOKEN_PRIV);
    
        const user = await User.findById(deCodedToken?._id).select("-password -refreshToken")
    
        if (!user) {throw new errApi(401, "user cookie is wrong!");}
    
        req.user123 = user;
        next();
    } catch (error) {
        throw errApi(401, error);
    }
})