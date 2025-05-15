import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import { jwtHelper } from "../helper/JwtHelper";
import config from "../config";
import redis from "../redis";
import { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";

export const auth = (...role: TUserRole[]) => {
  return catchAsync(
    async (
      req: Request & { user?: any },
      res: Response,
      next: NextFunction
    ) => {
      // const token = req.headers.authorization;
      // / const token = req.headers.authorization?.split(' ')[1];
      const token = req.cookies.accessToken;

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
        throw new AppError(
          "access token is not valid",
          httpStatus.UNAUTHORIZED
        );
      }

      // verify user from redis
      const user = await redis.get(decoded.userId);

      if (!user) {
        throw new AppError(
          "please login to access this resource !",
          httpStatus.UNAUTHORIZED
        );
      }
      const userData = user ? JSON.parse(user) : null;

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
