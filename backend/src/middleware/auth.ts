import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../helper/JwtHelper";
import config from "../config";
import redis from "../redis";
import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.models";

export const auth = (...role: TUserRole[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      // Support both cookie and Bearer Authorization header
      const authHeader = req.headers.authorization;
      let token = req.cookies?.accessToken;

      if (!token && authHeader) {
        if (authHeader.startsWith("Bearer ")) {
          token = authHeader.split(" ")[1];
        } else {
          token = authHeader;
        }
      }

      //check if token exists
      if (!token) {
        throw new AppError(
          "You are not Authorized!! Please login First",
          httpStatus.UNAUTHORIZED
        );
      }

      // verify token
      let decoded: JwtPayload;
      try {
        decoded = jwtHelper.verifyToken(
          token,
          config.jwt.jwt_access_token as string
        );
      } catch (err) {
        throw new AppError(
          "access token is not valid",
          httpStatus.UNAUTHORIZED
        );
      }

      if (!decoded || !decoded.userId) {
        throw new AppError(
          "access token is not valid",
          httpStatus.UNAUTHORIZED
        );
      }

      // verify user from redis with MongoDB fallback
      let userData: any = null;
      try {
        const userFromRedis = await redis.get(decoded.userId);
        if (userFromRedis) {
          userData = JSON.parse(userFromRedis);
        }
      } catch (e) {
        userData = null;
      }

      if (!userData) {
        userData = await User.findById(decoded.userId);
        if (userData) {
          try {
            await redis.set(
              decoded.userId,
              JSON.stringify(userData),
              "EX",
              7 * 24 * 60 * 60
            );
          } catch (e) {
            // ignore redis set failure
          }
        }
      }

      if (!userData) {
        throw new AppError("User not found", httpStatus.NOT_FOUND);
      }

      if (userData.status === "blocked") {
        throw new AppError("This user is blocked!", httpStatus.FORBIDDEN);
      }

      if (userData.isDeleted) {
        throw new AppError("This user is deleted!", httpStatus.FORBIDDEN);
      }

      if (role.length && !role.includes(userData.role)) {
        throw new AppError(
          `Role : ${userData?.role} is not allowed to access this resource`,
          httpStatus.FORBIDDEN
        );
      }

      req.user = userData;
      next();
    }
  );
};

//validate user role
