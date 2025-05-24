import config from "../../config";
import AppError from "../../errors/AppError";
import {
  accessTokenOptions,
  refreshTokenOptions,
} from "../../helper/JwtHelper";
import redis from "../../redis";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

import httpStatus from "http-status";

// LOGIN USER
const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.LoginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  // const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  res.cookie("accessToken", accessToken, accessTokenOptions);

  res.status(200).json({
    success: true,
    message: "User logged in Successfully",
    data: {
      accessToken,
      user,
    },
  });
});

// LogOut

const LogOut = catchAsync(async (req, res) => {
  const userId = req.user?._id;

  const result = await AuthServices.LogOut(userId);
  // const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

//REFRESH TOKEN
export const UpdateAccessToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new AppError("Refresh token missing!", httpStatus.UNAUTHORIZED);
  }

  const result = await AuthServices.UpdateAccessToken(refreshToken);

  const { accessToken, refToken, user } = result;
  req.user = user;

  // set the cookie again
  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refToken, refreshTokenOptions);
  await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7d

  res.status(200).json({
    success: true,
    message: "Access token generated successfully",
    data: {
      accessToken,
    },
  });
});

// CHANGE PASSWORD

const ChangePassword = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await AuthServices.ChangePassword(_id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});

//UPDATE AVATAR
const updatedProfilePhoto = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const result = await AuthServices.updatedProfilePhoto(_id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Profile photo updated successfully",
    data: result,
  });
});

export const AuthControllers = {
  LoginUser,
  LogOut,
  UpdateAccessToken,
  ChangePassword,
  updatedProfilePhoto,
};
