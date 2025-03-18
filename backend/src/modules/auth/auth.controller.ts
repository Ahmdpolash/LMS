import config from "../../config";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

// LOGIN USER
const LoginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.LoginUser(req.body);
  const { refreshToken, accessToken, user } = result;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production", // set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
    sameSite: "lax",
  });
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.node_env === "production", // set to true if using HTTPS
    // maxAge: 1000 * 60 * 60 * 24 * 365, // 1yr
    maxAge: 1000 * 60 * 60 * 24 * 5,
    sameSite: "lax",
  });

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
  const userId = req.user?.userId;
  const result = await AuthServices.LogOut(userId);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    success: true,
    message: result.message,
  });
});

//REFRESH TOKEN
const RefreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.RefreshToken(refreshToken);
  res.status(200).json({
    success: true,
    message: "access token generated",
    data: result,
  });
});

export const AuthControllers = { LoginUser, LogOut, RefreshToken };
