import { Request, RequestHandler } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../helper/JwtHelper";
import config from "../config";
import { redis } from "../redis";
import { JwtPayload } from "jsonwebtoken";

export const auth: RequestHandler = catchAsync(
  async (req: Request & { user?: any }, res, next) => {
    const token = req.headers.authorization;
        // const token = req.cookies.accessToken
        

    //check if token is exist
    if (!token) {
      throw new AppError(
        "You are not Authorized!! Please login First",
        httpStatus.UNAUTHORIZED
      );
    }

    // verify token
    const decoded = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_access_token as string
    );

    
    if (!decoded) {
      throw new AppError("access token is not valid", httpStatus.UNAUTHORIZED);
    }

    // verify user from redis
        const user = await redis.get(decoded.userId);
        
      

    // if (user?.status === "blocked") {
    //   throw new AppError("This user is blocked ! !", httpStatus.FORBIDDEN);
    //     }

    console.log(user, "u");
    if (!user) {
      throw new AppError("User not found", httpStatus.NOT_FOUND);
    }

    req.user = decoded as JwtPayload;
    next();
  }
);
