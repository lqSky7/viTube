import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { errApi } from "../utils/errApi";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";

interface JwtPayload {
  _id: string;
}

declare global {
  namespace Express {
    interface Request {
      user123: any;
    }
  }
}

export const verifyJWT = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    try {
      const tokenFromUser =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      if (!tokenFromUser) {
        throw new errApi(401, "no cookies passed from user", [], "");
      }

      const deCodedToken = jwt.verify(
        tokenFromUser,
        process.env.ACCESS_TOKEN_PRIV!
      ) as JwtPayload;

      const user = await User.findById(deCodedToken?._id).select(
        "-password -refreshToken"
      );
      
      if (!user) {
        throw new errApi(401, "user cookie🍪 is wrong!", [], "");
      }

      req.user123 = user;
      next();
    } catch (error) {
      throw new errApi(401,"Something went wrong", [], "");
    }
  }
);
